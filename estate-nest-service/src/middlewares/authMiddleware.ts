import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Replace with your secret key

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = decoded;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
};
