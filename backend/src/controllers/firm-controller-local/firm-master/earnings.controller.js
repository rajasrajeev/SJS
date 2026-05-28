const { 
    getEarnings,
    createEarnings,
    updateEarnings,
    deleteEarnings,
} = require('../../../services/firm-service-local/firm-master/earnings.service');


const getEarningsController = async(req, res, next) => {
    try {
        const data = await getEarnings(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createEarningsController = async(req, res, next) => {
    try {
        const data = await createEarnings(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateEarningsController = async(req, res, next) => {
    try {
        const data = await updateEarnings(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteEarningsController = async(req, res, next) => {
    try {
        const data = await deleteEarnings(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    getEarningsController,
    createEarningsController,
    updateEarningsController,
    deleteEarningsController,
}