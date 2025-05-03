import { Router } from 'express';
import {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  getWarehouseStock,
  getWarehouseWithBranches,
} from '../controllers/warehouse.controller';

const router = Router();

router.post('/', createWarehouse);
router.get('/', getAllWarehouses);
router.get('/:warehouseId/with-branches', getWarehouseWithBranches);
router.get('/:warehouseId', getWarehouseById);
router.get('/:warehouseId/stock', getWarehouseStock);

export default router;
