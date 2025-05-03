"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyWithProducts = exports.getCompanyById = exports.getCompanies = exports.createCompany = void 0;
const company_model_1 = __importDefault(require("../models/company.model"));
const axios_1 = __importDefault(require("axios"));
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
    console.log('🌟 getCompanyWithProducts → hit!', req.method, req.originalUrl);
    try {
        const company = await company_model_1.default.findById(req.params.id);
        if (!company) {
            res.status(404).json({ message: 'Company not found' });
            return;
        }
        console.log('🌟 getCompanyWithProducts → hit!');
        res.status(200).json(company);
    }
    catch (err) {
        next(err);
    }
};
exports.getCompanyById = getCompanyById;
const getCompanyWithProducts = async (req, res, next) => {
    console.log('🌟 getCompanyWithProducts → START', req.method, req.originalUrl); // STEP 1
    try {
        const company = await company_model_1.default.findById(req.params.id);
        console.log('🌟 getCompanyWithProducts → after Company.findById', { company }); // STEP 2
        if (!company) {
            console.log('🌟 getCompanyWithProducts → Company not found'); // STEP 3
            res.status(404).json({ message: 'Company not found' });
            return;
        }
        const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
        console.log('🌟 getCompanyWithProducts → productServiceUrl:', productServiceUrl); // STEP 4
        try {
            const { data: products } = await axios_1.default.get(`${productServiceUrl}/api/products/company/${company._id}`);
            console.log('🌟 getCompanyWithProducts → after axios.get', { products }); // STEP 5
            res.status(200).json({
                company,
                products,
            });
        }
        catch (axiosError) {
            console.error("Axios error", axiosError);
            next(axiosError);
        }
        console.log('🌟 getCompanyWithProducts → after res.status(200).json()'); // STEP 6
    }
    catch (error) {
        console.error('🌟 getCompanyWithProducts → ERROR', error); // STEP 7
        next(error);
    }
    console.log('🌟 getCompanyWithProducts → END'); // STEP 8
};
exports.getCompanyWithProducts = getCompanyWithProducts;
