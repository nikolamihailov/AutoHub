import mongoose from 'mongoose';

export interface CarType {
  brand: string;
  model: string;
  price: number;
}

const carSchema = new mongoose.Schema<CarType>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Car = mongoose.model<CarType>('Car', carSchema);
