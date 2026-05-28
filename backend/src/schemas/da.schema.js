const Joi = require('joi');

const daMonthlyShopSchema = Joi.object({
    shop_da_id: Joi.number().integer().required(),
    da_point: Joi.number().precision(2).required(),
    amount: Joi.number().precision(2).required(),
    month: Joi.date().required(),
    branch_id: Joi.optional()
});

const daMonthlyFabSchema = Joi.object({
    fab_da_id: Joi.number().integer().required(),
    da_point: Joi.number().precision(2).required(),
    amount: Joi.number().precision(2).required(),
    month: Joi.date().required(),
    branch_id: Joi.optional()
});

const daMonthlyIdaSchema = Joi.object({
    amount: Joi.number().precision(2).required(),
    month: Joi.date().required(),
    branch_id: Joi.optional()
});

const monthQuerySchema = Joi.object({
    month: Joi.string().pattern(/^\d{4}-\d{2}$/).optional()
});

const idParamSchema = Joi.object({
    id: Joi.number().integer().required()
});

const daMonthlyShopUpdateSchema = Joi.object({
    shop_da_id: Joi.number().integer().optional(),
    da_point: Joi.number().precision(2).optional(),
    amount: Joi.number().precision(2).optional(),
    month: Joi.date().optional(),
    branch_id: Joi.optional()
});

const daMonthlyFabUpdateSchema = Joi.object({
    fab_da_id: Joi.number().integer().optional(),
    da_point: Joi.number().precision(2).optional(),
    amount: Joi.number().precision(2).optional(),
    month: Joi.date().optional(),
    branch_id: Joi.optional()
});

const daMonthlyIdaUpdateSchema = Joi.object({
    amount: Joi.number().precision(2).optional(),
    month: Joi.date().optional(),
    branch_id: Joi.optional()
});

module.exports = {
    daMonthlyShopSchema,
    daMonthlyFabSchema,
    daMonthlyIdaSchema,
    monthQuerySchema,
    idParamSchema,
    daMonthlyShopUpdateSchema,
    daMonthlyFabUpdateSchema,
    daMonthlyIdaUpdateSchema
};
