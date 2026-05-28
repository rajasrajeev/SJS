const Joi = require('joi');

const deductionEmployeeMonthlyAdvanceSchema = Joi.object({
    id: Joi.number().integer().optional(),
    emp_id: Joi.number().integer().required(),
    deduction_amt: Joi.number().required(),
    installment_amt: Joi.number().optional().allow(null),
    interest_percentage: Joi.number().optional().allow(null),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
});

const deductionMonthlyAdvanceSchema = Joi.object({
    id: Joi.number().integer().optional(),
    deduction_id: Joi.number().integer().required(),
    branch_id: Joi.number().integer().allow(null).optional(),
    department_id: Joi.number().integer().allow(null).optional(),
    month: Joi.string().allow(null).optional(), // Accept string month
    year: Joi.string().allow(null).optional(), // Accept string month
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
    employees: Joi.array().items(deductionEmployeeMonthlyAdvanceSchema).optional(),
});

module.exports = {
    deductionMonthlyAdvanceSchema,
    deductionEmployeeMonthlyAdvanceSchema
}; 