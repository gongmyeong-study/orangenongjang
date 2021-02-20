import { User } from './user';

export interface Necessity {
  id: number;
  place_id: number;
  place_name: string;
  name: string;
  option: string;
  description: string;
  price?: number;
  count: number;
}

export interface NecessityLog {
  id: number;
  action: string;
  user: User;
  necessity?: Necessity;
  created_at: string;
}

export interface PaginatedNecessityLog {
  next: number;
  count: number;
  results: NecessityLog[];
}
