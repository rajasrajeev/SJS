const express = require('express');
const { 
    loginHandler,
    forgotPasswordHanlder,
    verifyOtpHandler,
    resetPasswordHandler,
    changePasswordHandler,
    menuWithPermissionHandler
} = require('../../controllers/auth.controller');
const { loginValidation } = require('../../utils/validations.util');
const { userAuth } = require('../../middlewares/auth.middleware');

const router = express.Router();

module.exports = (app) => {
    router.post('/login', loginValidation, loginHandler);
    router.post('/forgot-password', forgotPasswordHanlder);
    router.post('/verify-otp', verifyOtpHandler);
    router.post('/reset-password', resetPasswordHandler);
    router.post('/change-password', userAuth, changePasswordHandler);
    router.get('/menu-with-permission', userAuth, menuWithPermissionHandler);
    app.use('/api/v1/auth', router);
}