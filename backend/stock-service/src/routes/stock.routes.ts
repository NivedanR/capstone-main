import { Router } from 'express';
import {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
  getStockByWarehouseId,
  getStockByBranchId,
} from '../controllers/stock.controller';

const router = Router();

// CRUD
router.post('/', createStock);
router.get('/', getAllStocks);
router.get('/:id', getStockById);
router.put('/:id', updateStock);
router.delete('/:id', deleteStock);

// Stock-by-warehouse (path param)
router.get('/warehouse/:warehouseId', getStockByWarehouseId);

// Stock-by-branch (query param ?branchId=...)
router.get('/branch/:branchId', getStockByBranchId);

export default router;
