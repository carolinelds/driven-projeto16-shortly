import { Router } from 'express';
import { shorten, getShort, redirect } from './../controllers/urlsController.js';
import { 
    checkToken, 
    checkUrl, 
    checkId, 
    checkShortUrl 
} from './../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkUrl, checkToken, shorten);
urlsRouter.get("/urls/:id", checkId, getShort)
urlsRouter.get("/urls/open/:shortUrl", checkShortUrl, redirect);

export default urlsRouter;

