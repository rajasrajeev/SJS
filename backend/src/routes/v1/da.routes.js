const express = require('express');
const {
    getDaMonthlyShopHandler,
    getDaMonthlyShopByIdHandler,
    createDaMonthlyShopHandler,
    updateDaMonthlyShopHandler,
    deleteDaMonthlyShopHandler,
    getDaMonthlyFabHandler,
    getDaMonthlyFabByIdHandler,
    createDaMonthlyFabHandler,
    updateDaMonthlyFabHandler,
    deleteDaMonthlyFabHandler,
    getDaMonthlyIdaHandler,
    getDaMonthlyIdaByIdHandler,
    createDaMonthlyIdaHandler,
    updateDaMonthlyIdaHandler,
    deleteDaMonthlyIdaHandler
} = require('../../controllers/da.controller');
const {
    monthQuerySchema,
    idParamSchema,
    daMonthlyShopSchema,
    daMonthlyFabSchema,
    daMonthlyIdaSchema,
    daMonthlyShopUpdateSchema,
    daMonthlyFabUpdateSchema,
    daMonthlyIdaUpdateSchema
} = require('../../schemas/da.schema');
const validate = require('../../middlewares/validate.middleware');

const router = express.Router();

module.exports = (app) => {
    // Shop DA routes
    router.get('/shop', validate(monthQuerySchema, 'query'), getDaMonthlyShopHandler);
    router.get('/shop/:id', validate(idParamSchema, 'params'), getDaMonthlyShopByIdHandler);
    router.post('/shop', validate(daMonthlyShopSchema), createDaMonthlyShopHandler);
    router.put('/shop/:id', validate(idParamSchema, 'params'), validate(daMonthlyShopUpdateSchema), updateDaMonthlyShopHandler);
    router.delete('/shop/:id', validate(idParamSchema, 'params'), deleteDaMonthlyShopHandler);

    // Fab DA routes
    router.get('/fab', validate(monthQuerySchema, 'query'), getDaMonthlyFabHandler);
    router.get('/fab/:id', validate(idParamSchema, 'params'), getDaMonthlyFabByIdHandler);
    router.post('/fab', validate(daMonthlyFabSchema), createDaMonthlyFabHandler);
    router.put('/fab/:id', validate(idParamSchema, 'params'), validate(daMonthlyFabUpdateSchema), updateDaMonthlyFabHandler);
    router.delete('/fab/:id', validate(idParamSchema, 'params'), deleteDaMonthlyFabHandler);

    // IDA routes
    router.get('/ida', validate(monthQuerySchema, 'query'), getDaMonthlyIdaHandler);
    router.get('/ida/:id', validate(idParamSchema, 'params'), getDaMonthlyIdaByIdHandler);
    router.post('/ida', validate(daMonthlyIdaSchema), createDaMonthlyIdaHandler);
    router.put('/ida/:id', validate(idParamSchema, 'params'), validate(daMonthlyIdaUpdateSchema), updateDaMonthlyIdaHandler);
    router.delete('/ida/:id', validate(idParamSchema, 'params'), deleteDaMonthlyIdaHandler);

    app.use('/api/v1/da', router);
};
