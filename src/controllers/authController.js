import db from "./../db.js";
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