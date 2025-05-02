"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = require("../controllers/company.controller");
const router = (0, express_1.Router)();
router.post('/', company_controller_1.createCompany);
router.get('/', company_controller_1.getCompanies);
router.get('/:id', company_controller_1.getCompanyById);
exports.default = router;
