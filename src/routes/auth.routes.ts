import { Router } from 'express';
import { registerHanlder, signinHandler } from '../controllers/auth.controller';
import { signinValidator } from '../validators/auth.validators';

const authRouter = Router();

authRouter.post("/register", registerHanlder);
authRouter.post("/signin", signinValidator, signinHandler);

export default authRouter;