import { Router } from 'express';
import { carsController } from './controllers/carController';
import { userController } from './controllers/userController';

const router = Router();

router.use('/users', userController);
router.use('/cars', carsController);

export { router };
