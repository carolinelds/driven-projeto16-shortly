import db from "./../db.js";
import urlSchema from "./../schemas/urlSchema.js";

export async function checkToken(req,res,next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer","").trim();
    if(!token) return res.sendStatus(401);
    
    try {
        const queryToken = `
            SELECT * FROM sessions
            WHERE token = $1
        `;
        const valuesToken = [token];
        const checkExists = await db.query(queryToken, valuesToken);
        if (checkExists.rowCount === 0) {
            res.sendStatus(401);
            return;
        }

    } catch(e) {
        res.status(500).send("Erro inesperado na validação da sessão.");
        return;
    }
    
    next();
}

export function checkUrl(req,res,next){
    const url = req.body;

    const { error } = urlSchema.validate(url, { abortEarly: false });
    if (error){
        res.status(422).send(error.details.map(detail => detail.message));
        return;
    }

    next();
}

export async function checkId(req,res,next){
    const { id } = req.params;

    try {
        const queryId = `
            SELECT * FROM urls
            WHERE id = $1
        `;
        const valuesId = [id];
        const checkExists = await db.query(queryId, valuesId);
        if (checkExists.rowCount === 0) {
            res.sendStatus(404);
            return;
        }

    } catch (e) {
        res.status(500).send("Erro inesperado na validação do id.");
        return;
    }

    next();
}

export async function checkShortUrl(req,res,next){
    const { shortUrl } = req.params;

    try {
        const queryShortUrl = `
            SELECT * FROM urls
            WHERE short = $1
        `;
        const valuesShortUrl = [shortUrl];
        const checkExists = await db.query(queryShortUrl, valuesShortUrl);
        if (checkExists.rowCount === 0) {
            res.sendStatus(404);
            return;
        }
        
    } catch(e) {
        res.status(500).send("Erro inesperado na validação da url.");
        return;
    } 

    next();
}