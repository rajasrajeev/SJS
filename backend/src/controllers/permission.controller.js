const { getAllPermissions } = require('../services/permission.service');


const permissionsHandler = async(req, res, next) => {
    try {
        const data = await getAllPermissions(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    permissionsHandler
}