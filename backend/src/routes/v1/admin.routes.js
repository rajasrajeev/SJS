const express = require('express');
/* const {
    forgotPasswordHanlder,
} = require('../../controllers/auth.controller'); */
const checkPermission  = require('../../middlewares/auth.middleware');

const router = express.Router();

module.exports = (app) => {
    // router.get('/testRoute', checkPermission("forgotPasswordHanlder"), forgotPasswordHanlder);
    app.use('/api/v1/admin', router);
}