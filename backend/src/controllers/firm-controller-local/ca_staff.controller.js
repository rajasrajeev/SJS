const { createStaff,
    accountantsList,
    updateStaff,
    deleteStaff,
    getStaffDetails
 } = require('../../services/firm-service-local/ca_staff.service');


const createStaffHandler = async(req, res, next) => {
    try {
        const data = await createStaff(req);
        return res.status(201).send({
            "message": "Staff created successfully, Please Note the username and password of the newly created staff",
            "data": data
        })
    } catch(err) {
        next(err);
    }
}


const getStaffListHandler = async(req, res, next) => {
    try {
        const data = await accountantsList(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}
const getStaffDetailsHandler = async(req, res, next) => {
    try {
        const data = await getStaffDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateStaffHandler = async(req, res, next) => {
    try {
        const data = await updateStaff(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteStaffHandler = async(req, res, next) => {
    try {
        const data = await deleteStaff(req.params.id, req.user);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    createStaffHandler,
    getStaffListHandler,
    updateStaffHandler,
    deleteStaffHandler,
    getStaffDetailsHandler
}