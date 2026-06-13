import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { createAppError } from './error.middleware.js';

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Safely access issues or errors array to prevent undefined map error
      const issues = result.error.issues || result.error.errors || [];
      const message = issues.map(e => e.message).join(', ');

      return next(createAppError(message, 400));
    }

    // Replace req.body with the validated + coerced data from Zod.
    req.body = result.data;
    next();
  };
}