import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './authService.service';
import { Observable, throwError } from 'rxjs';
import { PaginatedUsersResponse, Sort, User } from '../../../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private BASE_URL = environment.BASE_URL;
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  public getUserInfo(): Observable<User> {
    const currentUser = this.authService.currentUser();
    if (!currentUser?._id) {
      return throwError(() => new Error('No user logged in'));
    }
    return this.http.get<User>(`${this.BASE_URL}/users/${currentUser._id}`);
  }

  public updateProfile(data: Partial<User>): Observable<User> {
    const currentUser = this.authService.currentUser();
    if (!currentUser?._id) {
      return throwError(() => new Error('No user logged in'));
    }
    return this.http.put<User>(`${this.BASE_URL}/users/${currentUser._id}`, data);
  }

  public getUsers(
    limit?: string,
    page?: string,
    searchTerm?: string,
    sort?: Sort | '',
  ): Observable<PaginatedUsersResponse> {
    let params = new HttpParams();
    if (limit) params = params.set('limit', limit);
    if (page) params = params.set('page', page);
    if (searchTerm) params = params.set('searchTerm', searchTerm);
    if (sort) params = params.set('sort', sort);

    return this.http.get<PaginatedUsersResponse>(`${this.BASE_URL}/users`, { params });
  }

  public deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL}/users/${id}`);
  }
}
