const {
    createDeductionMonthlyMaster,
    getDeductionMonthlyMaster,
    getDeductionMonthlyMasterDetails,
    exportDeductionMonthlyMasterExcel,
    updateDeductionMonthlyMaster,
    deleteDeductionMonthlyMaster,
    getDeductionMonthlyMasterMini,
    getDeductionMonthlyMonthly,
    getDeductionMonthlyMonthlyDetails,
    createDeductionMonthlyMonthly,
    updateDeductionMonthlyMonthly,
    deleteDeductionMonthlyMonthly,
    getDeductionMonthlyAdvance,
    getDeductionMonthlyAdvanceDetails,
    createDeductionMonthlyAdvance,
    updateDeductionMonthlyAdvance,
    deleteDeductionMonthlyAdvance,
    getPromotionWages,
    getPromotionWagesDetails,
    createPromotionWages,
    updatePromotionWages,
    deletePromotionWages,
    getNightAllowanceMonthly,
    getNightAllowanceMonthlyDetails,
    createNightAllowanceMonthly,
    updateNightAllowanceMonthly,
    deleteNightAllowanceMonthly,
    getOvertimeWagesMonthly,
    getOvertimeWagesMonthlyDetails,
    createOvertimeWagesMonthly,
    updateOvertimeWagesMonthly,
    deleteOvertimeWagesMonthly
} = require('../../services/firm-service-local/deduction.service');

const getDeductionListHandler = async(req, res, next) => {
    try {
        const data = await getDeductionMonthlyMaster(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const getDeductionDetailsHandler = async(req, res, next) => {
    try {
        const data = await getDeductionMonthlyMasterDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const exportDeductionExcelController = async(req, res, next) => {
    try {
        const data = await exportDeductionMonthlyMasterExcel();
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const createDeductionHandler = async(req, res, next) => {
    try {
        const data = await createDeductionMonthlyMaster(req.body, req.files, req.query);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
}

const updateDeductionHandler = async(req, res, next) => {
    try {
        const data = await updateDeductionMonthlyMaster(req.params.id, req.body, req.files);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const deleteDeductionHandler = async(req, res, next) => {
    try {
        const data = await deleteDeductionMonthlyMaster(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
}

const deductionMiniHandler = async(req, res, next) => {
    try {
        const data = await getDeductionMonthlyMasterMini(req);
        return res.status(200).send(data);
    } catch (err) {
        next(err);
    }
}

const getDeductionMonthlyMonthlyListHandler = async(req, res, next) => {
    try {
        const data = await getDeductionMonthlyMonthly(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

const getDeductionMonthlyMonthlyDetailsHandler = async(req, res, next) => {
    try {
        const data = await getDeductionMonthlyMonthlyDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

const createDeductionMonthlyMonthlyHandler = async(req, res, next) => {
    try {
        const data = await createDeductionMonthlyMonthly(req.body);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
};

const updateDeductionMonthlyMonthlyHandler = async(req, res, next) => {
    try {
        const data = await updateDeductionMonthlyMonthly(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

const deleteDeductionMonthlyMonthlyHandler = async(req, res, next) => {
    try {
        const data = await deleteDeductionMonthlyMonthly(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

// DeductionMonthlyAdvance
const getDeductionMonthlyAdvanceListHandler = async(req, res, next) => {
    try {
        const data = await getDeductionMonthlyAdvance(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const getDeductionMonthlyAdvanceDetailsHandler = async(req, res, next) => {
    try {
        const data = await getDeductionMonthlyAdvanceDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const createDeductionMonthlyAdvanceHandler = async(req, res, next) => {
    try {
        const data = await createDeductionMonthlyAdvance(req.body);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
};
const updateDeductionMonthlyAdvanceHandler = async(req, res, next) => {
    try {
        const data = await updateDeductionMonthlyAdvance(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const deleteDeductionMonthlyAdvanceHandler = async(req, res, next) => {
    try {
        const data = await deleteDeductionMonthlyAdvance(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
// PromotionWages
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
// NightAllowanceMonthly
const getNightAllowanceMonthlyListHandler = async(req, res, next) => {
    try {
        const data = await getNightAllowanceMonthly(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const getNightAllowanceMonthlyDetailsHandler = async(req, res, next) => {
    try {
        const data = await getNightAllowanceMonthlyDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const createNightAllowanceMonthlyHandler = async(req, res, next) => {
    try {
        const data = await createNightAllowanceMonthly(req.body);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
};
const updateNightAllowanceMonthlyHandler = async(req, res, next) => {
    try {
        const data = await updateNightAllowanceMonthly(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const deleteNightAllowanceMonthlyHandler = async(req, res, next) => {
    try {
        const data = await deleteNightAllowanceMonthly(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
// OvertimeWagesMonthly
const getOvertimeWagesMonthlyListHandler = async(req, res, next) => {
    try {
        const data = await getOvertimeWagesMonthly(req.query);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const getOvertimeWagesMonthlyDetailsHandler = async(req, res, next) => {
    try {
        const data = await getOvertimeWagesMonthlyDetails(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const createOvertimeWagesMonthlyHandler = async(req, res, next) => {
    try {
        const data = await createOvertimeWagesMonthly(req.body);
        return res.status(201).send(data);
    } catch(err) {
        next(err);
    }
};
const updateOvertimeWagesMonthlyHandler = async(req, res, next) => {
    try {
        const data = await updateOvertimeWagesMonthly(req.params.id, req.body);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};
const deleteOvertimeWagesMonthlyHandler = async(req, res, next) => {
    try {
        const data = await deleteOvertimeWagesMonthly(req.params.id);
        return res.status(200).send(data);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    createDeductionHandler,
    getDeductionListHandler,
    updateDeductionHandler,
    deleteDeductionHandler,
    getDeductionDetailsHandler,
    exportDeductionExcelController,
    deductionMiniHandler,
    getDeductionMonthlyMonthlyListHandler,
    getDeductionMonthlyMonthlyDetailsHandler,
    createDeductionMonthlyMonthlyHandler,
    updateDeductionMonthlyMonthlyHandler,
    deleteDeductionMonthlyMonthlyHandler,
    getDeductionMonthlyAdvanceListHandler,
    getDeductionMonthlyAdvanceDetailsHandler,
    createDeductionMonthlyAdvanceHandler,
    updateDeductionMonthlyAdvanceHandler,
    deleteDeductionMonthlyAdvanceHandler,
    getPromotionWagesListHandler,
    getPromotionWagesDetailsHandler,
    createPromotionWagesHandler,
    updatePromotionWagesHandler,
    deletePromotionWagesHandler,
    getNightAllowanceMonthlyListHandler,
    getNightAllowanceMonthlyDetailsHandler,
    createNightAllowanceMonthlyHandler,
    updateNightAllowanceMonthlyHandler,
    deleteNightAllowanceMonthlyHandler,
    getOvertimeWagesMonthlyListHandler,
    getOvertimeWagesMonthlyDetailsHandler,
    createOvertimeWagesMonthlyHandler,
    updateOvertimeWagesMonthlyHandler,
    deleteOvertimeWagesMonthlyHandler
}
