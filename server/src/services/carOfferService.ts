import { CarOffer, CarOfferI } from '../models/Car-offer.model';

const createCarOffer = (data: Partial<CarOfferI>) => CarOffer.create(data);

const getPaginatedCarOffers = async (limit: string, page: string) => {
  const carOffersPerPage = parseInt(limit, 10) || 6;
  const carOfferPage = parseInt(page, 10) || 1;

  /*  const searchQuery = searchTerm
    ? {
        $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
      }
    : {};

  let sortOrder = Sort.ASC;
  if (sort === Sort.DESC) sortOrder = Sort.DESC; */

  const categoryCount = await CarOffer.countDocuments();
  const pageCount = Math.ceil(categoryCount / carOffersPerPage);

  const carOffers = await CarOffer.find()
    /*   .sort({ name: sortOrder }) */
    .skip((carOfferPage - 1) * carOffersPerPage)
    .limit(carOffersPerPage);

  return { carOffers, pageCount, categoryCount };
};

const getAllCarOffers = () => CarOffer.find();

const getAllCount = () => CarOffer.estimatedDocumentCount();

export const carOfferService = {
  getAllCarOffers,
  getPaginatedCarOffers,
  createCarOffer,
  getAllCount,
};
