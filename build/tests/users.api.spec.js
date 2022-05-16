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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const auth_test_helper_1 = require("../utils/auth.test.helper");
let testUser;
describe('Users API', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        testUser = yield (0, auth_test_helper_1.createTestUser)();
    }));
    it('Should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield (0, supertest_1.default)(app_1.default)
            .get('/api/users')
            .set('Authorization', `Bearer ${testUser.token}`)
            .send();
        expect(request.status).toBe(200);
        expect(request.body.length).toBeGreaterThan(0);
    }));
});
