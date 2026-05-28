const { 
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} = require('../../../services/firm-service-local/firm-master/department.service');


const getDepartmentController = async(req, res, next) => {
    try {
        const data = await getDepartment(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const createDepartmentController = async(req, res, next) => {
    try {
        const data = await createDepartment(req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateDepartmentController = async(req, res, next) => {
    try {
        const data = await updateDepartment(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteDepartmentController = async(req, res, next) => {
    try {
        const data = await deleteDepartment(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    getDepartmentController,
    createDepartmentController,
    updateDepartmentController,
    deleteDepartmentController,
}