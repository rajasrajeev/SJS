const { 
    getFabMaster,
    createFabMaster,
    updateFabMaster,
    deleteFabMaster,
} = require('../../../services/firm-service-local/firm-master/fab_da_master.service');


const getFabDaController = async(req, res, next) => {
    try {
        const data = await getFabMaster();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createFabDaController = async(req, res, next) => {
    try {
        const data = await createFabMaster(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateFabDaController = async(req, res, next) => {
    try {
        const data = await updateFabMaster(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteFabDaController = async(req, res, next) => {
    try {
        const data = await deleteFabMaster(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    createFabDaController,
    getFabDaController,
    updateFabDaController,
    deleteFabDaController
}