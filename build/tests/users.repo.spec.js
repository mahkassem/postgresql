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
const users_repo_1 = require("../entities/users/users.repo");
let testUser;
let testId;
describe('Users Repository', () => {
    it('Should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            name: 'Test User',
            color: '#000000',
            email: 'test1@test.com',
            password: 'test'
        };
        const createdUser = yield (0, users_repo_1.createUser)(user);
        testUser = createdUser;
        testId = createdUser.id;
        delete createdUser.id;
        expect(createdUser).toEqual(user);
    }));
    it('Should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, users_repo_1.getAll)();
        expect(users.length).toBeGreaterThan(0);
    }));
    it('Should get a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, users_repo_1.getById)(testId);
        expect(user.id).toEqual(testId);
    }));
});
