const Joi = require('joi');

const overtimeWagesMonthlySchema = Joi.object({
    id: Joi.number().integer().optional(),
    emp_id: Joi.number().integer().required(),
    overtime_id: Joi.number().integer().allow(null).optional(),
    designation_id: Joi.number().integer().required(),
    overtime_worked: Joi.number().integer().required(),
    amount: Joi.number().required(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
});

module.exports = {
    overtimeWagesMonthlySchema
}; 