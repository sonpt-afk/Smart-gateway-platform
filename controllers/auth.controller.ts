 import { Request, Response, NextFunction } from 'express';
    import { AuthService } from '../services/auth.service.js';
import Joi from 'joi'

    export class AuthController {
      private authService: AuthService;

      constructor() {
        this.authService = new AuthService();
      }

      register = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email, password, name } = req.body;

          // Basic parameter validations
          if (!email || !password) {
            return res.status(400).json({
              success: false,
              message: 'Email and password are required'
            });
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return res.status(400).json({
              success: false,
              message: 'Invalid email format'
            });
          }

          if (password.length < 6) {
            return res.status(400).json({
              success: false,
              message: 'Password must be at least 6 characters long'
            });
          }

          const result = await this.authService.register(email, password, name);

          res.status(201).json({
            success: true,
            data: result
          });
        } catch (error) {
          next(error);
        }
      };

      login = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email, password } = req.body;

          // Basic parameter validations
          if (!email || !password) {
            return res.status(400).json({
              success: false,
              message: 'Email and password are required'
            });
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            return res.status(400).json({
              success: false,
              message: 'Invalid email format'
            });
          }

          if (password.length < 6) {
            return res.status(400).json({
              success: false,
              message: 'Password must be at least 6 characters long'
            });
          }

          const result = await this.authService.register(email, password, name);

          res.status(201).json({
            success: true,
            data: result
          });
        } catch (error) {
          next(error);
        }
      };
    }