import * as React from 'react';
import {Timer} from './pages/timer';
import {ChronosAppState} from './state/singleton-chronos-app-state';

const appState = new ChronosAppState();

export const App = () => {
    return <Timer/>;
};
