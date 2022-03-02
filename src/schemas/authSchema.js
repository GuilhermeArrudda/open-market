import joi from 'joi';

const singUpSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required()
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required()
});

export {
    singUpSchema,
    loginSchema
};