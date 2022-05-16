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
exports.authGuard = exports.signinValidator = void 0;
const users_repo_1 = require("../entities/users/users.repo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signinValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // check if user exists
        const userExists = yield (0, users_repo_1.getByEmail)(email);
        if (!userExists) {
            res.status(401).send('User does not exist');
            return;
        }
        // check if password is correct: compare hashed password with password from database
        const isPasswordCorrect = yield bcrypt_1.default.compare(password + config_1.default.app.bcryptPapper, userExists.password);
        if (!isPasswordCorrect) {
            res.status(401).send('Password is not correct');
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.signinValidator = signinValidator;
const authGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).send('No token provided');
            return;
        }
        // verify token
        const tokenArray = token.split(' ');
        const verify = jsonwebtoken_1.default.verify(tokenArray[1], config_1.default.app.jwtSecret);
        if (!verify) {
            res.status(401).send('Token is not valid');
            return;
        }
        // check if user exists
        const { sub } = verify;
        const userExists = yield (0, users_repo_1.getByEmail)(sub);
        if (!userExists) {
            res.status(401).send('User does not exist');
            return;
        }
        // store user in request object
        res.locals.user = userExists;
        next();
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.authGuard = authGuard;
