import express from 'express';
import dotenv from 'dotenv';
import companyRoutes from './routes/company.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

// Middleware for JSON request bodies
app.use(express.json());

// Routes for company service
app.use('/api/company', companyRoutes);

// Global error handling middleware
app.use(errorHandler);

export default app;
