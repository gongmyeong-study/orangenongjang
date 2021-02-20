import { RouterState } from 'connected-react-router';
import {
  House, Place, User, UserHouse,
} from '../api';

export interface NecessityState {
  createStatus: string;
  getStatus: string;
  removeStatus: string;
  countStatus: string;
  updateStatus: string;
  createPlaceStatus: string;
  updatePlaceStatus: string;
  removePlaceStatus: string;
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
  getHouseStatus: string;
  getUserHouseStatus: string;
  inviteHouseStatus?: string;
  leaveHouseStatus?: string;
  tossLeaderStatus?: string;
  removeHouseStatus: string;
  house?: House;
  houses?: House[];
  userHouse?: UserHouse[];
}

export interface OrangeGlobalState {
  user: UserState;
  necessity: NecessityState;
  house: HouseState;
  router: RouterState;
}
