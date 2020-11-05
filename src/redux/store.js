
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../redux';

const initialState = {};

const middleware = [];

let enhancers = [applyMiddleware(...middleware)];

if (process.env.NODE_ENV === 'development') {
    window.__REDUX_DEVTOOLS_EXTENSION__ && enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export const store = createStore(rootReducer, initialState, compose(...enhancers));
