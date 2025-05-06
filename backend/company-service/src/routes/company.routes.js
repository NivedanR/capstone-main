"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = require("../controllers/company.controller");
const router = (0, express_1.Router)();
router.post('/', company_controller_1.createCompany);
router.get('/', company_controller_1.getCompanies);
router.get('/:id', company_controller_1.getCompanyById);
router.get('/:id/products', company_controller_1.getCompanyWithProducts);
router.get('/by-names', company_controller_1.getCompaniesByNames);
console.log('🔌 company.routes.ts is loaded');
router.post('/:companyId/replenish-requests', company_controller_1.createReplenishRequest);
// Approve or reject it
router.post('/replenish-requests/:requestId/approve', company_controller_1.approveReplenishRequest);
router.post('/replenish-requests/:requestId/reject', company_controller_1.rejectReplenishRequest);
exports.default = router;
