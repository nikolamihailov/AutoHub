import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

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
