import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import houseReducer from './house/house';
import necessityReducer from './necessity/necessity';
import userReducer from './user/user';

const rootReducer = (history: History) => combineReducers({
  house: houseReducer,
  necessity: necessityReducer,
  user: userReducer,
  router: connectRouter(history),
});
export default rootReducer;
