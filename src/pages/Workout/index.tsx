import React from 'react';

import {PersonState} from './components';
import styles from './styles.scss';


const Workout = () => (
    <div className={styles.workoutPage}>
        <PersonState />
    </div>
);

export default Workout;
