"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI); // Type assertion to ensure process.env.MONGO_URI is a string
        console.log('Company DB connected');
    }
    catch (error) {
        console.error('Company DB connection failed', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
