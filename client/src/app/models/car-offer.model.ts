import { Category } from './category.model';
import { User } from './user.model';

export enum Gearbox {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
}

export enum Status {
  ACTIVE = 'active',
  SOLD = 'sold',
}

export interface CarOffer {
  _id: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  description: string;
  mainImage: string;
  images?: string[];
  region: string;
  gearbox: Gearbox;
  status: Status;
  creator: string | User;
  category: string | Category;
  createdAt?: Date;
}
