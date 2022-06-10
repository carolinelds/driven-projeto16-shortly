import { Router } from 'express';
import { register, login } from './../controllers/authController.js';

const authRouter = Router();

authRouter.post("/signup", register);
authRouter.post("/signin", login);

export default authRouter;

