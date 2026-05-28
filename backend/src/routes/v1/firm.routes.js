const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');
const { firmStaffValidation, branchValidation } = require('../../utils/validations.util');
const {
    createStaffHandler,
    getStaffListHandler,
    updateStaffHandler,
    deleteStaffHandler,
    getStaffDetailsHandler
} = require('../../controllers/firm-controller-local/ca_staff.controller');
const {
    createBranchHandler,
    getBranchListHandler,
    updateBranchHandler,
    deleteBranchHandler
} = require('../../controllers/firm-controller-local/branch.controller');
const {
    getFirmProfileController,
    updateFirmProfileController
} = require('../../controllers/firm-controller-local/profile.controller');
const { checkPermission }  = require('../../middlewares/permission.middleware');
const uploadFiles = require('../../middlewares/upload.middleware');
const router = express.Router();

const uploads = uploadFiles.fields([{name: 'logo', maxCount: 1}]);

module.exports = (app) => {
    // Routes (CRUD) for accountant staffs inside a firm
    router.post('/create-staff', userAuth, firmStaffValidation, createStaffHandler);
    router.get(
        '/staff-list', userAuth, 
        // checkPermission("getStaffListHandler"), 
        getStaffListHandler
    );
    router.get(
        '/staff/details/:id', userAuth, 
        // checkPermission("getStaffListHandler"), 
        getStaffDetailsHandler
    );
    router.patch('/update-staff/:id', userAuth, updateStaffHandler);
    router.delete('/delete-staff/:id', userAuth, deleteStaffHandler);

    // Firm Branched CRUD
    router.post('/create-branch', userAuth, createBranchHandler);
    router.get('/branch-list', userAuth, getBranchListHandler);
    router.patch('/update-branch/:id', userAuth, updateBranchHandler);
    router.delete('/delete-branch/:id', userAuth, deleteBranchHandler);

    // firm profile
    router.get('/profile', userAuth, getFirmProfileController);
    router.patch('/profile/:id', userAuth, uploads, updateFirmProfileController);

    app.use('/api/v1/firm', router);
}