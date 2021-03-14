import {useEffect, useReducer, useRef} from 'react';
import {AssistantAppState} from '@sberdevices/assistant-client';

import {useConstant} from '@/hooks/useConstant';
import {getAssistant} from '.';


const RENAME_ACTION = 'RENAME_ACTION' as const;


type AssistantStore = AssistantAppState & {
    name: string;
}

type AssistantAction = {
    type: typeof RENAME_ACTION,
    payload: {
        name: string;
    }
}

const initialState: AssistantStore = {
    name: 'unknown',
    // eslint-disable-next-line camelcase
    item_selector: {
        items: [],
    },
};

const reducer = (state: AssistantStore = initialState, action: AssistantAction): AssistantStore => {
    switch (action.type) {
    case RENAME_ACTION: {
        const {name} = action.payload;

        return {
            ...state,
            name,
        };
    }
    }
};

export const useSberAssistant = () => {
    const storeRef = useRef<AssistantStore>();
    const [store, dispatch] = useReducer(reducer, () => initialState);

    useEffect(() => {
        storeRef.current = store;
    }, [store]);

    const assistant = useConstant(
        () => getAssistant(
            () => {
                return storeRef.current;
            },
        ),
    );

    useEffect(() => {
        setTimeout(() => assistant.sendData({action: {action_id: 'done', parameters: {lol: 'kek'}}}), 1000);
    }, [assistant]);

    useEffect(() => {
        assistant.on('start', console.log);
        assistant.on('data', console.log);
    }, [assistant]);

    return assistant;
};
