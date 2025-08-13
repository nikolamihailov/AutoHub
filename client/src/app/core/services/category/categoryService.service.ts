import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Sort } from '../../../shared/enums';
import { Category, PaginatedCategoriesResponse } from '../../../models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.BASE_URL}/categories/${id}`);
  }

  public createCategory(data: Omit<Category, '_id'>): Observable<Category> {
    return this.http.post<Category>(`${this.BASE_URL}/categories`, data);
  }

  public updateCategory(id: string, data: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.BASE_URL}/categories/${id}`, data);
  }

  public deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.BASE_URL}/categories/${id}`);
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}/categories`);
  }

  public getCategories(
    limit?: string,
    page?: string,
    searchTerm?: string,
    sort?: Sort | '',
  ): Observable<PaginatedCategoriesResponse> {
    let params = new HttpParams();
    if (limit) params = params.set('limit', limit);
    if (page) params = params.set('page', page);
    if (searchTerm) params = params.set('searchTerm', searchTerm);
    if (sort) params = params.set('sort', sort);

    return this.http.get<PaginatedCategoriesResponse>(`${this.BASE_URL}/categories/admin`, {
      params,
    });
  }
}
