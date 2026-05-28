const { 
    getNight,
    createNight,
    updateNight,
    deleteNight,
} = require('../../../services/firm-service-local/firm-master/night.service');


const getNightController = async(req, res, next) => {
    try {
        const data = await getNight();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createNightController = async(req, res, next) => {
    try {
        const data = await createNight(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateNightController = async(req, res, next) => {
    try {
        const data = await updateNight(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteNightController = async(req, res, next) => {
    try {
        const data = await deleteNight(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    createNightController,
    getNightController,
    updateNightController,
    deleteNightController
}