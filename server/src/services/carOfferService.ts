import { CarOffer, CarOfferI } from '../models/Car-offer.model';

const createCarOffer = (data: Partial<CarOfferI>) => CarOffer.create(data);

const getAllCarOffers = () => CarOffer.find();

export const carOfferService = {
  getAllCarOffers,
  createCarOffer,
};
