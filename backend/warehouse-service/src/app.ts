import express from 'express';
import warehouseRoutes from './routes/warehouse.routes';
import { errorHandler } from './middlewares/error.middleware';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/warehouses', warehouseRoutes);

app.use(errorHandler);

export default app;
