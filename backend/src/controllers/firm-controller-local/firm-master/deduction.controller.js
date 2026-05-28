const { 
    getDeduction,
    createDeduction,
    updateDeduction,
    deleteDeduction,
} = require('../../../services/firm-service-local/firm-master/deduction.service');


const getDeductionController = async(req, res, next) => {
    try {
        const data = await getDeduction(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createDeductionController = async(req, res, next) => {
    try {
        const data = await createDeduction(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateDeductionController = async(req, res, next) => {
    try {
        const data = await updateDeduction(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteDeductionController = async(req, res, next) => {
    try {
        const data = await deleteDeduction(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    getDeductionController,
    createDeductionController,
    updateDeductionController,
    deleteDeductionController,
}