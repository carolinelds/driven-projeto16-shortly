import { Router } from 'express';
import { shorten } from './../controllers/urlsController.js';
import { checkToken, checkUrl } from './../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkUrl, checkToken, shorten);

export default urlsRouter;

