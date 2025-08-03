import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/User.model';

interface MyRequest extends Request {
  user?: {
    data: {
      user: {
        _id: string;
        role: Role;
      };
    };
  };
  decToken?: any;
}

export const isAdmin = (req: MyRequest, res: Response, next: NextFunction) => {
  if (req.user?.data.user && req.user?.data.user.role === Role.ADMIN) {
    next();
  } else {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    res.status(401).json({ unauthorized: 'You have no power here!' });
  }
};
