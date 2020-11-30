import { RouterState } from 'connected-react-router';
import { House, Place, User } from '../api';

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

export interface HouseState {
  inviteStatus: string;
  getStatus: string;
  removeStatus: string;
  updateStatus: string;
  house: House;
}

export interface OrangeGlobalState {
  user: UserState;
  necessity: NecessityState;
  house: HouseState;
  router: RouterState;
}
