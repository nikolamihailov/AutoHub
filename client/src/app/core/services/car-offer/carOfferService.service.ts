import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { CarOffer } from '../../../models';

@Injectable({ providedIn: 'root' })
export class CarOfferService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public createCategory(data: Omit<CarOffer, '_id'>): Observable<CarOffer> {
    return this.http.post<CarOffer>(`${this.BASE_URL}/car-offers`, data);
  }
}
