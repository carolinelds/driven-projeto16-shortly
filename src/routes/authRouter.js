import { Router } from 'express';
import { register, login } from './../controllers/authController.js';
import { checkSignUpSchema } from './../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post("/signup", checkSignUpSchema, register);
authRouter.post("/signin", login);

export default authRouter;

