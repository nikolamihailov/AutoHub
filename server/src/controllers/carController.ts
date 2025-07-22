import { Request, Response, Router } from 'express';
import { carService } from '../services/carService';
import { trimBody } from '../middlewares/trimBody';
import { extractErrors } from '../utils/errParse';

const carsController = Router();

carsController.get('/', async (_: Request, res: Response) => {
  try {
    const allCars = await carService.getAllCars();
    res.status(200).json(allCars);
  } catch (error) {
    res.status(400).json({ error });
  }
});

carsController.post('/', trimBody, async (req: Request, res: Response) => {
  try {
    const newCar = await carService.createCar({ ...req.body });
    res.status(201).json(newCar);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

export { carsController };
