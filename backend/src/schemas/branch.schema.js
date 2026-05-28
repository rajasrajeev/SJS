const Joi = require('joi');

const branchSchema = Joi.object({
    name: Joi.string().required(),      
    address: Joi.string().required(),      
    contact_no: Joi.string().required(),      
    email_id: Joi.string().required(),      
    country: Joi.number().required(),      
    state: Joi.number().required(),    
    district: Joi.number().required()
});

module.exports = branchSchema;