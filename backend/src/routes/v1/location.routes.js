const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');

const {
    createCountryHandler,
    getCountryHandler,
    updateCountryHandler,
    deleteCountryHandler,

    createStateHandler,
    getStateHandler,
    updateStateHandler,
    deleteStateHandler,

    createDistrictHandler,
    getDistrictHandler,
    updateDistrictHandler,
    deleteDistrictHandler
} = require('../../controllers/location.controller');

const router = express.Router();

module.exports = (app) => {
    router.post('/country', userAuth,  createCountryHandler);
    router.get('/country', userAuth, getCountryHandler);
    router.put('/country/:id', userAuth, updateCountryHandler);
    router.delete('/country/:id', userAuth, deleteCountryHandler);

    router.post('/state', userAuth,  createStateHandler);
    router.get('/state/:country_id', userAuth, getStateHandler);
    router.put('/state/:id', userAuth, updateStateHandler);
    router.delete('/state/:id', userAuth, deleteStateHandler);

    router.post('/district', userAuth,  createDistrictHandler);
    router.get('/district/:state_id', userAuth, getDistrictHandler);
    router.put('/district/:id', userAuth, updateDistrictHandler);
    router.delete('/district/:id', userAuth, deleteDistrictHandler);

    app.use('/api/v1/location', router);
}