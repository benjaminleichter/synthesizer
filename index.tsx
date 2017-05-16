import 'babel-polyfill';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { combineReducers } from 'redux';

import { Provider } from './typescript/components/Provider';
import { ConnectedApp } from './typescript/App';

import { reducers } from './typescript/reducers';

const appReducers = combineReducers({appState: reducers});
ReactDom.render(
    <Provider appReducers={ appReducers } services={{}} target={ ConnectedApp } />,
    document.getElementById('app'),
)
