const {
    getNightAllowanceMonthly,
    getNightAllowanceMonthlyDetails,
    createNightAllowanceMonthly,
    updateNightAllowanceMonthly,
    deleteNightAllowanceMonthly
} = require('../../services/firm-service-local/nightallowance.service');

const getNightAllowanceMonthlyListHandler = async(req, res, next) => {
    try {
        const data = await getNightAllowanceMonthly(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const getNightAllowanceMonthlyDetailsHandler = async(req, res, next) => {
    try {
        const data = await getNightAllowanceMonthlyDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const createNightAllowanceMonthlyHandler = async(req, res, next) => {
    try {
        const data = await createNightAllowanceMonthly(req.body);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
};
const updateNightAllowanceMonthlyHandler = async(req, res, next) => {
    try {
        const data = await updateNightAllowanceMonthly(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const deleteNightAllowanceMonthlyHandler = async(req, res, next) => {
    try {
        const data = await deleteNightAllowanceMonthly(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getNightAllowanceMonthlyListHandler,
    getNightAllowanceMonthlyDetailsHandler,
    createNightAllowanceMonthlyHandler,
    updateNightAllowanceMonthlyHandler,
    deleteNightAllowanceMonthlyHandler
}; 