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

     export async function deleteUserController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
      try {
        const targetUserId = req.params.id;

        // Call service to perform validation and deletion
        await userService.deleteUser(targetUserId);

        res.status(200).json({
          success: true,
          message: 'User deleted successfully'
        });
      } catch (error) {
        next(error);
      }
    }