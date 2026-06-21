  import { Response, NextFunction } from 'express';
  import { verifyToken } from '../utils/jwt.js';
  import { createAppError } from './error.middleware.js';
  import { AuthenticatedRequest } from '../types/express.js'; // or local type definition


    export type RoleName = 'Admin' | 'Developer' | 'User';

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

    export const authorizeRoles = (...allowedRoles: RoleName[]) => {
      return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check whether the user's roleName is in the allowed list
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Forbidden: You do not have permission' });
        }

        next();
      };
    };