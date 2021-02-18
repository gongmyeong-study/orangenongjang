import { User } from './user';
import { Necessity } from './necessity';

export interface Place {
  id: number;
  name: string;
  house_id: number;
  created_at: string;
  updated_at: string;
  necessities?: Necessity[];
}

export interface House {
  id: number;
  name: string;
  introduction: string;
  users: User[];
  places: Place[];
}

export interface UserHouse {
  id: number;
  username: string;
  is_leader: boolean;
  joined_at: string;
}
