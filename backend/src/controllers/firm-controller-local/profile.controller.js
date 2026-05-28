const { 
    getProfile,
    updateProfile
 } = require('../../services/firm-service-local/profile.service');


const getFirmProfileController = async(req, res, next) => {
    try {
        const data = await getProfile(req.user.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const updateFirmProfileController = async(req, res, next) => {
    try {
        const data = await updateProfile(req.params.id, req.body, req.files);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    getFirmProfileController,
    updateFirmProfileController
}