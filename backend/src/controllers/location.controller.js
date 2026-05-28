const {
    createCountry,
    getCountries,
    updateCountry,
    deleteCountry,
    createState,
    getStates,
    updateState,
    deleteState,
    createDistrict,
    getDistricts,
    updateDistrict,
    deleteDistrict
} = require('../services/location.service');


const createCountryHandler = async(req, res, next) => {
    try {
        const data = await createCountry(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const getCountryHandler = async(req, res, next) => {
    try {
        const data = await getCountries(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateCountryHandler = async(req, res, next) => {
    try {
        const data = await updateCountry(req.params.id, req.body.name, req.body.code);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteCountryHandler = async(req, res, next) => {
    try {
        const data = await deleteCountry(req.params.id);
        return res.status(200).send({id: req.params.id});
    } catch(err) {
        next(err);
    }
}


const createStateHandler = async(req, res, next) => {
    try {
        const data = await createState(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const getStateHandler = async(req, res, next) => {
    try {
        const data = await getStates(req.params.country_id, req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateStateHandler = async(req, res, next) => {
    try {
        const data = await updateState(req.params.id, {country_id: req.body.id, name: req.body.name});
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteStateHandler = async(req, res, next) => {
    try {
        const data = await deleteState(req.params.id);
        return res.status(200).send({id: req.params.id});
    } catch(err) {
        next(err);
    }
}


const createDistrictHandler = async(req, res, next) => {
    try {
        const data = await createDistrict(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const getDistrictHandler = async(req, res, next) => {
    try {
        const data = await getDistricts(req.params.state_id, req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateDistrictHandler = async(req, res, next) => {
    try {
        const data = await updateDistrict(req.params.id, {state_id: req.body.id, name: req.body.name});
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteDistrictHandler = async(req, res, next) => {
    try {
        const data = await deleteDistrict(req.params.id);
        return res.status(200).send({id: req.params.id});
    } catch(err) {
        next(err);
    }
}


module.exports = {
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
}