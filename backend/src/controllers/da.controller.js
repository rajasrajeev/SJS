const {
    getDaMonthlyShop,
    getDaMonthlyShopById,
    createDaMonthlyShop,
    updateDaMonthlyShop,
    deleteDaMonthlyShop,
    getDaMonthlyFab,
    getDaMonthlyFabById,
    createDaMonthlyFab,
    updateDaMonthlyFab,
    deleteDaMonthlyFab,
    getDaMonthlyIda,
    getDaMonthlyIdaById,
    createDaMonthlyIda,
    updateDaMonthlyIda,
    deleteDaMonthlyIda
} = require('../services/da.service');

// ===== SHOP DA HANDLERS =====

/**
 * Handler to get all DA monthly shop data
 */
const getDaMonthlyShopHandler = async (req, res, next) => {
    try {
        const { month } = req.query;
        const data = await getDaMonthlyShop(month);
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly shop data retrieved successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to get DA monthly shop data by ID
 */
const getDaMonthlyShopByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getDaMonthlyShopById(id);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "DA monthly shop record not found"
            });
        }
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly shop record retrieved successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to create DA monthly shop data
 */
const createDaMonthlyShopHandler = async (req, res, next) => {
    try {
        const data = await createDaMonthlyShop(req.body);
        return res.status(201).send({
            success: true,
            data: data,
            message: "DA monthly shop record created successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to update DA monthly shop data
 */
const updateDaMonthlyShopHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await updateDaMonthlyShop(id, req.body);
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly shop record updated successfully"
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).send({
                success: false,
                message: "DA monthly shop record not found"
            });
        }
        next(err);
    }
};

/**
 * Handler to delete DA monthly shop data
 */
const deleteDaMonthlyShopHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteDaMonthlyShop(id);
        return res.status(200).send({
            success: true,
            message: "DA monthly shop record deleted successfully"
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).send({
                success: false,
                message: "DA monthly shop record not found"
            });
        }
        next(err);
    }
};

// ===== FAB DA HANDLERS =====

/**
 * Handler to get all DA monthly fab data
 */
const getDaMonthlyFabHandler = async (req, res, next) => {
    try {
        const { month } = req.query;
        const data = await getDaMonthlyFab(month);
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly fab data retrieved successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to get DA monthly fab data by ID
 */
const getDaMonthlyFabByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getDaMonthlyFabById(id);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "DA monthly fab record not found"
            });
        }
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly fab record retrieved successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to create DA monthly fab data
 */
const createDaMonthlyFabHandler = async (req, res, next) => {
    try {
        const data = await createDaMonthlyFab(req.body);
        return res.status(201).send({
            success: true,
            data: data,
            message: "DA monthly fab record created successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to update DA monthly fab data
 */
const updateDaMonthlyFabHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await updateDaMonthlyFab(id, req.body);
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly fab record updated successfully"
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).send({
                success: false,
                message: "DA monthly fab record not found"
            });
        }
        next(err);
    }
};

/**
 * Handler to delete DA monthly fab data
 */
const deleteDaMonthlyFabHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteDaMonthlyFab(id);
        return res.status(200).send({
            success: true,
            message: "DA monthly fab record deleted successfully"
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).send({
                success: false,
                message: "DA monthly fab record not found"
            });
        }
        next(err);
    }
};

// ===== IDA HANDLERS =====

/**
 * Handler to get all DA monthly IDA data
 */
const getDaMonthlyIdaHandler = async (req, res, next) => {
    try {
        const { month } = req.query;
        const data = await getDaMonthlyIda(month);
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly IDA data retrieved successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to get DA monthly IDA data by ID
 */
const getDaMonthlyIdaByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await getDaMonthlyIdaById(id);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "DA monthly IDA record not found"
            });
        }
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly IDA record retrieved successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to create DA monthly IDA data
 */
const createDaMonthlyIdaHandler = async (req, res, next) => {
    try {
        const data = await createDaMonthlyIda(req.body);
        return res.status(201).send({
            success: true,
            data: data,
            message: "DA monthly IDA record created successfully"
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to update DA monthly IDA data
 */
const updateDaMonthlyIdaHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await updateDaMonthlyIda(id, req.body);
        return res.status(200).send({
            success: true,
            data: data,
            message: "DA monthly IDA record updated successfully"
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).send({
                success: false,
                message: "DA monthly IDA record not found"
            });
        }
        next(err);
    }
};

/**
 * Handler to delete DA monthly IDA data
 */
const deleteDaMonthlyIdaHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteDaMonthlyIda(id);
        return res.status(200).send({
            success: true,
            message: "DA monthly IDA record deleted successfully"
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).send({
                success: false,
                message: "DA monthly IDA record not found"
            });
        }
        next(err);
    }
};

module.exports = {
    // Shop DA handlers
    getDaMonthlyShopHandler,
    getDaMonthlyShopByIdHandler,
    createDaMonthlyShopHandler,
    updateDaMonthlyShopHandler,
    deleteDaMonthlyShopHandler,

    // Fab DA handlers
    getDaMonthlyFabHandler,
    getDaMonthlyFabByIdHandler,
    createDaMonthlyFabHandler,
    updateDaMonthlyFabHandler,
    deleteDaMonthlyFabHandler,

    // IDA handlers
    getDaMonthlyIdaHandler,
    getDaMonthlyIdaByIdHandler,
    createDaMonthlyIdaHandler,
    updateDaMonthlyIdaHandler,
    deleteDaMonthlyIdaHandler
};
