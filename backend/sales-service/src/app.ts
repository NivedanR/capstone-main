import express from 'express';
import cors from 'cors';
import salesRoutes from './routes/sales.routes';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/sales', salesRoutes);
app.use(errorHandler);

export default app;
