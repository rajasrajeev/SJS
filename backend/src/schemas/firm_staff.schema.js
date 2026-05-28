const Joi = require('joi');
const userSchema = require('./user.schema');

const firmStaffSchema = Joi.object({
    name: Joi.string().required(),      
    mobile: Joi.string().required(),    
    user: userSchema.required(), 
    branches: Joi.array().items(Joi.number()).optional(),
});

module.exports = firmStaffSchema;