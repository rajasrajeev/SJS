const Joi = require('joi');


const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    last_logged_in: Joi.date().optional(),
    permissions: Joi.array().items(Joi.number()).optional(),
    modules: Joi.array().items(Joi.number()).optional(),
    submodules: Joi.array().items(Joi.number()).optional(),
});

module.exports = userSchema;