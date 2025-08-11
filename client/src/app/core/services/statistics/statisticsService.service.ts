import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public getAllUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}/users/count`);
  }

  public getAllCarOffersCount(): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}/car-offers/count`);
  }
}
