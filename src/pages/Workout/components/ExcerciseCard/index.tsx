import React from 'react';
import {observer} from 'mobx-react-lite';
import cn from 'classnames';

import {useExcerciseById} from '@/domain/excercise/hooks';

import styles from './styles.scss';


type ExcerciseCardProps = {
    excerciseId: number;

    className?: string;
}


const ExcerciseCard = observer(({
    excerciseId,
    className,
}: ExcerciseCardProps) => {
    const excercise = useExcerciseById(excerciseId);

    if (!excercise) return null;

    const {name, description} = excercise;

    return (
        <div className={cn(className, styles.excerciseCard)}>
            <p className={styles.excerciseName}>
                {name}
            </p>
            <p className={styles.excerciseDescription}>
                {description}
            </p>
        </div>
    );
});
export default ExcerciseCard;
