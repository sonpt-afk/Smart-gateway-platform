  import { Response, NextFunction } from 'express';
  import { verifyToken } from '../utils/jwt.js';
  import { createAppError } from './error.middleware.js';
  import { AuthenticatedRequest } from '../types/express.js'; // or local type definition

    export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw createAppError('No token provided', 401);
        }

        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = verifyToken(token);

        // Attach the decoded token payload to the request object
        req.user = decoded;

        next();
      } catch (error) {
        next(createAppError('Invalid or expired token', 401));
      }
    }