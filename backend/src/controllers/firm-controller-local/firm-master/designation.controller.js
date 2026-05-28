const { 
    getDesignation,
    createDesignation,
    updateDesignation,
    deleteDesignation
} = require('../../../services/firm-service-local/firm-master/designation.service');



const getDesignationController = async(req, res, next) => {
    try {
        const data = await getDesignation(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createDesignationController = async(req, res, next) => {
    try {
        const data = await createDesignation(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateDesignationController = async(req, res, next) => {
    try {
        const data = await updateDesignation(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteDesignationController = async(req, res, next) => {
    try {
        const data = await deleteDesignation(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getDesignationController,
    createDesignationController,
    updateDesignationController,
    deleteDesignationController
}