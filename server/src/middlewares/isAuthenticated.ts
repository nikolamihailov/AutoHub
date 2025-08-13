import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface MyRequest extends Request {
  user?: any;
}

export const isAuthenticated = (req: MyRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ unauthorized: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || ''); // sample secret
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ expMessage: 'Your session has expired, you have to login again!' });
  }
};
