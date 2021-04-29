import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const getMockReducer = jest.fn(
  (initialState) => (state: any = initialState, action: any) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const history = createBrowserHistory();
export const middlewares = [thunk, routerMiddleware(history)];

export const getMockStore = (initialState: any) => {
  const mockUserReducer = getMockReducer(initialState.user);
  const mockNecessityReducer = getMockReducer(initialState.necessity);
  const mockHouseReducer = getMockReducer(initialState.house);
  const rootReducer = (his: any) => combineReducers({
    router: connectRouter(his),
    user: mockUserReducer,
    necessity: mockNecessityReducer,
    house: mockHouseReducer,
  });

  const mockStore = createStore(rootReducer(history), applyMiddleware(...middlewares));
  return mockStore;
};
