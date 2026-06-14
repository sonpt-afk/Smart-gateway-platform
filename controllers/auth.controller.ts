import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';
import { AuthenticatedRequest } from '../types/express.js';
import { createAppError } from '../middleware/error.middleware.js';
import { userRepository } from '../repositories/user.repository.js';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw createAppError('User not authenticated', 401);
      }

      const user = await userRepository.findById(userId);
      if (!user) {
        throw createAppError('User not found', 404);
      }

      const { password: _, ...safeUser } = user;
      res.status(200).json({
        success: true,
        data: safeUser
      });
    } catch (error) {
      next(error);
    }
  }