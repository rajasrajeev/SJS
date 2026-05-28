const { 
    getPf,
    createPf,
    updatePf,
    deletePf,
} = require('../../../services/firm-service-local/firm-master/pf.service.js');


const createPfController = async(req, res, next) => {
    try {
        const data = await createPf(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const getPfController = async(req, res, next) => {
    try {
        const data = await getPf();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updatePfController = async(req, res, next) => {
    try {
        const data = await updatePf(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deletePfController = async(req, res, next) => {
    try {
        const data = await deletePf(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    createPfController,
    getPfController,
    updatePfController,
    deletePfController
}