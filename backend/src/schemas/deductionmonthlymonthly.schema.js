const Joi = require('joi');

const deductionEmployeeMonthlyMonthlySchema = Joi.object({
    id: Joi.number().integer().optional(),
    emp_id: Joi.number().integer().required(),
    deduction_amt: Joi.number().required(),
    installment_amt: Joi.number().optional().allow(null),
    interest_percentage: Joi.number().optional().allow(null),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
});

const deductionMonthlyMonthlySchema = Joi.object({
    id: Joi.number().integer().optional(),
    deduction_id: Joi.number().integer().required(),
    branch_id: Joi.number().integer().allow(null).optional(),
    department_id: Joi.number().integer().allow(null).optional(),
    month: Joi.string().allow(null).optional(), // Accept string month
    year: Joi.string().allow(null).optional(), // Accept string month
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
    employees: Joi.array().items(deductionEmployeeMonthlyMonthlySchema).optional(),
});

module.exports = {
    deductionMonthlyMonthlySchema,
    deductionEmployeeMonthlyMonthlySchema
}; 