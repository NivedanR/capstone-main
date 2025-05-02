import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import branchRoutes from './routes/branch.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', branchRoutes);

const port = process.env.PORT || 5004;
app.listen(port, () => {
  console.log(`Branch Service running on port ${port}`);
  connectDB();
});

export default app;