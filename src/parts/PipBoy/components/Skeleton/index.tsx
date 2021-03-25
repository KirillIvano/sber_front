import React from 'react';
import cn from 'classnames';

import {Body} from './Body';
import styles from './styles.scss';
import {MuscleGroupType} from '@/domain/excercise/types';

const ArmsMarker = () => <circle cx="60" cy="108" r="12" fill="#1BFF80" />;
const CoreMarker = () => <circle cx="130" cy="130" r="20" fill="#1BFF80" />;
const LegsMarker = () => <circle cx="95" cy="230" r="12" fill="#1BFF80" />;

const GROUP_TO_MARKER_MAPPING: Record<MuscleGroupType, React.FunctionComponent> = {
    arms: ArmsMarker,
    core: CoreMarker,
    legs: LegsMarker,
};

type SkeletonProps = {
    muscleGroups: MuscleGroupType[];
    className?: string;
}

const Skeleton = ({className, muscleGroups}: SkeletonProps) => (
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

            <g>
                {muscleGroups.map(group => {
                    const El = GROUP_TO_MARKER_MAPPING[group];

                    return <El key={group} />;
                })}
            </g>
        </svg>
    </div>
);

export default Skeleton;
