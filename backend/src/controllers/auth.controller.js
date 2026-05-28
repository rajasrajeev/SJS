const { 
    login,
    forgotPassword, 
    verifyOtp,
    resetPassword,
    passwordChange,
    menuWithPermission
} = require('../services/auth.service');


/**
 * A handler to process hello response.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware next function for error handling.
 * @returns {Promise<Object>} response with token, username, primarycolor
 * @throws Will pass any error to the `next` middleware function.
 */
const loginHandler = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const data = await login(email, password);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


/**
 * A handler to process hello response.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware next function for error handling.
 * @service forgotPassword - Function to send an email with a reset password OTP.
 * @returns {Promise<Object>} response with success messsage
 * @throws Will pass any error to the `next` middleware function.
 */
const forgotPasswordHanlder = async(req, res, next) => {
    try {
        await forgotPassword(req.body.email);
        return res.status(200).send({ message : "An otp is send to provided email"});
    } catch(err) {
        next(err);
    }
}


/**
 * A handler to process hello response.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware next function for error handling.
 * @service verifyTop - Function to verify password reset otp.
 * @returns {Promise<Object>} response with user object
 * @throws Will pass any error to the `next` middleware function.
 */
const verifyOtpHandler = async(req, res, next) => {
    try {
        const data = await verifyOtp(req.body.email, req.body.otp);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


/**
 * A handler to process hello response.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware next function for error handling.
 * @service resetPassword - Function to set new password
 * @returns {Promise<Object>} response with success message
 * @throws Will pass any error to the `next` middleware function.
 */
const resetPasswordHandler = async(req, res, next) => {
    try {
        await resetPassword(req.body);
        return res.status(200).send({ message : "Password reset completed successfully"});
    } catch(err) {
        next(err);
    }
}


const changePasswordHandler = async(req, res, next) => {
    try {
        await passwordChange(req.user, req.body);
        return res.status(200).send({ message : "Password change successfully"});
    } catch(err) {
        next(err)
    }
}
const menuWithPermissionHandler = async(req, res, next) => {
    try {
        var data = await menuWithPermission(req.user);
        return res.status(200).send(data);
    } catch(err) {
        next(err)
    }
}

module.exports = {
    loginHandler,
    forgotPasswordHanlder,
    verifyOtpHandler,
    resetPasswordHandler,
    changePasswordHandler,
    menuWithPermissionHandler
}