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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = exports.getByIdHandler = exports.getAllHandler = void 0;
const users_repo_1 = require("../entities/users/users.repo");
const getAllHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_repo_1.getAll)();
        res.send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllHandler = getAllHandler;
const getByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, users_repo_1.getById)(id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getByIdHandler = getByIdHandler;
const createHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, color, email, password } = req.body;
        const user = yield (0, users_repo_1.createUser)({ name, color, email, password });
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createHandler = createHandler;
