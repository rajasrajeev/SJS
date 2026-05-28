const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');
const {
    getOvertimeWagesMonthlyListHandler,
    getOvertimeWagesMonthlyDetailsHandler,
    createOvertimeWagesMonthlyHandler,
    updateOvertimeWagesMonthlyHandler,
    deleteOvertimeWagesMonthlyHandler
} = require('../../controllers/firm-controller-local/overtimewages.controller');

const router = express.Router();

module.exports = (app) => {
    router.get('/', userAuth, getOvertimeWagesMonthlyListHandler);
    router.get('/:id', userAuth, getOvertimeWagesMonthlyDetailsHandler);
    router.post('/', userAuth, createOvertimeWagesMonthlyHandler);
    router.patch('/:id', userAuth, updateOvertimeWagesMonthlyHandler);
    router.delete('/:id', userAuth, deleteOvertimeWagesMonthlyHandler);
    app.use('/api/v1/overtime-wages-monthly', router);
}; 