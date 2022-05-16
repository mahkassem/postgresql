"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const pg_1 = require("pg");
const db = new pg_1.Pool({
    user: config_1.default.db.user,
    password: config_1.default.db.password,
    host: config_1.default.db.host,
    port: config_1.default.db.port,
    database: config_1.default.db.database,
});
exports.default = db;
