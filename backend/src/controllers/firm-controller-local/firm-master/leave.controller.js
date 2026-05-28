const { 
    getLeave,
    createLeave,
    updateLeave,
    deleteLeave,
} = require('../../../services/firm-service-local/firm-master/leave.service');


const getLeaveController = async(req, res, next) => {
    try {
        const data = await getLeave();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createLeaveController = async(req, res, next) => {
    try {
        const data = await createLeave(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateLeaveController = async(req, res, next) => {
    try {
        const data = await updateLeave(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteLeaveController = async(req, res, next) => {
    try {
        const data = await deleteLeave(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    getLeaveController,
    createLeaveController,
    updateLeaveController,
    deleteLeaveController,
}