import { Router } from 'express';
import { trimBody } from '../middlewares/trimBody';
import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { extractErrors } from '../utils/errParse';
import { carOfferService } from '../services/carOfferService';
import { User } from '../models/User.model';

export const carOfferController = Router();

carOfferController.get('/count', async (_, res) => {
  try {
    const carOffersCount = await carOfferService.getAllCount();
    res.status(200).json(carOffersCount);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

carOfferController.get('/', async (req: any, res) => {
  try {
    const { page, limit } = req.query;
    const data = await carOfferService.getPaginatedCarOffers(limit, page);
    res.status(200).json(data);
  } catch (error) {
    let errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

carOfferController.post('/', isAuthenticated, trimBody, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const newCarOffer = await carOfferService.createCarOffer({
      ...req.body,
    });

    await User.findByIdAndUpdate(req.body.creator, {
      $push: { carOffers: newCarOffer._id },
    });
    res.status(201).json(newCarOffer);
  } catch (error) {
    let errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});
