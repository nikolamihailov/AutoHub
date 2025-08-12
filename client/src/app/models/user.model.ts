import { CarOffer } from './car-offer.model';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | undefined;
  role: Role;
  accountType: AccountType;
  carOffers: CarOffer[];
  savedCarOffers: CarOffer[] | string[];
}
export interface UserPayload {
  _id: string;
  email: string;
  role: Role;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AccountType {
  PRIVATE_ACCOUNT = 'privateAccount',
  DEALERSHIP = 'dealership',
}
