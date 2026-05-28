const Joi = require('joi');

const promotionWagesSchema = Joi.object({
    id: Joi.number().integer().optional(),
    emp_id: Joi.number().integer().required(),
    designation_id: Joi.number().integer().required(),
    worked_designation_id: Joi.number().integer().required(),
    days_worked: Joi.number().integer().required(),
    amount: Joi.number().required(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
});

module.exports = {
    promotionWagesSchema
}; 