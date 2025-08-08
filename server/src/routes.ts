import { Router } from 'express';
import { userController } from './controllers/userController';
import { categoryController } from './controllers/categoryController';
import { carOfferController } from './controllers/carOfferController';

const router = Router();

router.use('/users', userController);
router.use('/categories', categoryController);
router.use('/car-offers', carOfferController);

export { router };
