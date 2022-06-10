import { Router } from 'express';
import { register, login } from './../controllers/authController.js';
import { 
    checkSignUpSchema,
    checkSignInSchema,
    checkUserExists,
    checkUserPassword
 } from './../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post("/signup", checkSignUpSchema, register);
authRouter.post("/signin", checkSignInSchema, checkUserExists, checkUserPassword, login);

export default authRouter;

