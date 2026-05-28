const Joi = require('joi');

const deductionEmployeeMonthlyMasterSchema = Joi.object({
    id: Joi.number().integer().optional(),
    emp_id: Joi.number().integer().required(),
    deduction_amt: Joi.number().required(),
    installment_amt: Joi.number().optional().allow(null),
    interest_percentage: Joi.number().optional().allow(null),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
});

const deductionMonthlyMasterSchema = Joi.object({
    id: Joi.number().integer().optional(),
    deduction_id: Joi.number().integer().required(),
    branch_id: Joi.number().integer().allow(null).optional(),
    department_id: Joi.number().integer().allow(null).optional(),
    month: Joi.string().allow(null).optional(), // Accept string month
    year: Joi.string().allow(null).optional(), // Accept string month
    unwanted: Joi.boolean().default(false).optional(),
    unrecover: Joi.boolean().default(false).optional(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
    employees: Joi.array().items(deductionEmployeeMonthlyMasterSchema).optional(), // Changed key
});

module.exports = {
    deductionMonthlyMasterSchema,
    deductionEmployeeMonthlyMasterSchema
};
