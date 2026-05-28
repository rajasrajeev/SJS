const {
    createEmployee,
    getEmployee,
    getEmployeeDetails,
    exportEmployeeExcel,
    updateEmployee,
    deleteEmployee,
    getEmployeeMini
 } = require('../../services/firm-service-local/employee.service');

const getEmployeeListHandler = async(req, res, next) => {
    try {
        const data = await getEmployee(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const getEmployeeDetailsHandler = async(req, res, next) => {
    try {
        const data = await getEmployeeDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const exportEmployeeExcelController = async(req, res, next) => {
    try {
        const data = await exportEmployeeExcel();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const createEmployeeHandler = async(req, res, next) => {
    try {
        const data = await createEmployee(req.body, req.files);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
}

const updateEmployeeHandler = async(req, res, next) => {
    try {
        const data = await updateEmployee(req.params.id, req.body, req.files);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteEmployeeHandler = async(req, res, next) => {
    try {
        const data = await deleteEmployee(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const employeeMiniHandler = async(req, res, next) => {
    try {
        const data = await getEmployeeMini(req);
        return res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createEmployeeHandler,
    getEmployeeListHandler,
    updateEmployeeHandler,
    deleteEmployeeHandler,
    getEmployeeDetailsHandler,
    exportEmployeeExcelController,
    employeeMiniHandler
}