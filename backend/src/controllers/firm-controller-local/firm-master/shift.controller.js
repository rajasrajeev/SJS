const { 
    getShift,
    createShift,
    updateShift,
    deleteShift,
} = require('../../../services/firm-service-local/firm-master/shift.service');

const getShiftController = async(req, res, next) => {
    try {
        const data = await getShift(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createShiftController = async(req, res, next) => {
    try {
        const data = await createShift(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateShiftController = async(req, res, next) => {
    try {
        const data = await updateShift(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteShiftController = async(req, res, next) => {
    try {
        const data = await deleteShift(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getShiftController,
    createShiftController,
    updateShiftController,
    deleteShiftController
}