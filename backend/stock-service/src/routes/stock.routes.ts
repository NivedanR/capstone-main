import { Router } from 'express';
import {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
  getStockByWarehouseId,
  getStockByBranchId,
  getStockByBranchAndProduct,
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
router.get('/branch/:branchId/product/:productId', getStockByBranchAndProduct);


export default router;
