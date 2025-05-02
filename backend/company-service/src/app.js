"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const company_routes_1 = __importDefault(require("./routes/company.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware for JSON request bodies
app.use(express_1.default.json());
// Routes for company service
app.use('/api/company', company_routes_1.default);
// Global error handling middleware
app.use(error_middleware_1.errorHandler);
exports.default = app;
