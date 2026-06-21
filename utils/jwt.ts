import jwt from 'jsonwebtoken';
import {RoleName} from '../middleware/auth.middleware'

    const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

    export interface TokenPayload {
      userId: string;
      role: RoleName;
    }

    export function generateToken(payload: TokenPayload): string {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    }

    export function verifyToken(token: string): TokenPayload {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    }