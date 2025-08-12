import { Router } from 'express';
import { trimBody } from '../middlewares/trimBody';
import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { extractErrors } from '../utils/errParse';
import { carOfferService } from '../services/carOfferService';
import { Role, User } from '../models/User.model';
import mongoose from 'mongoose';
import { CarOffer } from '../models/Car-offer.model';

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
    const { page, limit, searchTerm, sort } = req.query;
    const data = await carOfferService.getPaginatedCarOffers(limit, page, searchTerm, sort);
    res.status(200).json(data);
  } catch (error) {
    let errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

carOfferController.get('/:id', async (req: any, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Car offer not found.' });
    }

    const carOfferExists = await CarOffer.findById(id);
    if (!carOfferExists) {
      return res.status(404).json({ error: 'Car offer not found.' });
    }

    const data = await carOfferService.getOneCarOffer(id);
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

carOfferController.put('/:id', isAuthenticated, trimBody, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Car offer not found.' });
    }

    const carOfferExists = await CarOffer.findById(id);
    if (!carOfferExists) {
      return res.status(404).json({ error: 'Car offer not found.' });
    }

    const updatedCarOffer = await carOfferService.editCarOffer(id, { ...req.body });
    res.status(200).json(updatedCarOffer);
  } catch (error) {
    let errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

carOfferController.delete('/:id', isAuthenticated, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }

    const userId = req.user.data.user._id;
    const isAdmin = req.user.data.user.role === Role.ADMIN;
    const id = req.params.id;

    const result = await carOfferService.deleteCarOfferAndCleanup(id, userId, isAdmin);
    return res.status(200).json(result);
  } catch (error: any) {
    const code = error.name === 'ForbiddenError' ? 403 : error.name === 'NotFoundError' ? 404 : 400;
    res.status(code).json({ error: error.message });
  }
});
