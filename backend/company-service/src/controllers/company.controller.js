"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReplenishRequest = exports.rejectReplenishRequest = exports.approveReplenishRequest = exports.createReplenishRequest = exports.getCompaniesByNames = exports.getCompanyWithProducts = exports.getCompanyById = exports.getCompanies = exports.createCompany = void 0;
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
const escapeRegex = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
//This method is not working------------------------------------
const getCompaniesByNames = async (req, res, next) => {
    try {
        const namesQuery = req.query.names;
        if (!namesQuery) {
            res.status(400).json({ message: 'No company names provided' });
            return;
        }
        // Split the names from the query parameter
        const nameArray = namesQuery
            .split(',')
            .map(name => name.trim())
            .filter(name => name.length > 0);
        console.log('🛠 Received names query:', namesQuery);
        console.log('🛠 Cleaned name array:', nameArray);
        // Generate regex pattern for each name (escape special characters)
        const regexArray = nameArray.map(name => new RegExp(`^${escapeRegex(name)}$`, 'i') // case-insensitive, exact match
        );
        console.log('🛠 MongoDB RegExp array:', regexArray);
        // Find companies based on the names
        const companies = await company_model_1.default.find({
            name: { $in: regexArray }
        });
        if (companies.length === 0) {
            res.status(404).json({ message: 'No companies found matching the provided names' });
            return;
        }
        res.status(200).json(companies);
    }
    catch (err) {
        next(err);
    }
};
exports.getCompaniesByNames = getCompaniesByNames;
const replenishRequest_model_1 = __importDefault(require("../models/replenishRequest.model"));
const STOCK_SERVICE_URL = process.env.STOCK_SERVICE_URL || 'http://localhost:5005';
// POST /api/companies/:companyId/replenish-requests
const createReplenishRequest = (req, res) => {
    const { companyId } = req.params;
    const { warehouseId, productId, quantity } = req.body;
    const reqDoc = new replenishRequest_model_1.default({ companyId, warehouseId, productId, quantity });
    reqDoc.save()
        .then(savedDoc => {
        res.status(201).json({ message: 'Replenish request created', data: savedDoc });
    })
        .catch(err => {
        console.error('Error creating replenish request:', err);
        res.status(500).json({ message: 'Failed to create replenish request' });
    });
};
exports.createReplenishRequest = createReplenishRequest;
// POST /api/companies/replenish-requests/:requestId/approve
const approveReplenishRequest = (req, res) => {
    const { requestId } = req.params;
    replenishRequest_model_1.default.findById(requestId)
        .then(reqDoc => {
        if (!reqDoc || reqDoc.status !== 'pending') {
            return Promise.reject({ status: 404, message: 'Not found or already processed' });
        }
        // 1) bump warehouse stock in Stock Service
        return axios_1.default.put(`${STOCK_SERVICE_URL}/api/stocks/warehouse/${reqDoc.warehouseId}/product/${reqDoc.productId}`, { quantityChange: reqDoc.quantity })
            .then(() => reqDoc);
    })
        .then(reqDoc => {
        // 2) mark approved
        reqDoc.status = 'approved';
        return reqDoc.save();
    })
        .then(updatedDoc => {
        res.json({ message: 'Replenish request approved', data: updatedDoc });
    })
        .catch(err => {
        if (err && typeof err.status === 'number') {
            return res.status(err.status).json({ message: err.message });
        }
        console.error('Error approving replenish request:', err);
        res.status(500).json({ message: 'Failed to approve replenish request' });
    });
};
exports.approveReplenishRequest = approveReplenishRequest;
// POST /api/companies/replenish-requests/:requestId/reject
const rejectReplenishRequest = (req, res) => {
    const { requestId } = req.params;
    replenishRequest_model_1.default.findByIdAndUpdate(requestId, { status: 'rejected' }, { new: true })
        .then(updatedDoc => {
        if (!updatedDoc) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json({ message: 'Replenish request rejected', data: updatedDoc });
    })
        .catch(err => {
        console.error('Error rejecting replenish request:', err);
        res.status(500).json({ message: 'Failed to reject replenish request' });
    });
};
exports.rejectReplenishRequest = rejectReplenishRequest;
const handleReplenishRequest = async (req, res) => {
    const { companyId } = req.params;
    const { warehouseId, productId, quantity } = req.body;
    // You can add your actual replenish logic here.
    console.log(`Replenish request received for Company ${companyId}: Warehouse ${warehouseId}, Product ${productId}, Qty ${quantity}`);
    res.status(201).json({
        message: 'Replenish request received',
        data: {
            companyId,
            warehouseId,
            productId,
            quantity,
        },
    });
};
exports.handleReplenishRequest = handleReplenishRequest;
