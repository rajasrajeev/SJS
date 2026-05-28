const {
    getPromotionWages,
    getPromotionWagesDetails,
    createPromotionWages,
    updatePromotionWages,
    deletePromotionWages
} = require('../../services/firm-service-local/promotionwages.service');

const getPromotionWagesListHandler = async(req, res, next) => {
    try {
        const data = await getPromotionWages(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const getPromotionWagesDetailsHandler = async(req, res, next) => {
    try {
        const data = await getPromotionWagesDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const createPromotionWagesHandler = async(req, res, next) => {
    try {
        const data = await createPromotionWages(req.body);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
};
const updatePromotionWagesHandler = async(req, res, next) => {
    try {
        const data = await updatePromotionWages(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const deletePromotionWagesHandler = async(req, res, next) => {
    try {
        const data = await deletePromotionWages(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getPromotionWagesListHandler,
    getPromotionWagesDetailsHandler,
    createPromotionWagesHandler,
    updatePromotionWagesHandler,
    deletePromotionWagesHandler
}; 