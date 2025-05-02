import { Router } from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyById,
} from '../controllers/company.controller';

const router = Router();

router.post('/', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

export default router;
