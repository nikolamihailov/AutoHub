import { Sort } from '../enums/Sort.enum';
import { CarOffer, CarOfferI, Status } from '../models/Car-offer.model';
import { Category } from '../models/Category.model';
import { User } from '../models/User.model';

const createCarOffer = (data: Partial<CarOfferI>) => CarOffer.create(data);

const getPaginatedCarOffers = async (
  limit: string,
  page: string,
  searchTerm: string,
  sort: Sort
) => {
  const carOffersPerPage = parseInt(limit, 10) || 6;
  const carOfferPage = parseInt(page, 10) || 1;

  const searchQuery = searchTerm
    ? {
        $or: [
          { brand: { $regex: searchTerm, $options: 'i' } },
          { model: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  let sortOrder = Sort.ASC;
  if (sort === Sort.DESC) sortOrder = Sort.DESC;

  const categoryCount = await CarOffer.countDocuments();
  const pageCount = Math.ceil(categoryCount / carOffersPerPage);

  const carOffers = await CarOffer.find(searchQuery)
    .sort({ createdAt: sortOrder })
    .skip((carOfferPage - 1) * carOffersPerPage)
    .limit(carOffersPerPage);

  return { carOffers, pageCount, categoryCount };
};

const getPaginatedCarOffersActive = async (
  limit: string,
  page: string,
  searchTerm: string,
  sortOption: string = 'date_desc', // default
  category?: string
) => {
  const carOffersPerPage = parseInt(limit, 10) || 6;
  const carOfferPage = parseInt(page, 10) || 1;

  const searchQuery: any = { status: Status.ACTIVE };

  if (searchTerm) {
    searchQuery.$or = [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (category) {
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) searchQuery.category = categoryDoc._id;
  }

  let sortConfig: Record<string, 1 | -1> = {};
  switch (sortOption) {
    case 'price_asc':
      sortConfig = { price: 1 };
      break;
    case 'price_desc':
      sortConfig = { price: -1 };
      break;
    case 'date_asc':
      sortConfig = { createdAt: 1 };
      break;
    case 'date_desc':
    default:
      sortConfig = { createdAt: -1 };
  }

  const categoryCount = await CarOffer.countDocuments(searchQuery);
  const pageCount = Math.ceil(categoryCount / carOffersPerPage);

  const carOffers = await CarOffer.find(searchQuery)
    .sort(sortConfig)
    .skip((carOfferPage - 1) * carOffersPerPage)
    .limit(carOffersPerPage);

  return { carOffers, pageCount, categoryCount };
};

const getPaginatedCarOffersForUser = async (
  id: string,
  limit: string,
  page: string,
  searchTerm: string,
  active: string
) => {
  const carOffersPerPage = parseInt(limit, 10) || 6;
  const carOfferPage = parseInt(page, 10) || 1;

  const searchQuery: any = { creator: id };

  if (active) {
    searchQuery.status = Status.ACTIVE;
  }

  if (searchTerm) {
    searchQuery.$or = [
      { brand: { $regex: searchTerm, $options: 'i' } },
      { model: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const categoryCount = await CarOffer.countDocuments(searchQuery);
  const pageCount = Math.ceil(categoryCount / carOffersPerPage);

  const carOffers = await CarOffer.find(searchQuery)
    .skip((carOfferPage - 1) * carOffersPerPage)
    .limit(carOffersPerPage);

  return { carOffers, pageCount, categoryCount };
};

const getAllCarOffers = () => CarOffer.find();

const getAllCount = () => CarOffer.estimatedDocumentCount();

const getOneCarOffer = (id: string) =>
  CarOffer.findById(id)
    .populate('category')
    .populate({
      path: 'creator',
      populate: {
        path: 'savedCarOffers',
        model: 'CarOffer',
      },
    });

const editCarOffer = (id: string, data: Partial<CarOfferI>) =>
  CarOffer.findByIdAndUpdate(id, data, { new: true, runValidators: true });

class ForbiddenError extends Error {
  name = 'ForbiddenError';
}
class NotFoundError extends Error {
  name = 'NotFoundError';
}

export const deleteCarOfferAndCleanup = async (
  offerId: string,
  currentUserId: string,
  isAdmin: boolean
) => {
  const offer = await CarOffer.findById(offerId);
  if (!offer) throw new NotFoundError('Car offer not found');
  if (!isAdmin && String(offer.creator) !== String(currentUserId)) {
    throw new ForbiddenError('You are not allowed to delete this car offer');
  }

  await CarOffer.deleteOne({ _id: offer._id });

  await Promise.all([
    User.updateOne(
      { _id: offer.creator },
      { $pull: { carOffers: offer._id, savedCarOffers: offer._id } }
    ),

    User.updateMany({ savedCarOffers: offer._id }, { $pull: { savedCarOffers: offer._id } }),
  ]);

  return { _id: offer._id };
};

const getAllFromCategory = (categoryId: string) => CarOffer.find({ category: categoryId });

export const carOfferService = {
  getAllCarOffers,
  getPaginatedCarOffers,
  getPaginatedCarOffersActive,
  getPaginatedCarOffersForUser,
  getAllFromCategory,
  getOneCarOffer,
  createCarOffer,
  getAllCount,
  editCarOffer,
  deleteCarOfferAndCleanup,
};
