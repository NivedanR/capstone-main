import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';  // Adjust the import path based on your file structure
import companyRoutes from './routes/company.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/company', companyRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to the database
connectDB();

// Start the server
const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Company service running on port ${PORT}`);
});
