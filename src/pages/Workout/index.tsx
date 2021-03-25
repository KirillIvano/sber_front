import React from 'react';

import {CurrentSessionCard, ExcercisesPanel, PersonState} from './components';
import styles from './styles.scss';


const Workout = () => (
    <div className={styles.workoutPage}>
        <section className={styles.workoutPersonContainer}>
            <PersonState />
        </section>

        <section>
            <h2 className={styles.workoutPanelsHeading}>Текущее упражнение</h2>

            <CurrentSessionCard />

            <h2 className={styles.workoutPanelsHeading}>Следующие упраженения</h2>

            <ExcercisesPanel />
        </section>
    </div>
);

export default Workout;
