import { UserRepository } from '../repositories/user.repository.js';
    import { hashPassword } from '../utils/hash.js';
    import { generateToken } from '../utils/jwt.js';
import { createAppError } from '../middleware/error.middleware.js';
    export class AuthService {
      private userRepository: UserRepository;

      constructor() {
        this.userRepository = new UserRepository();
      }

      async register(email: string, password: string, name?: string) {
        // 1. Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw createAppError('User with this email already exists', 400);
            }

        // 2. Hash password
        const passwordHash = await hashPassword(password);

        // 3. Find or create default role
        const defaultRole = await this.userRepository.findOrCreateRole('Developer');

        // 4. Create user record
        const user = await this.userRepository.createUser({
          email,
          passwordHash,
          name,
          roleId: defaultRole.id
        });

        // 5. Generate JWT Token
        const token = generateToken({
          userId: user.id,
          role: user.role.name
        });

        // 6. Return response payload (omitting the password)
        const { password: _, ...userWithoutPassword } = user;
        return {
          user: userWithoutPassword,
          token
        };
      }
    }