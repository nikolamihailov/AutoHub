import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { jwt } from '../utils/jwt';
import bcrypt from 'bcrypt';
import { Role, User, UserI } from '../models/User.model';

dotenv.config();
const SECRET = process.env.JWT_SECRET;

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

const getUserInfo = (id: string) => User.findById(id);

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

/* const getFavouriteProducts = (id) =>
  User.findById(id).populate({
    path: 'favouriteProducts',
    populate: [
      {
        path: 'category',
        model: 'Category',
      },
      {
        path: 'reviews',
        model: 'Review',
      },
    ],
  });

const addProductToFavourites = (id, product) =>
  User.findByIdAndUpdate(
    id,
    {
      $push: {
        favouriteProducts: product.productId,
      },
    },
    { new: true, runValidators: true }
  ).populate('favouriteProducts');

const removeProductFromFavourites = async (id, product) => {
  const obj = new mongoose.Types.ObjectId(product.productId);

  const user = await User.findByIdAndUpdate(
    id,
    { $pull: { favouriteProducts: obj } },
    { new: true }
  ).populate({
    path: 'favouriteProducts',
    populate: [
      {
        path: 'category',
        model: 'Category',
      },
      {
        path: 'reviews',
        model: 'Review',
      },
    ],
  });

  return user;
}; */

const getAllUsers = () => User.find();

/* const getAllWithFilters = async (itemsPerPage, page, filter) => {
  const query = {};
  if (filter) {
    if (filter.includes('firstName')) query.firstName = filter.split('-')[1];
    if (filter.includes('createdAt')) query.createdAt = filter.split('-')[1];
    if (filter === 'admins') query.role = 'admin';
  }

  let users;
  if (query.role) users = await User.find(query);
  else if (Object.keys(query).length > 0)
    users = await User.find().sort(query).collation({ locale: 'en', strength: 3 });
  else users = await User.find();

  const usersCount = users.length;
  let pageCount = Math.ceil(usersCount / Number(itemsPerPage));
  let skip = Number(itemsPerPage) * (Number(page) - 1);

  if (usersCount <= Number(itemsPerPage)) {
    skip = 0;
    pageCount = 1;
  }

  users = users.slice(skip, skip + Number(itemsPerPage));
  return { users, pageCount, usersCount };
}; */

const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  return User.findByIdAndDelete(id);
};

const getAllCount = () => User.estimatedDocumentCount();

export const userService = {
  login,
  register,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  getAllUsers,
  getAllCount,
};
