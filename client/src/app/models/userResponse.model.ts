import { User } from './user.model';

export interface PaginatedUsersResponse {
  users: User[];
  pageCount: number;
  usersCount: number;
}
