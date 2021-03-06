import { Router } from 'express';
import { register, login, getUserData, getRanking } from '../controllers/usersController.js';
import { 
    checkSignUpSchema,
    checkSignInSchema,
    checkUserExists,
    checkUserPassword,
    checkUserIdExists,
    checkUserHasUrls
 } from '../middlewares/usersMiddleware.js';
 import { checkToken } from './../middlewares/urlsMiddleware.js';

const usersRouter = Router();

usersRouter.post("/signup", checkSignUpSchema, register);
usersRouter.post("/signin", checkSignInSchema, checkUserExists, checkUserPassword, login);
usersRouter.get("/users/:id", checkUserIdExists, checkUserHasUrls, checkToken, getUserData);
usersRouter.get("/ranking", getRanking)

export default usersRouter;

