import React from 'react';
import {Link} from 'react-router-dom';

import styles from './styles.scss';


const Icon = () => (
    <Link className={styles.icon} to="/">
        PIP TRAIN
    </Link>
);

export default Icon;
