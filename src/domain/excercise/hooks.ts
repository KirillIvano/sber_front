import {createContext, useContext} from 'react';

import {excercisesStore} from './store';


export const ExcerciseStoreContext = createContext(excercisesStore);

export const useExcerciseStore = () => useContext(ExcerciseStoreContext);
export const useExcerciseById = (id: number) => useExcerciseStore().getExcerciseById(id);
