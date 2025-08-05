import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/User.model';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const myReq = req as Request & {
    user?: {
      data?: {
        user?: {
          _id: string;
          email: string;
          role: Role;
        };
      };
    };
  };

  if (
    myReq.user &&
    myReq.user.data &&
    myReq.user.data.user &&
    myReq.user.data.user.role === Role.ADMIN
  ) {
    return next();
  }
  return res.status(401).json({ unauthorized: 'You have no power here!' });
};
