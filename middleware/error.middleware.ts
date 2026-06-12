 import { Request, Response, NextFunction } from 'express';

    // 1. Define the custom interface extending the standard Error
    export interface AppError extends Error {
      statusCode?: number;
    }

    // 2. Factory function to create error objects (replaces class inheritance)
    export function createAppError(message: string, statusCode = 500): AppError {
      const error = new Error(message) as AppError;
      error.statusCode = statusCode;
      return error;
    }

    // 3. Centralized error handling middleware
    export function errorHandler(
      err: AppError,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      console.error(`[Error Log]: ${err.stack || err.message}`);

      const statusCode = err.statusCode || 500;
      const message = err.message || 'Internal Server Error';

      res.status(statusCode).json({
        success: false,
        message
      });
    }