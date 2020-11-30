export interface User {
  id: number;
  username: string;
  email?: string;
  last_login?: string;
  joined_at: string;
  is_leader: boolean;
  is_active?: boolean;
}
