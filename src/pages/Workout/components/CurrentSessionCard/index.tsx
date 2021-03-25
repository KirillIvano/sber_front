import React, {useState, useMemo, useEffect} from 'react';

import {formatTime} from './utils';
import styles from './styles.scss';
import {useWorkoutPageStore} from '../../hooks/useWorkoutPageStore';
import {useExcerciseStore} from '@/domain/excercise/hooks';
import {Excercise} from '@/domain/excercise/types';
import {observer} from 'mobx-react-lite';

const CardTimer = ({startTime, duration}: {startTime: number, duration: number}) => {
    const [currentTime, setTime] = useState<number>(Date.now());

    const formattedTime = useMemo(
        () => formatTime(startTime + duration - currentTime),
        [currentTime, duration, startTime],
    );

    useEffect(() => {
        const intervalId = setInterval(() => setTime(Date.now()), 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.excerciseTimer}>
            {formattedTime}
        </div>
    );
};

const CurrentSessionCard = observer(() => {
    const excercisesStore = useExcerciseStore();
    const {currentSession} = useWorkoutPageStore();

    if (!currentSession) return (
        <div className={styles.currentExcerciseCard}>
            <p className={styles.emptyName}>Текущих упражнений нет</p>
        </div>
    );
    const {id, start} = currentSession;
    const {name, duration} = excercisesStore.getExcerciseById(id) as Excercise;

    return (
        <div className={styles.currentExcerciseCard}>
            <h2 className={styles.name}>{name}</h2>

            <CardTimer
                startTime={start}
                duration={duration}
            />
        </div>
    );
});

export default CurrentSessionCard;
