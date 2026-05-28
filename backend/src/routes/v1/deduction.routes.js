const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');

const {
    createDeductionHandler,
    getDeductionListHandler,
    getDeductionDetailsHandler,
    exportDeductionExcelController,
    updateDeductionHandler,
    deleteDeductionHandler,
    deductionMiniHandler,
    getDeductionMonthlyMonthlyListHandler,
    getDeductionMonthlyMonthlyDetailsHandler,
    createDeductionMonthlyMonthlyHandler,
    updateDeductionMonthlyMonthlyHandler,
    deleteDeductionMonthlyMonthlyHandler,
    getDeductionMonthlyAdvanceListHandler,
    getDeductionMonthlyAdvanceDetailsHandler,
    createDeductionMonthlyAdvanceHandler,
    updateDeductionMonthlyAdvanceHandler,
    deleteDeductionMonthlyAdvanceHandler,
    getPromotionWagesListHandler,
    getPromotionWagesDetailsHandler,
    createPromotionWagesHandler,
    updatePromotionWagesHandler,
    deletePromotionWagesHandler,
    getNightAllowanceMonthlyListHandler,
    getNightAllowanceMonthlyDetailsHandler,
    createNightAllowanceMonthlyHandler,
    updateNightAllowanceMonthlyHandler,
    deleteNightAllowanceMonthlyHandler,
    getOvertimeWagesMonthlyListHandler,
    getOvertimeWagesMonthlyDetailsHandler,
    createOvertimeWagesMonthlyHandler,
    updateOvertimeWagesMonthlyHandler,
    deleteOvertimeWagesMonthlyHandler
} = require('../../controllers/firm-controller-local/deduction.controller');

const router = express.Router();
const uploadFiles = require('../../middlewares/upload.middleware');
const uploads = uploadFiles.fields([{name: 'photo', maxCount: 1}]);

module.exports = (app) => {
    router.get('/mini', userAuth, deductionMiniHandler);
    router.get('/', userAuth,  getDeductionListHandler);
    router.get('/:id', userAuth,  getDeductionDetailsHandler);
    router.get('/export/excel', userAuth,  exportDeductionExcelController);
    router.post('/', userAuth,  uploads, createDeductionHandler);
    router.patch('/:id', userAuth, uploads, updateDeductionHandler);
    router.delete('/:id', userAuth,  deleteDeductionHandler);
    router.get('/monthly-monthly', userAuth, getDeductionMonthlyMonthlyListHandler);
    router.get('/monthly-monthly/:id', userAuth, getDeductionMonthlyMonthlyDetailsHandler);
    router.post('/monthly-monthly', userAuth, createDeductionMonthlyMonthlyHandler);
    router.patch('/monthly-monthly/:id', userAuth, updateDeductionMonthlyMonthlyHandler);
    router.delete('/monthly-monthly/:id', userAuth, deleteDeductionMonthlyMonthlyHandler);
    // DeductionMonthlyAdvance
    router.get('/monthly-advance', userAuth, getDeductionMonthlyAdvanceListHandler);
    router.get('/monthly-advance/:id', userAuth, getDeductionMonthlyAdvanceDetailsHandler);
    router.post('/monthly-advance', userAuth, createDeductionMonthlyAdvanceHandler);
    router.patch('/monthly-advance/:id', userAuth, updateDeductionMonthlyAdvanceHandler);
    router.delete('/monthly-advance/:id', userAuth, deleteDeductionMonthlyAdvanceHandler);
    // PromotionWages
    router.get('/promotion-wages', userAuth, getPromotionWagesListHandler);
    router.get('/promotion-wages/:id', userAuth, getPromotionWagesDetailsHandler);
    router.post('/promotion-wages', userAuth, createPromotionWagesHandler);
    router.patch('/promotion-wages/:id', userAuth, updatePromotionWagesHandler);
    router.delete('/promotion-wages/:id', userAuth, deletePromotionWagesHandler);
    // NightAllowanceMonthly
    router.get('/night-allowance-monthly', userAuth, getNightAllowanceMonthlyListHandler);
    router.get('/night-allowance-monthly/:id', userAuth, getNightAllowanceMonthlyDetailsHandler);
    router.post('/night-allowance-monthly', userAuth, createNightAllowanceMonthlyHandler);
    router.patch('/night-allowance-monthly/:id', userAuth, updateNightAllowanceMonthlyHandler);
    router.delete('/night-allowance-monthly/:id', userAuth, deleteNightAllowanceMonthlyHandler);
    // OvertimeWagesMonthly
    router.get('/overtime-wages-monthly', userAuth, getOvertimeWagesMonthlyListHandler);
    router.get('/overtime-wages-monthly/:id', userAuth, getOvertimeWagesMonthlyDetailsHandler);
    router.post('/overtime-wages-monthly', userAuth, createOvertimeWagesMonthlyHandler);
    router.patch('/overtime-wages-monthly/:id', userAuth, updateOvertimeWagesMonthlyHandler);
    router.delete('/overtime-wages-monthly/:id', userAuth, deleteOvertimeWagesMonthlyHandler);


    app.use('/api/v1/deduction', router);
}