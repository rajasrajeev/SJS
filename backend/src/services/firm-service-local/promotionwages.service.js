const { prisma } = require("../../utils/prisma");
const { promotionWagesSchema } = require("../../schemas/promotionwages.schema.js");

const getPromotionWages = async (query) => {
    try {
        return await prisma.promotionWages.findMany({
            where: query.emp_id ? { emp_id: parseInt(query.emp_id) } : undefined,
            orderBy: { created_at: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching promotionwages list:", error);
        throw ({ status: 400, message: `Something Went Wrong` });
    }
};

const getPromotionWagesDetails = async (id) => {
    try {
        const result = await prisma.promotionWages.findFirst({
            where: { id: parseInt(id) }
        });
        if (!result) {
            throw ({ status: 404, message: `No Record Found!!!` });
        }
        return result;
    } catch (error) {
        console.error("Error fetching promotionwages details:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const createPromotionWages = async (data) => {
    try {
        const { error, value } = promotionWagesSchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        return await prisma.promotionWages.create({ data: value });
    } catch (error) {
        console.error("Error creating promotionwages:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const updatePromotionWages = async (id, data) => {
    try {
        const { error, value } = promotionWagesSchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        return await prisma.promotionWages.update({ where: { id: parseInt(id) }, data: value });
    } catch (error) {
        console.error("Error updating promotionwages:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const deletePromotionWages = async (id) => {
    try {
        return await prisma.promotionWages.delete({ where: { id: parseInt(id) } });
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete promotionWages!" });
    }
};

module.exports = {
    getPromotionWages,
    getPromotionWagesDetails,
    createPromotionWages,
    updatePromotionWages,
    deletePromotionWages
};
