//import db from "./../db.js";
import signupSchema from "./../schemas/signupSchema.js";

export async function checkSignUpSchema(req,res,next){
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