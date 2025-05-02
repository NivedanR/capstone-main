import { Router } from 'express';
import { createBranch, getAllBranches } from '../controllers/branch.controller';

const router = Router();

router.post('/branches', createBranch);
router.get('/branches', getAllBranches);

export default router;
