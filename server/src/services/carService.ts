import { Car, CarType } from '../models/Car.model';

const getAllCars = () => Car.find();

const createCar = (data: Partial<CarType>) => Car.create(data);

export const carService = {
  getAllCars,
  createCar,
};
