import { CarOffer } from './car-offer.model';

export interface PaginatedCarOffersResponse {
  carOffers: CarOffer[];
  pageCount: number;
  usersCount: number;
}
