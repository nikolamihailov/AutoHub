import { User } from './user.model';

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginatedUsersResponse {
  users: User[];
  pageCount: number;
  usersCount: number;
}
