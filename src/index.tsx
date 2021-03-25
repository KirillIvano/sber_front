import 'focus-visible';
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import './main.scss';
import icon from './favicon.ico';
import {App} from './App';

render(
    <BrowserRouter>
        <Helmet>
            <title>Pip Train</title>
            <link rel="icon" href={icon} type="image/x-icon" />
        </Helmet>

        <App />
    </BrowserRouter>,
    document.getElementById('root') as HTMLDivElement,
);
