import joi from 'joi';

const signupSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

export default signupSchema;