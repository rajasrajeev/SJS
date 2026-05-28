const { prisma } = require("../../utils/prisma.js");
const { nightAllowanceMonthlySchema } = require("../../schemas/nightallowancemonthly.schema.js");

const getNightAllowanceMonthly = async (query) => {
    try {
        return await prisma.nightAllowanceMonthly.findMany({
            where: query.emp_id ? { emp_id: parseInt(query.emp_id) } : undefined,
            orderBy: { created_at: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching nightallowancemonthly list:", error);
        throw ({ status: 400, message: `Something Went Wrong` });
    }
};

const getNightAllowanceMonthlyDetails = async (id) => {
    try {
        const result = await prisma.nightAllowanceMonthly.findFirst({
            where: { id: parseInt(id) }
        });
        if (!result) {
            throw ({ status: 404, message: `No Record Found!!!` });
        }
        return result;
    } catch (error) {
        console.error("Error fetching nightallowancemonthly details:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const createNightAllowanceMonthly = async (data) => {
    try {
        const { error, value } = nightAllowanceMonthlySchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        return await prisma.nightAllowanceMonthly.create({ data: value });
    } catch (error) {
        console.error("Error creating nightallowancemonthly:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const updateNightAllowanceMonthly = async (id, data) => {
    try {
        const { error, value } = nightAllowanceMonthlySchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        return await prisma.nightAllowanceMonthly.update({ where: { id: parseInt(id) }, data: value });
    } catch (error) {
        console.error("Error updating nightallowancemonthly:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const deleteNightAllowanceMonthly = async (id) => {
    try {
        return await prisma.nightAllowanceMonthly.delete({ where: { id: parseInt(id) } });
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete nightAllowanceMonthly!" });
    }
};

module.exports = {
    getNightAllowanceMonthly,
    getNightAllowanceMonthlyDetails,
    createNightAllowanceMonthly,
    updateNightAllowanceMonthly,
    deleteNightAllowanceMonthly
}; 