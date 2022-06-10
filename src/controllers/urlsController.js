import db from "./../db.js";
import { nanoid } from "nanoid";

export async function shorten(req,res){
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer","").trim();

    const shortUrl = nanoid();

    try {
        const queryUserId = `
            SELECT "idUser" FROM sessions
            WHERE token = $1
        `;
        const valuesUserId = [token];
        const userIdResult = await db.query(queryUserId,valuesUserId);
        const userId = userIdResult.rows[0].idUser;

        const queryShorten = `
            INSERT INTO urls (url, short, "idUser")
            VALUES ($1, $2, $3)
        `;
        const valuesShorten = [url, shortUrl, userId];
        await db.query(queryShorten, valuesShorten);

        const response = {
            shortUrl: shortUrl
        };

        res.status(201).send(response);

    } catch(e) {
        console.log(e);
		res.status(500).send("Ocorreu um erro durante a execução do serviço.");
    }

}

export async function getShort(req,res){
    const { id } = req.params;

    try {
        const queryUrl = `
            SELECT id, urls.short as "shortUrl", urls.url 
            FROM urls
            WHERE id = $1
        `;
        const valuesUrl = [id];

        const urlQuery = await db.query(queryUrl,valuesUrl);
        const urlResult = urlQuery.rows[0];

        const response = {
            id: id,
            shortUrl: urlResult.shortUrl,
            url: urlResult.url
        };

        res.status(200).send(response);
        
    } catch(e) {
        console.log(e);
		res.status(500).send("Ocorreu um erro durante a busca por esse id.");
    }
}

export async function redirect(req,res){
    const { shortUrl } = req.params;

    try {
        const queryUrl = `
            SELECT urls.id, urls.url, urls."visitCount"
            FROM urls
            WHERE short = $1
        `;
        const valuesUrl = [shortUrl];
        const urlQuery = await db.query(queryUrl, valuesUrl);
        const idUrl = urlQuery.rows[0].id;
        const originalUrl = urlQuery.rows[0].url;
        const newNumberVisits = urlQuery.rows[0].visitCount + 1;

        const queryVisits = `
            UPDATE urls
            SET "visitCount" = $1
            WHERE id = $2
        `;
        const valuesVisits = [newNumberVisits, idUrl];
        await db.query(queryVisits, valuesVisits);

        res.redirect(originalUrl);

    } catch(e) {
        console.log(e);
		res.status(500).send("Ocorreu um erro durante a execução do processo.");
    }

}