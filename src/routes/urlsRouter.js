import { Router } from 'express';
import { shorten, getShort } from './../controllers/urlsController.js';
import { checkToken, checkUrl, checkId } from './../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkUrl, checkToken, shorten);
urlsRouter.get("/urls/:id", checkId, getShort)

export default urlsRouter;

