import { Router } from "express";
import authRouter from "./auth.routes";
import usersRouter from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);

export default router;