import React, {useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite';
import cn from 'classnames';

import {debounceFn} from '@/utils/debounce';

import {useWorkoutPageStore} from '../../hooks/useWorkoutPageStore';
import ExcerciseCard from '../ExcerciseCard';
import styles from './styles.scss';


export type ScrollStateType = 'start' | 'core' | 'end' | null;

const ExcercisesList = observer(() => {
    const {excercises} = useWorkoutPageStore();

    if (!excercises.length) {
        return <p className={styles.emptyExcercises}>Упражнений нет</p>;
    }

    return (
        <div className={styles.excercisesContent}>
            {excercises.map(
                excerciseId => (<ExcerciseCard
                    excerciseId={excerciseId}
                    key={excerciseId}
                />),
            )}
        </div>
    );
});


export type ExcercisesPanelProps = {
    containerClass?: string;
}

const ExcercisesPanel = ({
    containerClass,
}: ExcercisesPanelProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [scrollState, setScrollState] = useState<ScrollStateType>(null);

    useEffect(() => {
        if (scrollContainerRef.current && contentRef.current) {
            const {current: scrollContainer} = scrollContainerRef;
            const {current: scrollContent} = contentRef;

            const handleScroll = () => {
                if (scrollContent.offsetHeight < scrollContainer.offsetHeight) {
                    setScrollState(null);
                } else if (scrollContainer.scrollTop <= 0) {
                    setScrollState('end');
                } else if (scrollContainer.scrollHeight <= scrollContainer.scrollTop + scrollContainer.offsetHeight) {
                    setScrollState('start');
                } else {
                    setScrollState('core');
                }
            };

            const debouncedHandleScroll = debounceFn(handleScroll, 30);

            scrollContainer.addEventListener('scroll', debouncedHandleScroll);

            return () => scrollContainer.removeEventListener('scroll', debouncedHandleScroll);
        }
    }, []);

    return (
        <div className={cn(
            styles.excercisesPanelContainer,
            containerClass,
        )}>
            <div
                ref={scrollContainerRef}
                className={styles.excercisesPanel}
            >
                <div className={cn(
                    styles.shadowTop,
                    (scrollState === 'start' || scrollState === 'core') && styles.shadowVisible,
                )} />

                <ExcercisesList />

                <div className={cn(
                    styles.shadowBottom,
                    (scrollState === 'end' || scrollState === 'core') && styles.shadowVisible,
                )} />
            </div>

        </div>
    );
};

export default ExcercisesPanel;
