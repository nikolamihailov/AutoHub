import { Request, Response, NextFunction } from 'express';

export const cors = () => (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
};
