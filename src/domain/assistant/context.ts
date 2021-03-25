import {createContext, useContext} from 'react';
import {assistantApi} from '.';
import {AssistantApiInterface} from './types';


export const AssistantContext = createContext<AssistantApiInterface>(assistantApi);

export const useAssistantApi = () => useContext(AssistantContext);
