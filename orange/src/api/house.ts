import { User } from './user';

export interface House {
  id: number;
  name: string;
  introduction: string;
  users?: [User];
}
