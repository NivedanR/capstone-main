// src/routes/branch.routes.ts
import express from 'express';

const router = express.Router();

import {
  createBranch,
  getAllBranches,
  getBranchesByWarehouseId,
  getBranchStock,
  getBranchWithWarehouseInfo,
} from '../controllers/branch.controller';


router.get('/branches/warehouse/:warehouseId', getBranchesByWarehouseId);
router.get('/branch-with-warehouse/:branchId', getBranchWithWarehouseInfo);//between two microservices

router.post('/branches', createBranch);
router.get('/branches', getAllBranches);

router.get('/branches/:id/stock', getBranchStock);

export default router;
