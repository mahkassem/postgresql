"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validators_1 = require("../validators/auth.validators");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", auth_controller_1.registerHanlder);
authRouter.post("/signin", auth_validators_1.signinValidator, auth_controller_1.signinHandler);
exports.default = authRouter;
