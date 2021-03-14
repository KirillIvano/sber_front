import React, {useEffect, useState} from 'react';
import cn from 'classnames';

import {useConstant} from '@/hooks/useConstant';

import styles from './styles.scss';
import {useSocketState} from '@/hooks/useSocket';


type DailyWorkshopsCountProps = {
    defaultCount?: number;
    className?: string;
}

const DailyWorkshopsCount = ({
    defaultCount,
    className,
}: DailyWorkshopsCountProps) => {
    const {data, connecting, error} = useSocketState('/ws/session/establish/');

    if (connecting) {

    }

    return (
        <div className={cn(className)}>
            {}
        </div>
    );
};

export default DailyWorkshopsCount;
