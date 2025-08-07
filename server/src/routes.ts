import { Router } from 'express';
import { carsController } from './controllers/carController';
import { userController } from './controllers/userController';
import { categoryController } from './controllers/categoryController';

const router = Router();

router.use('/users', userController);
router.use('/cars', carsController);
router.use('/categories', categoryController);

export { router };
