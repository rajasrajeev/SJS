const { 
    getEsic,
    createEsic,
    updateEsic,
    deleteEsic,
} = require('../../../services/firm-service-local/firm-master/esic.service.js');


const createEsicController = async(req, res, next) => {
    try {
        const data = await createEsic(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const getEsicController = async(req, res, next) => {
    try {
        const data = await getEsic();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateEsicController = async(req, res, next) => {
    try {
        const data = await updateEsic(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteEsicController = async(req, res, next) => {
    try {
        const data = await deleteEsic(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    createEsicController,
    getEsicController,
    updateEsicController,
    deleteEsicController
}