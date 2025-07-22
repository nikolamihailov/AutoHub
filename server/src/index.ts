import { connectDb } from './config/db';
import { startServer } from './config/express';

connectDb()
  .then(() => {
    startServer();
  })
  .catch(() => {
    console.error('The API is shit');
  });
