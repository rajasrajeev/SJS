const { 
    createBranch, 
    branchList, 
    updateBranch, 
    deleteBranch 
} = require('../../services/firm-service-local/branch.service');


const createBranchHandler = async(req, res, next) => {
    try {
        const data = await createBranch(req);
        return res.status(201).send({
            "message": "Branch created successfully",
            "data": data
        });
    } catch(err) {
        next(err);
    }
}


const getBranchListHandler = async(req, res, next) => {
    try {
        const data = await branchList(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const updateBranchHandler = async(req, res, next) => {
    try {
        const data = await updateBranch(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}


const deleteBranchHandler = async(req, res, next) => {
    try {
        const data = await deleteBranch(req.params.id);
        return res.status(204).send({
            "message": "Branch deleted successfully",
            "data": data
        });
    } catch(err) {
        next(err);
    }
}


module.exports = {
    createBranchHandler,
    getBranchListHandler,
    updateBranchHandler,
    deleteBranchHandler
}