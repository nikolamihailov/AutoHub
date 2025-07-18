import express from 'express';
import dotenv from 'dotenv';
import { cors } from '../middlewares/cors';

dotenv.config();

const PORT = process.env.PORT || 5173;

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors);

  app.get('/', (req, res) => {
    res.send('working');
  });

  app.listen(PORT, () => {
    console.log(`I am listening boy, everything I hear is on - ${PORT} port`);
  });
};
