"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyById = exports.getCompanies = exports.createCompany = void 0;
const company_model_1 = __importDefault(require("../models/company.model"));
const createCompany = async (req, res, next) => {
    try {
        const { name, contactPerson, contactEmail, contactPhone, address } = req.body;
        const existing = await company_model_1.default.findOne({ contactEmail });
        if (existing) {
            res.status(400).json({ message: 'Company already exists' });
            return;
        }
        const newCompany = new company_model_1.default({ name, contactPerson, contactEmail, contactPhone, address });
        await newCompany.save();
        res.status(201).json({ message: 'Company created', company: newCompany });
    }
    catch (err) {
        next(err);
    }
};
exports.createCompany = createCompany;
const getCompanies = async (req, res, next) => {
    try {
        const companies = await company_model_1.default.find();
        res.status(200).json(companies);
    }
    catch (err) {
        next(err);
    }
};
exports.getCompanies = getCompanies;
const getCompanyById = async (req, res, next) => {
    try {
        const company = await company_model_1.default.findById(req.params.id);
        if (!company) {
            res.status(404).json({ message: 'Company not found' });
            return;
        }
        res.status(200).json(company);
    }
    catch (err) {
        next(err);
    }
};
exports.getCompanyById = getCompanyById;
