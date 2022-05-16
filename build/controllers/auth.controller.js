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
exports.signinHandler = exports.registerHanlder = void 0;
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_repo_1 = require("../entities/users/users.repo");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerHanlder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, color, email, password } = req.body;
        // hash password logic
        password = yield bcrypt_1.default.hash(password + config_1.default.app.bcryptPapper, config_1.default.app.bcryptRounds);
        // save user into database
        const user = yield (0, users_repo_1.createUser)({ name, color, email, password });
        // return success message
        delete user.password;
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.registerHanlder = registerHanlder;
const signinHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // check if user exists
        const user = yield (0, users_repo_1.getByEmail)(email);
        // generate token
        const token = jsonwebtoken_1.default.sign({ sub: user.email, customClaims: 'special user' }, config_1.default.app.jwtSecret, { expiresIn: '1h' });
        // return jwt token
        res.send({ token: token });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.signinHandler = signinHandler;
