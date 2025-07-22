import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CONN_STR = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

export const connectDb = async () => {
  try {
    if (CONN_STR && DB_NAME) {
      await mongoose.connect(CONN_STR + DB_NAME);
      console.log("Database connected, let's gooo!");
    }
  } catch (error) {
    console.log('DB connect fail, LOL!', error);
    process.exit(1);
  }
};
