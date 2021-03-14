import React from 'react';

import {Link} from '@/components';

import styles from './styles.scss';


const Navbar = () => (
    <nav>
        <ul className={styles.nav}>
            <li className={styles.navItem}>
                <Link className={styles.navHref} to="/">Статистика</Link>
            </li>
            <li className={styles.navItem}>
                <Link className={styles.navHref} to="/workout">Тренировка</Link>
            </li>
        </ul>
    </nav>
);

export default Navbar;
