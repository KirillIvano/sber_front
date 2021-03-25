import React from 'react';
import {observer} from 'mobx-react-lite';

import {PipBoy} from '@/parts';
import {MuscleGroupType} from '@/domain/excercise/types';
import {useExcerciseStore} from '@/domain/excercise/hooks';

import styles from './styles.scss';
import {useWorkoutPageStore} from '../../hooks/useWorkoutPageStore';


type PersonStateBaseProps = {
    muscleGroups: MuscleGroupType[];
}

const PersonStateBase = ({muscleGroups}: PersonStateBaseProps) => (
    <div className={styles.personState}>
        <PipBoy muscleGroups={muscleGroups} />
    </div>
);

const PersonState = observer(() => {
    const excercisesStore = useExcerciseStore();
    const {currentSession} = useWorkoutPageStore();

    if (!currentSession) {
        return null;
    }

    const muscleGroups = excercisesStore.getExcerciseById(currentSession.id)?.muscleGroups ?? [];

    return <PersonStateBase muscleGroups={muscleGroups} />;
});

export default PersonState;
