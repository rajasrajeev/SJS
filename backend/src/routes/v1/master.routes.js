const express = require('express');
const { 
    createDepartmentController, 
    getDepartmentController, 
    updateDepartmentController, 
    deleteDepartmentController 
} = require('../../controllers/firm-controller-local/firm-master/department.controller');

const { 
    getDesignationController,
    createDesignationController,
    updateDesignationController,
    deleteDesignationController
} = require('../../controllers/firm-controller-local/firm-master/designation.controller');

const { 
    getDeductionController,
    createDeductionController,
    updateDeductionController,
    deleteDeductionController
} = require('../../controllers/firm-controller-local/firm-master/deduction.controller');

const { 
    getEarningsController,
    createEarningsController,
    updateEarningsController,
    deleteEarningsController
} = require('../../controllers/firm-controller-local/firm-master/earnings.controller');

const {
    getShiftController,
    createShiftController,
    updateShiftController,
    deleteShiftController
} = require('../../controllers/firm-controller-local/firm-master/shift.controller');

const {
    getLeaveController,
    createLeaveController,
    updateLeaveController,
    deleteLeaveController
} = require('../../controllers/firm-controller-local/firm-master/leave.controller');

const {
    createShopDaMasterController,
    getShopDaMasterController,
    updateShopDaMasterController,
    deleteShopDaMasterController
} = require('../../controllers/firm-controller-local/firm-master/shop_da_master.controller');

const {
    createFabDaController,
    getFabDaController,
    updateFabDaController,
    deleteFabDaController
} = require('../../controllers/firm-controller-local/firm-master/fab_da_master.controller');

const {
    createNightController,
    getNightController,
    updateNightController,
    deleteNightController
} = require('../../controllers/firm-controller-local/firm-master/night.controller');


const {
    createOvertimeController,
    getOvertimeController,
    updateOvertimeController,
    deleteOvertimeController
} = require('../../controllers/firm-controller-local/firm-master/overtime.controller');

const {
    createPfController,
    getPfController,
    updatePfController,
    deletePfController
} = require('../../controllers/firm-controller-local/firm-master/pf.controller.js');

const {
    createEsicController,
    getEsicController,
    updateEsicController,
    deleteEsicController
} = require('../../controllers/firm-controller-local/firm-master/esic.controller.js');

const { userAuth } = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/auth.middleware');

const router = express.Router();

module.exports = (app) => {
    router.post('/department', userAuth, createDepartmentController);
    router.get('/department', userAuth, getDepartmentController);
    router.put('/department/:id', userAuth, updateDepartmentController);
    router.delete('/department/:id', userAuth, deleteDepartmentController);

    router.post('/designation', userAuth, createDesignationController);
    router.get('/designation', userAuth, getDesignationController);
    router.put('/designation/:id', userAuth, updateDesignationController);
    router.delete('/designation/:id', userAuth, deleteDesignationController);

    router.post('/deduction', userAuth, createDeductionController);
    router.get('/deduction', userAuth, getDeductionController);
    router.put('/deduction/:id', userAuth, updateDeductionController);
    router.delete('/deduction/:id', userAuth, deleteDeductionController);

    router.post('/shift', userAuth, createShiftController);
    router.get('/shift', userAuth, getShiftController);
    router.put('/shift/:id', userAuth, updateShiftController);
    router.delete('/shift/:id', userAuth, deleteShiftController);

    router.post('/leave', userAuth, createLeaveController);
    router.get('/leave', userAuth, getLeaveController);
    router.put('/leave/:id', userAuth, updateLeaveController);
    router.delete('/leave/:id', userAuth, deleteLeaveController);

    router.post('/earnings', userAuth, createEarningsController);
    router.get('/earnings', userAuth, getEarningsController);
    router.patch('/earnings/:id', userAuth, updateEarningsController);
    router.delete('/earnings/:id', userAuth, deleteEarningsController);

    router.post('/shop_da', userAuth, createShopDaMasterController);
    router.get('/shop_da', userAuth, getShopDaMasterController);
    router.patch('/shop_da/:id', userAuth, updateShopDaMasterController);
    router.delete('/shop_da/:id', userAuth, deleteShopDaMasterController);

    router.post('/fab_da', userAuth, createFabDaController);
    router.get('/fab_da', userAuth, getFabDaController);
    router.patch('/fab_da/:id', userAuth, updateFabDaController);
    router.delete('/fab_da/:id', userAuth, deleteFabDaController);

    router.post('/night', userAuth, createNightController);
    router.get('/night', userAuth, getNightController);
    router.patch('/night/:id', userAuth, updateNightController);
    router.delete('/night/:id', userAuth, deleteNightController);

    router.post('/overtime', userAuth, createOvertimeController);
    router.get('/overtime', userAuth, getOvertimeController);
    router.patch('/overtime/:id', userAuth, updateOvertimeController);
    router.delete('/overtime/:id', userAuth, deleteOvertimeController);

    router.post('/pf', userAuth, createPfController);
    router.get('/pf', userAuth, getPfController);
    router.patch('/pf/:id', userAuth, updatePfController);
    router.delete('/pf/:id', userAuth, deletePfController);

    router.post('/esic', userAuth, createEsicController);
    router.get('/esic', userAuth, getEsicController);
    router.patch('/esic/:id', userAuth, updateEsicController);
    router.delete('/esic/:id', userAuth, deleteEsicController);

    app.use('/api/v1/master', router);
}