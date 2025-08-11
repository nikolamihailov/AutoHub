import { CarOffer, CarOfferI } from '../models/Car-offer.model';

const createCarOffer = (data: Partial<CarOfferI>) => CarOffer.create(data);

const getAllCarOffers = () => CarOffer.find();

const getAllCount = () => CarOffer.estimatedDocumentCount();

export const carOfferService = {
  getAllCarOffers,
  createCarOffer,
  getAllCount,
};
