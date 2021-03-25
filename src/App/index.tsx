import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Header} from '@/parts';
import {WorkoutPage} from '@/pages';

import styles from './styles.scss';


export const App = () => (
    <div className={styles.root}>
        <Header className={styles.header} />

        <div className={styles.content}>
            <Switch>
                <Redirect exact from="/" to="/workout" />
                <Route exact path="/workout" component={WorkoutPage} />
            </Switch>
        </div>
    </div>
);
