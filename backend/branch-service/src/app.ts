import express from 'express';
import dotenv from 'dotenv';
import branchRoutes from './routes/branch.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', branchRoutes);

export default app;
