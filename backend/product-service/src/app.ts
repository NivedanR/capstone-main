import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/product.routes';
import { connectDB } from './config/db';

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

export default app;
