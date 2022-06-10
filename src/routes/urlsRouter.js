import { Router } from 'express';
import { shorten, getShort, redirect, deleteUrl } from './../controllers/urlsController.js';
import { 
    checkToken, 
    checkUrl, 
    checkId, 
    checkShortUrl,
    checkOwner 
} from './../middlewares/urlsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", checkUrl, checkToken, shorten);
urlsRouter.get("/urls/:id", checkId, getShort)
urlsRouter.get("/urls/open/:shortUrl", checkShortUrl, redirect);
urlsRouter.delete("/urls/:id", checkId, checkToken, checkOwner, deleteUrl)
export default urlsRouter;

