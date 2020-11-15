import { RouterState } from 'connected-react-router';
import { Place, User } from '../api';

export interface NecessityState {
  createStatus: string;
  getStatus: string;
  removeStatus: string;
  countStatus: string;
  updateStatus: string;
  places: Place[];
}

export interface UserState {
  me: User;
  signupStatus: string;
  loginStatus: string;
  logoutStatus: string;
  getMeStatus: string;
}

export interface OrangeGlobalState {
  user: UserState;
  necessity: NecessityState;
  router: RouterState;
}
