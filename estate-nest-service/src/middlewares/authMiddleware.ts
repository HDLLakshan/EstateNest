// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = 'your-secret-key'; // Replace with your actual secret key

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     (req as any).user = decoded; // Attach user info to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token', error });
//   }
// };
