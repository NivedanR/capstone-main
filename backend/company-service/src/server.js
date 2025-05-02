"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db"); // Adjust the import path based on your file structure
const company_routes_1 = __importDefault(require("./routes/company.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/company', company_routes_1.default);
// Error Handling Middleware
app.use(error_middleware_1.errorHandler);
// Connect to the database
(0, db_1.connectDB)();
// Start the server
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Company service running on port ${PORT}`);
});
