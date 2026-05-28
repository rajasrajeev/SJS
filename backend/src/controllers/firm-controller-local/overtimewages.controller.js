const {
    getOvertimeWagesMonthly,
    getOvertimeWagesMonthlyDetails,
    createOvertimeWagesMonthly,
    updateOvertimeWagesMonthly,
    deleteOvertimeWagesMonthly
} = require('../../services/firm-service-local/overtimewages.service');

const getOvertimeWagesMonthlyListHandler = async(req, res, next) => {
    try {
        const data = await getOvertimeWagesMonthly(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const getOvertimeWagesMonthlyDetailsHandler = async(req, res, next) => {
    try {
        const data = await getOvertimeWagesMonthlyDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const createOvertimeWagesMonthlyHandler = async(req, res, next) => {
    try {
        const data = await createOvertimeWagesMonthly(req.body);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
};
const updateOvertimeWagesMonthlyHandler = async(req, res, next) => {
    try {
        const data = await updateOvertimeWagesMonthly(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const deleteOvertimeWagesMonthlyHandler = async(req, res, next) => {
    try {
        const data = await deleteOvertimeWagesMonthly(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getOvertimeWagesMonthlyListHandler,
    getOvertimeWagesMonthlyDetailsHandler,
    createOvertimeWagesMonthlyHandler,
    updateOvertimeWagesMonthlyHandler,
    deleteOvertimeWagesMonthlyHandler
}; 