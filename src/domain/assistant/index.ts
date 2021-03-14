import {SMARTAPP_TOKEN} from '@/settings';
import {createSmartappDebugger} from '@sberdevices/assistant-client';


export const getAssistant = <TState,>(
    getState: () => TState,
) => createSmartappDebugger({
        token: SMARTAPP_TOKEN,
        initPhrase: 'Запусти sss',
        getState,
    });
