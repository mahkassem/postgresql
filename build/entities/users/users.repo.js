"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getByEmail = exports.getById = exports.getAll = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryText = `SELECT * FROM users`;
    const result = yield database_1.default.query(queryText);
    return result.rows;
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryText = `SELECT * FROM users WHERE id = $1`;
    const result = yield database_1.default.query(queryText, [id]);
    return result.rows[0];
});
exports.getById = getById;
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const queryText = `SELECT * FROM users WHERE email = $1`;
    const result = yield database_1.default.query(queryText, [email]);
    return result.rows[0];
});
exports.getByEmail = getByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const queryText = `INSERT INTO users (name, color, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = yield database_1.default.query(queryText, [user.name, user.color, user.email, user.password]);
    return result.rows[0];
});
exports.createUser = createUser;
