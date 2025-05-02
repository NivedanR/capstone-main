import express from 'express';
import cors from 'cors';
import stockRoutes from './routes/stock.routes';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/stocks', stockRoutes);
app.use(errorHandler);

export default app;
