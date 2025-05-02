import express from 'express';
import warehouseRoutes from './routes/warehouse.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(express.json());

app.use('/api/warehouses', warehouseRoutes);

app.use(errorHandler);

export default app;
