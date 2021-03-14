import React from 'react';
import cn from 'classnames';

import styles from './styles.scss';
import {Icon, Navbar} from './components';


type HeaderProps = {
    className?: string;
}

const Header = ({className}: HeaderProps) => (
    <header className={cn(styles.header, className)}>
        <Icon />
        <Navbar />
    </header>
);

export default Header;
