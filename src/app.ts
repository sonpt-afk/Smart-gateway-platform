import 'dotenv/config';
import express from 'express';
    import authRoutes from '../routes/auth.routes.js';
    import { errorHandler } from '../middleware/error.middleware.js';

    const app = express();

    // Middlewares
    app.use(express.json());

    // Healthcheck
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
      });
    });

    // Mount Routers
    app.use('/auth', authRoutes);

    // Error Handler Middleware (MUST be registered last)
    app.use(errorHandler);

    export default app;