const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');

const { 
    createEmployeeHandler,
    getEmployeeListHandler,
    getEmployeeDetailsHandler,
    exportEmployeeExcelController,
    updateEmployeeHandler,
    deleteEmployeeHandler,
    employeeMiniHandler
} = require('../../controllers/firm-controller-local/employee.controller');

const router = express.Router();
const uploadFiles = require('../../middlewares/upload.middleware');
const uploads = uploadFiles.fields([{name: 'photo', maxCount: 1}]);

module.exports = (app) => {
    router.get('/mini', userAuth, employeeMiniHandler);
    router.get('/', userAuth,  getEmployeeListHandler);
    router.get('/:id', userAuth,  getEmployeeDetailsHandler);
    router.get('/export/excel', userAuth,  exportEmployeeExcelController);
    router.post('/', userAuth,  uploads, createEmployeeHandler);
    router.patch('/:id', userAuth, uploads, updateEmployeeHandler);
    router.delete('/:id', userAuth,  deleteEmployeeHandler);
    

    app.use('/api/v1/employee', router);
}