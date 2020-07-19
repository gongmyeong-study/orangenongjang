import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user/user';

const rootReducer = (history: any) => combineReducers({
  user: userReducer,
  router: connectRouter(history),
});
export default rootReducer;
