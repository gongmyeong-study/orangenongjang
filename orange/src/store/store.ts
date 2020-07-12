import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import rootReducer from './reducers/index';


const logger = (store: any) => (next: any) => (action: any) => {
  window.console.log('[Middleware] Dispatching', action);
  const result = next(action);
  window.console.log('[Middleware] Next State', store.getState());
  return result;
};

export const history = createBrowserHistory();
export const middlewares = [logger, thunk, routerMiddleware(history)];

const store = createStore(rootReducer(history), applyMiddleware(...middlewares));

export default store;
