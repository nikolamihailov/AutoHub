import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CONN_STR = process.env.MONGO_DB_URL; // mongodb://127.0.0.1:27017/
const DB_NAME = process.env.DB_NAME; // autohub-db

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
