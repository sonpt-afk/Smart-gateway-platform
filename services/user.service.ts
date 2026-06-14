    import { userRepository } from '../repositories/user.repository.js';
    import { createAppError } from '../middleware/error.middleware.js';

    export async function assignRoleToUser(userId: string, roleName: string) {
      // 1. Verify user existence
      const user = await userRepository.findById(userId);
      if (!user) {
        throw createAppError('User not found', 404);
      }

      // 2. Verify role existence
      const role = await userRepository.findRoleByName(roleName);
      if (!role) {
        throw createAppError(`Role '${roleName}' does not exist`, 404);
      }

      // 3. Update the user's role
      const updatedUser = await userRepository.updateUser(userId, {
        roleId: role.id
      });

      // 4. Sanitize and return the response
      const { password: _, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    }