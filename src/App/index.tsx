import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Header} from '@/parts';
import {WorkoutPage, GlobalStatsPage} from '@/pages';
import {useSberAssistant} from '@/domain/assistant/hooks';

import styles from './styles.scss';


export const App = () => {
    useSberAssistant();

    return (
        <div className={styles.root}>
            <Header className={styles.header} />

            <div className={styles.content}>
                <Switch>
                    <Redirect exact from="/" to="/stats" />
                    <Route exact path="/stats" render={GlobalStatsPage} />
                    <Route exact path="/workout" component={WorkoutPage} />
                </Switch>
            </div>
        </div>
    );
};
