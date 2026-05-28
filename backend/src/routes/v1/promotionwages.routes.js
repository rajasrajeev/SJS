const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');
const {
    getPromotionWagesListHandler,
    getPromotionWagesDetailsHandler,
    createPromotionWagesHandler,
    updatePromotionWagesHandler,
    deletePromotionWagesHandler
} = require('../../controllers/firm-controller-local/promotionwages.controller');

const router = express.Router();

module.exports = (app) => {
    router.get('/', userAuth, getPromotionWagesListHandler);
    router.get('/:id', userAuth, getPromotionWagesDetailsHandler);
    router.post('/', userAuth, createPromotionWagesHandler);
    router.patch('/:id', userAuth, updatePromotionWagesHandler);
    router.delete('/:id', userAuth, deletePromotionWagesHandler);
    app.use('/api/v1/promotion-wages', router);
}; 