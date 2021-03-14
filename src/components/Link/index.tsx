import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.scss';


type LinkProps = React.ComponentProps<RouterLink>

const Link = ({
    className,
    ...props
}: LinkProps) => (
    <RouterLink
        {...props}
        className={cn(className, styles.link)}
    />
);

export default Link;
