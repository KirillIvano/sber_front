import React from 'react';
import cn from 'classnames';

import styles from './styles.scss';
import {Icon} from './components';


type HeaderProps = {
    className?: string;
}

const Header = ({className}: HeaderProps) => (
    <header className={cn(styles.header, className)}>
        <Icon />
    </header>
);

export default Header;
