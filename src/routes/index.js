import { Router } from "express";
import usersRouter from "./usersRouter.js";
import urlsRouter from "./urlsRouter.js";

const router = Router();

router.use(usersRouter);
router.use(urlsRouter);

export default router;