import { Router } from 'express';
import { createWarehouse, getAllWarehouses } from '../controllers/warehouse.controller';

const router = Router();

router.post('/', createWarehouse);
router.get('/', getAllWarehouses);

export default router;
