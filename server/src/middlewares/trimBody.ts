import { Request, Response, NextFunction } from 'express';

export const trimBody = (req: Request, _: Response, next: NextFunction) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') req.body[key] = req.body[key].trim();
  }
  next();
};
