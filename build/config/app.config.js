"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appConfig = {
    port: process.env.PORT || 3000,
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 8,
    bcryptPapper: process.env.BCRYPT_PAPPER,
    jwtSecret: process.env.JWT_SECRET,
};
exports.default = appConfig;
