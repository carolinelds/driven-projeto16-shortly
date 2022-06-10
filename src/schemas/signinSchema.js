import joi from 'joi';

const signinSchema = joi.object({
    email: joi.string().trim().required(),
    password: joi.string().required(),
});

export default signinSchema;