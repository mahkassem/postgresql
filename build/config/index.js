"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = __importDefault(require("./app.config"));
const database_config_1 = __importDefault(require("./database.config"));
const config = {
    app: app_config_1.default,
    db: database_config_1.default
};
exports.default = config;
