import { userRepository }   from '../repositories/user.repository.js';
    import { hashPassword } from '../utils/hash.js';
    import { generateToken } from '../utils/jwt.js';
import { createAppError } from '../middleware/error.middleware.js';
import { comparePassword } from '../utils/hash.js';
    import { RegisterInput,
         LoginInput }       from '../validators/auth.validator.js';
         
export async function register(input: RegisterInput) {
  const existing = await userRepository.findByEmail(input.email);
  if (existing) {
    throw createAppError('User with this email already exists', 409);
  }

  const passwordHash = await hashPassword(input.password);
  const defaultRole  = await userRepository.findOrCreateRole('Developer');
  const user         = await userRepository.createUser({
    email:        input.email,
    passwordHash,
    name:         input.name,
    roleId:       defaultRole.id,
  });

  const token = generateToken({ userId: user.id, role: user.role.name });

  const { password: _pw, ...safeUser } = user;
  return { user: safeUser, token };
}

export async function login(input: LoginInput) {
  const user = await userRepository.findByEmail(input.email);
  if (!user) {
    throw createAppError('Invalid email or password', 401);
  }

  const isMatch = await comparePassword(input.password, user.password);
  if (!isMatch) {
    throw createAppError('Invalid email or password', 401);
  }

  const token = generateToken({ userId: user.id, role: user.role.name });

  const { password: _pw, ...safeUser } = user;
  return { user: safeUser, token };
}