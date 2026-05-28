const { 
    getOvertime,
    createOvertime,
    updateOvertime,
    deleteOvertime,
} = require('../../../services/firm-service-local/firm-master/overtime.service');


const getOvertimeController = async(req, res, next) => {
    try {
        const data = await getOvertime();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createOvertimeController = async(req, res, next) => {
    try {
        const data = await createOvertime(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateOvertimeController = async(req, res, next) => {
    try {
        const data = await updateOvertime(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteOvertimeController = async(req, res, next) => {
    try {
        const data = await deleteOvertime(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    createOvertimeController,
    getOvertimeController,
    updateOvertimeController,
    deleteOvertimeController
}