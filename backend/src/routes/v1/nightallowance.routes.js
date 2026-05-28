const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');
const {
    getNightAllowanceMonthlyListHandler,
    getNightAllowanceMonthlyDetailsHandler,
    createNightAllowanceMonthlyHandler,
    updateNightAllowanceMonthlyHandler,
    deleteNightAllowanceMonthlyHandler
} = require('../../controllers/firm-controller-local/nightallowance.controller');

const router = express.Router();

module.exports = (app) => {
    router.get('/', userAuth, getNightAllowanceMonthlyListHandler);
    router.get('/:id', userAuth, getNightAllowanceMonthlyDetailsHandler);
    router.post('/', userAuth, createNightAllowanceMonthlyHandler);
    router.patch('/:id', userAuth, updateNightAllowanceMonthlyHandler);
    router.delete('/:id', userAuth, deleteNightAllowanceMonthlyHandler);
    app.use('/api/v1/night-allowance-monthly', router);
}; 