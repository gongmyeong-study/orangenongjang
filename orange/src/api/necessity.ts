import { User } from './user';

export interface NecessityHouse {
  id: number;
  name: string;
  introduction: string;
  users: [User];
  necessities: [Necessity];
}

export interface Necessity {
  id: number;
  house_id: number;
  name: string;
  option: string;
  description: string;
  price?: number;
  count: number;
}

export interface NecessityHouseLog {
  id: number;
  action: string;
  user: User;
  necessity: Necessity;
  created_at: string;
}
