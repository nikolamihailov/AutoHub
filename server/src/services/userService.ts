import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { jwt } from '../utils/jwt';
import bcrypt from 'bcrypt';
import { Role, User, UserI } from '../models/User.model';
import { Sort } from '../enums/Sort.enum';
import { CarOffer } from '../models/Car-offer.model';

dotenv.config();
const SECRET = process.env.JWT_SECRET; // sample secret

const register = async (data: UserI) => {
  const { email } = data;
  const userEx = await User.findOne({ email });
  if (userEx) throw new Error('Email already exits!');

  let user = await User.create(data);
  if (user) {
    const payload = {
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    };
    const token = await generateToken(payload);
    return {
      ...payload,
      token,
    };
  }
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password!');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error('Invalid email or password!');
  const payload = {
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
  };
  const token = await generateToken(payload);
  return {
    ...payload,
    token,
  };
};

async function generateToken(data: {
  user: { _id: mongoose.Types.ObjectId; email: string; role: Role };
}) {
  if (SECRET) {
    return await jwt.sign({ data }, SECRET, { expiresIn: '1d' });
  }
}

const getUserInfo = (id: string) => User.findById(id).populate('savedCarOffers');

const updateUserInfo = async (id: string, data: Partial<UserI>) => {
  const { email } = data;
  const obj = new mongoose.Types.ObjectId(id);
  const userWithNewEmail = await User.findOne({ email, _id: { $ne: obj } });
  if (userWithNewEmail) {
    throw new Error('Email already exists!');
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

  return user;
};
const getSavedCarOffers = (userId: string) =>
  User.findById(userId).populate({
    path: 'savedCarOffers',
    populate: {
      path: 'category',
      model: 'Category',
    },
  });

const addCarOfferToSaved = (userId: string, carOfferId: string) =>
  User.findByIdAndUpdate(
    userId,
    {
      $push: { savedCarOffers: carOfferId },
    },
    { new: true, runValidators: true }
  ).populate({
    path: 'savedCarOffers',
    populate: {
      path: 'category',
      model: 'Category',
    },
  });

const removeCarOfferFromSaved = async (userId: string, carOfferId: string) => {
  const objId = new mongoose.Types.ObjectId(carOfferId);

  return await User.findByIdAndUpdate(
    userId,
    { $pull: { savedCarOffers: objId } },
    { new: true }
  ).populate({
    path: 'savedCarOffers',
    populate: {
      path: 'category',
      model: 'Category',
    },
  });
};

const getAllUsers = () => User.find();

const getPaginatedUsers = async (limit: string, page: string, searchTerm: string, sort: Sort) => {
  const usersPerPage = parseInt(limit, 10) || 6;
  const userPage = parseInt(page, 10) || 1;

  const searchQuery = searchTerm
    ? {
        $or: [
          { firstName: { $regex: searchTerm, $options: 'i' } },
          { lastName: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  let sortOrder = Sort.ASC;
  if (sort === Sort.DESC) sortOrder = Sort.DESC;

  const usersCount = await User.countDocuments(searchQuery);
  const pageCount = Math.ceil(usersCount / usersPerPage);

  const users = await User.find(searchQuery)
    .sort({ firstName: sortOrder, lastName: sortOrder })
    .skip((userPage - 1) * usersPerPage)
    .limit(usersPerPage);

  return { users, pageCount, usersCount };
};

const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  const offers = await CarOffer.find({ creator: user._id }, { _id: 1 }).lean();
  const offerIds = offers.map((o) => o._id);

  if (offerIds.length > 0) {
    await CarOffer.deleteMany({ _id: { $in: offerIds } });

    await Promise.all([
      User.updateMany(
        { savedCarOffers: { $in: offerIds } },
        { $pull: { savedCarOffers: { $in: offerIds } } }
      ),
      User.updateMany(
        { carOffers: { $in: offerIds } },
        { $pull: { carOffers: { $in: offerIds } } }
      ),
    ]);
  }

  await User.deleteOne({ _id: user._id });

  return { deletedUserId: String(user._id), deletedOffersCount: offerIds.length };
};

const getAllCount = () => User.estimatedDocumentCount();

export const userService = {
  login,
  register,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  getAllUsers,
  getPaginatedUsers,
  getAllCount,
  getSavedCarOffers,
  addCarOfferToSaved,
  removeCarOfferFromSaved,
};
