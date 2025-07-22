import { Router } from 'express';
import { carsController } from './controllers/carController';

const router = Router();

router.use('/cars', carsController);

export { router };
