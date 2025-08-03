import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environments';
import { Role, User, UserAuthResponse, UserPayload } from '../../../models';

export interface JwtPayload {
  data: {
    user: {
      _id: string;
      email: string;
      role: Role;
    };
  };
  iat: number;
  exp: number;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiServerUrl = environment.BASE_URL;
  private readonly _isLoggedIn = signal<boolean>(false);
  private readonly _currentUser = signal<UserPayload | null>(null);

  public readonly isLoggedIn = this._isLoggedIn.asReadonly();
  public readonly currentUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.setUser(token);
    }
  }

  public registerUser(user: Partial<User>): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.apiServerUrl}/users/register`, user);
  }

  public login(email: string, password: string): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.apiServerUrl}/users/login`, {
      email,
      password,
    });
  }

  public saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.setUser(token);
  }

  public getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
    this._isLoggedIn.set(false);
    this._currentUser.set(null);
  }

  private setUser(token: string): void {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const user = decodedToken.data?.user;
      this._currentUser.set(user);
      this._isLoggedIn.set(true);
    } catch (error) {
      console.log('Invalid token', error);
      this.logout();
    }
  }
}
