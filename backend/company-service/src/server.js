"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const company_routes_1 = __importDefault(require("./routes/company.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mount the company routes under /api/company
app.use('/api/company', company_routes_1.default);
// A catch-all to log any unmatched routes
app.use((req, res) => {
    console.log(`❓ Unmatched route: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: `No handler for ${req.method} ${req.originalUrl}` });
});
// Global error handler
app.use((err, _req, res, _next) => {
    console.error('🔥 Unhandled Error:', err);
    res.status(500).json({ error: err.message || 'Server error' });
});
// Start
const PORT = Number(process.env.PORT) || 5001;
(0, db_1.connectDB)().then(() => {
    app.listen(PORT, () => console.log(`Company service running on port ${PORT}`));
});
