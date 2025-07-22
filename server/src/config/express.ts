import express from 'express';
import dotenv from 'dotenv';
import { cors } from '../middlewares/cors';
import { router } from '../routes';

dotenv.config();

const PORT = process.env.PORT || 5173;

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors);

  app.use(router);

  app.get('/', (_, res) => {
    res.send('working');
  });

  app.listen(PORT, () => {
    console.log(`I am listening boy, everything I hear is on - ${PORT} port`);
  });
};
