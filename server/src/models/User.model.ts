import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserI {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  role: Role;
  accounType: AccountType;
  // savedCarOffers: CarOffer[];
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AccountType {
  PRIVATE_ACCOUNT = 'privateAccount',
  DEALERSHIP = 'dealership',
}

const userSchema = new mongoose.Schema<UserI>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required!'],
      minLength: [3, 'First name must be at least 3 characters!'],
      maxLength: [15, 'First name must not be more than 15 characters!'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required!'],
      minLength: [3, 'Last name must be at least 3 characters!'],
      maxLength: [15, 'Last name must not be more than 15 characters!'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      minLength: [7, 'Email must be at least 7 characters!'],
      maxLength: [25, 'Email must not be more than 25 characters!'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Provide a valid email address!'],
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minLength: [6, 'Password must be at least 6 characters!'],
      maxLength: [20, 'Password must not be more than 20 characters!'],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: Role,
      default: Role.USER,
    },
    accounType: {
      type: String,
      enum: AccountType,
    },
    /*   savedCarOffers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'CarOffer',
      },
    ], */
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 11);
  this.password = hash;
});

export const User = mongoose.model<UserI>('User', userSchema);
