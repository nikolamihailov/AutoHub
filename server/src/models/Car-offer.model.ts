import mongoose, { Schema } from 'mongoose';
import { CategoryI } from './Category.model';
import { UserI } from './User.model';

export enum Gearbox {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
}

export enum Status {
  ACTIVE = 'active',
  SOLD = 'sold',
}

export interface CarOfferI {
  _id: mongoose.Types.ObjectId;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  description: string;
  mainImage: string;
  images: string[];
  region: string;
  gearbox: Gearbox;
  status: Status;
  creator: mongoose.Types.ObjectId | UserI;
  category: mongoose.Types.ObjectId | CategoryI;
}

const carOfferSchema = new Schema<CarOfferI>(
  {
    brand: {
      type: String,
      required: true,
      minlength: [2, 'Brand must be at least 2 characters'],
      maxlength: [32, 'Brand must be at most 32 characters'],
    },
    model: {
      type: String,
      required: true,
      minlength: [1, 'Model must be at least 1 character'],
      maxlength: [32, 'Model must be at most 32 characters'],
    },
    price: {
      type: Number,
      required: true,
      min: [1, 'Price must be greater than 0'],
    },
    year: {
      type: Number,
      required: true,
      min: [1920, 'Year must be greater than 1920'],
    },
    mileage: {
      type: Number,
      required: true,
      min: [0, 'Mileage must be 0 or more'],
      max: [1_000_000, 'Mileage must be less than 1,000,000'],
    },
    gearbox: {
      type: String,
      enum: Object.values(Gearbox),
      required: [true, 'Gearbox is required'],
    },
    status: {
      type: String,
      enum: Object.values(Status),
      required: [true, 'Status is required'],
    },
    description: {
      type: String,
      required: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1500, 'Description must be at most 1500 characters'],
    },
    mainImage: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    region: {
      type: String,
      required: true,
      minlength: [2, 'Region must be at least 2 characters'],
      maxlength: [64, 'Region must be at most 64 characters'],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

export const CarOffer = mongoose.model<CarOfferI>('CarOffer', carOfferSchema);
