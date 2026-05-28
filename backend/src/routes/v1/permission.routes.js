const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');

const {permissionsHandler} = require('../../controllers/permission.controller');

const router = express.Router();

module.exports = (app) => {
    router.get('/all', userAuth,  permissionsHandler);

    app.use('/api/v1/permissions', router);
}