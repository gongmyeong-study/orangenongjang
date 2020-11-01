import { User } from './user';

export interface NecessityHouse {
  id: number;
  name: string;
  introduction: string;
  users: User;
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
