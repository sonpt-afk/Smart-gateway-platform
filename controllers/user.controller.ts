import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/express.js';
import * as userService from '../services/user.service.js';

    export async function updateUserRoleController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
      try {
        const targetUserId = req.params.id;
        const { roleName } = req.body;

        const updatedUser = await userService.assignRoleToUser(targetUserId, roleName);

        res.status(200).json({
          success: true,
          data: updatedUser
        });
      } catch (error) {
        next(error);
      }
    }