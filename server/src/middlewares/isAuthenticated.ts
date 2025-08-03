import { Request, Response, NextFunction } from 'express';

interface MyRequest extends Request {
  user?: {
    data: {
      user: {
        _id: string;
      };
    };
  };
  decToken?: any;
}

export const isAuthenticated = (req: MyRequest, res: Response, next: NextFunction) => {
  if (req.user?.data.user._id) {
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
