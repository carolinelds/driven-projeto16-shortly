import db from "./../db.js";
import bcrypt from "bcrypt";
import signupSchema from "./../schemas/signupSchema.js";
import signinSchema from "./../schemas/signinSchema.js";

export function checkSignUpSchema(req,res,next){
    const user = req.body;
    try {
        const { error } = signupSchema.validate(user, { abortEarly: false });
        if (error){
            res.status(422).send(error.details.map(detail => detail.message));
            return;
        }
        if (user.password !== user.confirmPassword){
            res.status(422).send("As senhas inseridas não são idênticas.");
        }
    } catch(e) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export function checkSignInSchema(req,res,next){
    const user = req.body;

    try {
        const { error } = signinSchema.validate(user, { abortEarly: false });
        if (error) {
            res.status(422).send(error.details.map(detail => detail.message));
            return;
        }
    } catch(e) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }

    next();
}

export async function checkUserExists(req,res,next){
    const user = req.body;

    try {
        const query = `
            SELECT * FROM users
            WHERE email = $1
        `;
        const values = [user.email];
        const checkExists = await db.query(query, values);
        if (checkExists.rowCount === 0) {
            res.status(401).send("Usuário não encontrado ou senha incorreta.");
            return;
        }
    } catch(e) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export async function checkUserPassword(req,res,next){
    const user = req.body;
    
    try {
        const query = `
            SELECT password FROM users
            WHERE email = $1
        `;
        const values = [user.email];
        const passwordQuery = await db.query(query, values);
        const hashPassword = passwordQuery.rows[0].password;

        const validation = bcrypt.compareSync(user.password, hashPassword);
        if (!validation){
            res.status(401).send("Usuário não encontrado ou senha incorreta.");
            return;
        }

    } catch(e) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}