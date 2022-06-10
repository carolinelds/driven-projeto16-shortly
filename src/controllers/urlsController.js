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