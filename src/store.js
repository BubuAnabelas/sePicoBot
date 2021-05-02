import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import createRouterReducers from './reducers/app.reducers';

export const history = createBrowserHistory();

const rootReducer = createRouterReducers(history);

let composeEnhacers = compose;

let middlewares = {};
if (process.env.NODE_ENV !== 'production') {
  middlewares = applyMiddleware(routerMiddleware(history, promise, thunk));

  composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;
} else {
  middlewares = applyMiddleware(routerMiddleware(history), promise, thunk);
}

export const store = createStore(rootReducer, composeEnhacers(middlewares));
