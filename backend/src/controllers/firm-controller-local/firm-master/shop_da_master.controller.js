const { 
    getShopDaMaster,
    createShopDaMaster,
    updateShopDaMaster,
    deleteShopDaMaster,
} = require('../../../services/firm-service-local/firm-master/shop_da_master.service');


const getShopDaMasterController = async(req, res, next) => {
    try {
        const data = await getShopDaMaster(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createShopDaMasterController = async(req, res, next) => {
    try {
        const data = await createShopDaMaster(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateShopDaMasterController = async(req, res, next) => {
    try {
        const data = await updateShopDaMaster(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteShopDaMasterController = async(req, res, next) => {
    try {
        const data = await deleteShopDaMaster(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    createShopDaMasterController,
    getShopDaMasterController,
    updateShopDaMasterController,
    deleteShopDaMasterController
}