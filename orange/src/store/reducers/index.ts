import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user/user';
import necessityReducer from './necessity/necessity';

const rootReducer = (history: any) => combineReducers({
  user: userReducer,
  necessity: necessityReducer,
  router: connectRouter(history),
});
export default rootReducer;
