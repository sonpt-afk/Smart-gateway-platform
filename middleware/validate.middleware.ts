import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { createAppError } from './error.middleware.js';

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issues = result.error.issues || [];
      const message = issues.map(e => e.message).join(', ');

      return next(createAppError(message, 400));
    }

    req.body = result.data;
    next();
  };
}