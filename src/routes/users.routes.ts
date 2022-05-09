import { Router } from 'express';
import { createHandler, getAllHandler, getByIdHandler } from '../controllers/users.controller';
import { authGuard } from '../validators/auth.validators';

const usersRouter = Router();

usersRouter.get("/", authGuard, getAllHandler);

usersRouter.get("/:id", authGuard, getByIdHandler);

usersRouter.post("/", authGuard, createHandler);

export default usersRouter;