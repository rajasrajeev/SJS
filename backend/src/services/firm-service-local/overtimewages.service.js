const { prisma } = require("../../utils/prisma.js");
const { overtimeWagesMonthlySchema } = require("../../schemas/overtimewagesmonthly.schema.js");

const getOvertimeWagesMonthly = async (query) => {
    try {
        return await prisma.overtimeWagesMonthly.findMany({
            where: query.emp_id ? { emp_id: parseInt(query.emp_id) } : undefined,
            orderBy: { created_at: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching overtimewagesmonthly list:", error);
        throw ({ status: 400, message: `Something Went Wrong` });
    }
};

const getOvertimeWagesMonthlyDetails = async (id) => {
    try {
        const result = await prisma.overtimeWagesMonthly.findFirst({
            where: { id: parseInt(id) }
        });
        if (!result) {
            throw ({ status: 404, message: `No Record Found!!!` });
        }
        return result;
    } catch (error) {
        console.error("Error fetching overtimewagesmonthly details:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const createOvertimeWagesMonthly = async (data) => {
    try {
        const { error, value } = overtimeWagesMonthlySchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        return await prisma.overtimeWagesMonthly.create({ data: value });
    } catch (error) {
        console.error("Error creating overtimewagesmonthly:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const updateOvertimeWagesMonthly = async (id, data) => {
    try {
        const { error, value } = overtimeWagesMonthlySchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        return await prisma.overtimeWagesMonthly.update({ where: { id: parseInt(id) }, data: value });
    } catch (error) {
        console.error("Error updating overtimewagesmonthly:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const deleteOvertimeWagesMonthly = async (id) => {
    try {
        return await prisma.overtimeWagesMonthly.delete({ where: { id: parseInt(id) } });
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete overtimeWagesMonthly!" });
    }
};

module.exports = {
    getOvertimeWagesMonthly,
    getOvertimeWagesMonthlyDetails,
    createOvertimeWagesMonthly,
    updateOvertimeWagesMonthly,
    deleteOvertimeWagesMonthly
}; 