import { Router } from 'express';
import {
  createCompany,
  getCompanies,
  getCompaniesByNames,
  getCompanyById,
  getCompanyWithProducts,
} from '../controllers/company.controller';

const router = Router();

router.post('/', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.get('/:id/products', getCompanyWithProducts); 
router.get('/by-names', getCompaniesByNames); 
console.log('🔌 company.routes.ts is loaded');
export default router;
