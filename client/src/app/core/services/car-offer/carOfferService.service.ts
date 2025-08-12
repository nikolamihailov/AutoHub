import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { CarOffer, CarOfferDetails } from '../../../models';
import { PaginatedCarOffersResponse } from '../../../models/car-offerResponse';
import { Sort } from '../../../shared/enums/Sort.enum';

@Injectable({ providedIn: 'root' })
export class CarOfferService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public getCarOffer(id: string): Observable<CarOfferDetails> {
    return this.http.get<CarOfferDetails>(`${this.BASE_URL}/car-offers/${id}`);
  }

  public createCarOffer(data: Omit<CarOffer, '_id'>): Observable<CarOffer> {
    return this.http.post<CarOffer>(`${this.BASE_URL}/car-offers`, data);
  }

  public editCarOffer(id: string, data: Partial<CarOffer>): Observable<CarOffer> {
    return this.http.put<CarOffer>(`${this.BASE_URL}/car-offers/${id}`, data);
  }

  public deleteCarOffer(id: string): Observable<CarOffer> {
    return this.http.delete<CarOffer>(`${this.BASE_URL}/car-offers/${id}`);
  }

  public getCarOffers(
    limit?: string,
    page?: string,
    searchTerm?: string,
    sort?: Sort | '',
  ): Observable<PaginatedCarOffersResponse> {
    let params = new HttpParams();
    if (limit) params = params.set('limit', limit);
    if (page) params = params.set('page', page);
    if (searchTerm) params = params.set('searchTerm', searchTerm);
    if (sort) params = params.set('sort', sort);

    return this.http.get<PaginatedCarOffersResponse>(`${this.BASE_URL}/car-offers`, {
      params,
    });
  }
}
