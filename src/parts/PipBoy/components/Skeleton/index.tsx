import React from 'react';
import cn from 'classnames';

import {Body} from './Body';
import styles from './styles.scss';


const Skeleton = ({className}: {className?: string}) => (
    <div className={cn(styles.container, className)}>
        <svg
            className={styles.image}
            width="263"
            height="277"
            viewBox="0 0 263 277"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Body />
        </svg>
    </div>
);

export default Skeleton;
