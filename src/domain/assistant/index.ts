import {action, makeObservable, observable} from 'mobx';
import {
    AssistantClientCustomizedCommand,
    AssistantSmartAppData,
    createSmartappDebugger,
} from '@sberdevices/assistant-client';

import {SMARTAPP_TOKEN} from '@/settings';

import {AssistantAction, AssistantApiInterface} from './types';

export const getAssistant = <TState,>(
    getState: () => TState,
) => createSmartappDebugger({
        token: SMARTAPP_TOKEN,
        initPhrase: 'Запусти kekes',
        getState,
    });

const getStateLessAssistant = () => getAssistant(() => ({}));

class AssistantApi implements AssistantApiInterface {
    private readonly _assistant = getStateLessAssistant();
    private readonly _handlers: Record<string, Array<(a: AssistantAction) => void>> = {};

    @observable
    public initialised = false;

    constructor() {
        makeObservable(this);

        this._assistant.on('start', this.handleStart);
        this._assistant.on('data', this.handleData);
    }

    @action
    private handleStart = () => {
        this.initialised = true;
    }

    private handleData = (data: AssistantClientCustomizedCommand<AssistantSmartAppData>) => {
        const {type} = data;

        if (type === 'smart_app_data') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.handleAction((data as any).action as AssistantAction);
        }
    }

    say = (text: string) => {
        this._assistant.sendData(AssistantApi.getDataAction('SAY', {type: 'SAY', payload: {text}}));
    }

    fire = (actionType: string, action?: AssistantAction) => {
        this._assistant.sendData(AssistantApi.getDataAction(actionType, action));
    }

    subscribe = (action: string, handler: (...args: unknown[]) => void) => {
        this.addHandler(action, handler);
    }

    unsubscribe = (action: string, handler: (...args: unknown[]) => void) => {
        this.removeHandler(action, handler);
    };

    private handleAction = (action: AssistantAction) => {
        const handlers = this._handlers[action.type];

        if (handlers) {
            handlers.forEach(f => f(action));
        }
    }

    private addHandler = (actionName: string, handler: (a: AssistantAction) => void) => {
        if (this._handlers[actionName]) {
            this._handlers[actionName].push(handler);
        } else {
            this._handlers[actionName] = [handler];
        }
    }

    private removeHandler = (actionName: string, handler: (a: AssistantAction) => void) => {
        const actionHandlers = this._handlers[actionName];

        if (actionHandlers) {
            this._handlers[actionName] = actionHandlers.filter(f => f !== handler);
        }
    }

    private static getDataAction = (actionId: string, action?: AssistantAction) =>
        ({action: {action_id: actionId, parameters: action}})

}

export const assistantApi = new AssistantApi();
