import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authService.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../../../models';

@Injectable({ providedIn: 'root' })
export class Userservice {
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
}
