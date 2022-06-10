import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

export async function register(req, res){
    const user = req.body;
    const salt = 10;

    try {
        const hashPassword = bcrypt.hashSync(user.password, salt);

        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `;
        const values = [user.name, user.email, hashPassword];
        await db.query(query, values);
        
        res.sendStatus(201);

    } catch(e) {
        console.log(e);
		res.status(500).send("Ocorreu um erro ao cadastrar usuário.");
    }
}

export async function login(req, res){
    const user = req.body;

    try {
        const queryUserId = `
            SELECT id FROM users 
            WHERE email = $1
        `;
        const valuesUserId = [user.email];
        const userIdResult = await db.query(queryUserId, valuesUserId);
        const userId = userIdResult.rows[0].id;

        const token = uuid();

        const querySessions = `
            INSERT INTO sessions ("idUser", token)
            VALUES ($1, $2)
        `;
        const valuesSessions = [userId, token];
        await db.query(querySessions, valuesSessions);

        res.status(200).send(token);

    } catch(e) {
        console.log(e);
		res.status(500).send("Ocorreu um erro ao fazer login.");
    }
}

export async function getUserData(req,res){
    const { id } = req.params;

    try {
        const query= `
            SELECT users.name, SUM(urls."visitCount") as "visitCount" 
            FROM users
            JOIN urls ON urls."idUser" = users.id
            WHERE users.id = $1
            GROUP BY users.id
        `;
        const values = [id];
        const result = await db.query(query, values);
        console.log(result.rows);
        const userName = result.rows[0].name;
        const visitCount = result.rows[0].visitCount;

        const queryUrls = `
            SELECT urls.id, urls.short AS "shortUrl", urls.url, urls."visitCount"
            FROM urls
            WHERE urls."idUser" = $1
        `;
        const valuesUrls = [id];
        const urlsResult = await db.query(queryUrls, valuesUrls);
        const shortenedUrls = urlsResult.rows;

        const response = {
            id: id,
            name: userName,
            visitCount: visitCount,
            shortenedUrls
        };

        res.status(200).send(response);

    } catch(e) {
        console.log(e);
		res.status(500).send("Ocorreu um erro durante a execução do processo.");
    }
}