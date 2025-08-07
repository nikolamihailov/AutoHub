import { Category } from './category.model';

export interface PaginatedCategoriesResponse {
  categories: Category[];
  pageCount: number;
  usersCount: number;
}
