import {createContext, useContext} from 'react';

import {trainPageStore} from '../localStorage';


export const WorkoutPageContext = createContext(trainPageStore);

export const useWorkoutPageStore = () => useContext(WorkoutPageContext);
