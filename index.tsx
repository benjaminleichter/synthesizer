import 'babel-polyfill';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { ConnectedApp } from './typescript/App';

import { reducers } from './typescript/reducers';

const appReducers = combineReducers({ appState: reducers });
const store = createStore(appReducers, applyMiddleware(thunk));
ReactDom.render(
    <Provider store={ createStore(appReducers) }>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app'),
)
