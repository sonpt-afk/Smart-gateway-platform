import { Response, NextFunction } from 'express';
    import { AuthenticatedRequest } from '../types/express.js';
    import { createAppError } from './error.middleware.js';

    export function authorizeRole(allowedRoles: string) {
      return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
        // req.user was populated earlier by our authenticate middleware
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
          return next(createAppError('Forbidden: You do not have permission', 403));
        }

        next();
      };
    }