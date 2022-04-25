import { Router } from 'express';
import { createHandler, getAllHandler, getByIdHandler } from '../controllers/users.controller';

const usersRouter = Router();

usersRouter.get("/", getAllHandler);

usersRouter.get("/:id", getByIdHandler);

usersRouter.post("/", createHandler);

export default usersRouter;