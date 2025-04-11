"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const handleError = (err, req, res, next) => {
    console.log('An error occured: ', err.message);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal server error!',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
};
exports.handleError = handleError;
