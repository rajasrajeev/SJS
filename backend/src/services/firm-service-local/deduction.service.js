const { prisma } = require("../../utils/prisma");
const { createPaginator } = require('prisma-pagination');
const saveExcel = require("../../utils/saveExcel.util");
const { deductionMonthlyMasterSchema } = require("../../schemas/deductionmonthlymaster.schema.js");
const { deductionMonthlyMonthlySchema } = require("../../schemas/deductionmonthlymonthly.schema.js");
const { deductionMonthlyAdvanceSchema } = require("../../schemas/deductionmonthlyadvance.schema.js");

const paginate = createPaginator();

// Build standard where clause for deductionmonthlymaster filtering
const buildDeductionMonthlyMasterWhereClause = (query) => {
    let whereClause = { AND: [] };

    // Filter by month (expecting month name like "April")
    if (query.month) {
        // Convert month name to date range
        const monthDate = getMonthDateRange(query.month, query.year);
        if (monthDate) {
            whereClause.AND.push({
                month: {
                    gte: monthDate.start,
                    lte: monthDate.end
                }
            });
        }
    }

    if (query.deduction_id) {
        whereClause.AND.push({
            deduction_id: { equals: parseInt(query.deduction_id) }
        });
    }

    if (query.branch_id) {
        whereClause.AND.push({
            branch_id: { equals: parseInt(query.branch_id) }
        });
    }

    if (query.department_id) {
        whereClause.AND.push({
            department_id: { equals: parseInt(query.department_id) }
        });
    }
    if (query.emp_id) {
        whereClause.AND.push({
            deductionEmployeeMonthlyMaster: {
                some: {
                    emp_id: parseInt(query.emp_id)
                }
            }
        });
    }
    if (query.unwanted !== undefined) {
        whereClause.AND.push({
            unwanted: query.unwanted === 'true' || query.unwanted === true
        });
    }
    if (query.unrecover !== undefined) {
        whereClause.AND.push({
            unrecover: query.unrecover === 'true' || query.unrecover === true
        });
    }
    

    return whereClause.AND.length ? whereClause : undefined;
};

// Helper function to convert month name to date range
const getMonthDateRange = (monthName, year = new Date().getFullYear()) => {
    const months = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3,
        'may': 4, 'june': 5, 'july': 6, 'august': 7,
        'september': 8, 'october': 9, 'november': 10, 'december': 11
    };
    
    const monthIndex = months[monthName.toLowerCase()];
    if (monthIndex === undefined) return null;
    
    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0, 23, 59, 59);
    
    return { start, end };
};

// Helper to prepare data for create/update operations (Alternative approach)
const prepareDeductionMonthlyMasterDataAlt = (data) => {
    // Convert month name to date
    const monthDate = getMonthDateRange(data.month, data.year || new Date().getFullYear());
    
    return {
        month: monthDate ? monthDate.start : new Date(),
        deduction: {
            connect: { id: parseInt(data.deduction_id) }
        },
        ...(data.branch_id && {
            branch: {
                connect: { id: parseInt(data.branch_id) }
            }
        }),
        ...(data.department_id && {
            department: {
                connect: { id: parseInt(data.department_id) }
            }
        }),
    };
};

// Helper to prepare data for create/update operations
const prepareDeductionMonthlyMasterData = (data) => {
    // Convert month name to date
    const monthDate = getMonthDateRange(data.month, data.year || new Date().getFullYear());
    
    return {
        deduction_id: parseInt(data.deduction_id),
        branch_id: data.branch_id ? parseInt(data.branch_id) : null,
        department_id: data.department_id ? parseInt(data.department_id) : null,
        month: monthDate ? monthDate.start : new Date(),
    };
};

// Main CRUD operations
const getDeductionMonthlyMaster = async (query) => {
    try {
        let page = query.page || 1;
        let perPage = query.perPage || 10;

        const whereClause = buildDeductionMonthlyMasterWhereClause(query);

        const results = await paginate(prisma.deductionMonthlyMaster, {
            where: whereClause,
            orderBy: { month: 'desc' },
            include: {
                deduction: { select: { id: true, name: true, code: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true, code: true } },
                deductionEmployeeMonthlyMaster: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        }, { page: page, perPage: perPage });

        return results;
    } catch (error) {
        console.error("Error fetching deductionmonthlymaster list:", error);
        throw ({ status: 400, message: `Something Went Wrong` });
    }
};

const getDeductionMonthlyMasterDetails = async (id) => {
    try {
        const result = await prisma.deductionMonthlyMaster.findFirst({
            where: { id: parseInt(id) },
            include: {
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
                deductionEmployeeMonthlyMaster: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        });

        if (!result) {
            throw ({ status: 404, message: `No Record Found!!!` });
        }

        return result;
    } catch (error) {
        console.error("Error fetching deductionmonthlymaster details:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const createDeductionMonthlyMaster = async (data, files, query) => {
    try {
        // Validate the data
        const { error, value } = deductionMonthlyMasterSchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }

        // Use transaction to ensure data consistency
        // const result = await prisma.$transaction(async (tx) => {
            // Create the main record
            const masterData = prepareDeductionMonthlyMasterDataAlt(value);
            const deductionMonthlyMaster = await prisma.deductionMonthlyMaster.create({
                data: masterData
            });

            // Create employee deduction records if provided
            if (value.employees && Array.isArray(value.employees)) {
                const employeeDeductions = value.employees.map(emp => ({
                    deduction_monthly_master_id: deductionMonthlyMaster.id,
                    emp_id: parseInt(emp.emp_id),
                    deduction_amt: parseFloat(emp.deduction_amt || 0),
                    installment_amt: emp.installment_amt ? parseFloat(emp.installment_amt) : null,
                    interest_percentage: emp.interest_percentage ? parseFloat(emp.interest_percentage) : null,
                }));

                await prisma.deductionEmployeeMonthlyMaster.createMany({
                    data: employeeDeductions
                });
            }

            // Return the complete record with relations
            return await prisma.deductionMonthlyMaster.findUnique({
                where: { id: deductionMonthlyMaster.id },
                include: {
                    deduction: { select: { id: true, name: true } },
                    branch: { select: { id: true, name: true } },
                    department: { select: { id: true, name: true } },
                    deductionEmployeeMonthlyMaster: {
                        include: {
                            employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                        }
                    }
                }
            });
        // });

        return deductionMonthlyMaster;
    } catch (error) {
        console.error("Error creating deductionmonthlymaster:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const updateDeductionMonthlyMaster = async (id, data, files) => {
    try {
        // Check if record exists
        const existing = await prisma.deductionMonthlyMaster.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existing) {
            throw ({ status: 404, message: "Record not found" });
        }

        // Validate the data
        const { error, value } = deductionMonthlyMasterSchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }

        // Use transaction to ensure data consistency
        const result = await prisma.$transaction(async (tx) => {
            // Update the main record
            const masterData = prepareDeductionMonthlyMasterDataAlt(value);
            const deductionMonthlyMaster = await prisma.deductionMonthlyMaster.update({
                where: { id: parseInt(id) },
                data: masterData
            });

            // Handle employee deductions update
            if (value.employees && Array.isArray(value.employees)) {
                // Delete existing employee deductions
                await prisma.deductionEmployeeMonthlyMaster.deleteMany({
                    where: { deduction_monthly_master_id: parseInt(id) }
                });

                // Create new employee deductions
                const employeeDeductions = value.employees.map(emp => ({
                    deduction_monthly_master_id: parseInt(id),
                    emp_id: parseInt(emp.emp_id),
                    deduction_amt: parseFloat(emp.deduction_amt || 0),
                    installment_amt: emp.installment_amt ? parseFloat(emp.installment_amt) : null,
                    interest_percentage: emp.interest_percentage ? parseFloat(emp.interest_percentage) : null,
                }));

                await prisma.deductionEmployeeMonthlyMaster.createMany({
                    data: employeeDeductions
                });
            }

            // Return the complete updated record with relations
            return await prisma.deductionMonthlyMaster.findUnique({
                where: { id: parseInt(id) },
                include: {
                    deduction: { select: { id: true, name: true } },
                    branch: { select: { id: true, name: true } },
                    department: { select: { id: true, name: true } },
                    deductionEmployeeMonthlyMaster: {
                        include: {
                            employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                        }
                    }
                }
            });
        });

        return result;
    } catch (error) {
        console.error("Error updating deductionmonthlymaster:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const deleteDeductionMonthlyMaster = async (id) => {
    console.log("id----------------------> ", id);
    try {
        const recordId = parseInt(id);
        if (isNaN(recordId)) {
            throw new Error("Invalid ID");
        }

        // Check if record exists
        const existing = await prisma.deductionMonthlyMaster.findUnique({
            where: { id: recordId }
        });

        if (!existing) {
            throw ({ status: 404, message: "Record not found" });
        }

        // Use transaction to ensure data consistency
        const result = await prisma.$transaction(async (tx) => {
            // Delete employee deductions first (cascade should handle this, but being explicit)
            await prisma.deductionEmployeeMonthlyMaster.deleteMany({
                where: { deduction_monthly_master_id: recordId }
            });
            // Then, delete the main deductionMonthlyMaster record
            return await prisma.deductionMonthlyMaster.delete({
                where: { id: recordId }
            });
        });

        return result;
    } catch (error) {
        console.error("Error deleting deductionmonthlymaster:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const exportDeductionMonthlyMasterExcel = async (query) => {
    try {
        const whereClause = buildDeductionMonthlyMasterWhereClause(query);

        // Get all records with necessary data
        const records = await prisma.deductionMonthlyMaster.findMany({
            where: whereClause,
            include: {
                deduction: { select: { name: true } },
                branch: { select: { name: true } },
                department: { select: { name: true } },
                deductionEmployeeMonthlyMaster: {
                    include: {
                        employee: { select: { name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        });

        // Flatten data for excel export
        const formattedData = [];
        records.forEach(record => {
            if (record.deductionEmployeeMonthlyMaster.length > 0) {
                record.deductionEmployeeMonthlyMaster.forEach(empDeduction => {
                    formattedData.push({
                        'Master ID': record.id,
                        'Deduction': record.deduction?.name || '',
                        'Branch': record.branch?.name || '',
                        'Department': record.department?.name || '',
                        'Month': record.month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                        'Employee Code': empDeduction.employee?.emp_id || '',
                        'Employee Name': empDeduction.employee?.name || '',
                        'Deduction Amount': empDeduction.deduction_amt,
                        'Installment Amount': empDeduction.installment_amt || 0,
                        'Interest Percentage': empDeduction.interest_percentage || 0,
                        'Created At': record.created_at?.toLocaleDateString() || ''
                    });
                });
            } else {
                formattedData.push({
                    'Master ID': record.id,
                    'Deduction': record.deduction?.name || '',
                    'Branch': record.branch?.name || '',
                    'Department': record.department?.name || '',
                    'Month': record.month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    'Employee Code': '',
                    'Employee Name': '',
                    'Deduction Amount': 0,
                    'Installment Amount': 0,
                    'Interest Percentage': 0,
                    'Created At': record.created_at?.toLocaleDateString() || ''
                });
            }
        });

        // Save to Excel
        const monthFilter = query.month ? `-${query.month}` : '';
        const filePath = saveExcel(
            formattedData, 
            `DeductionMonthlyMaster${monthFilter}-${Date.now()}`, 
            'DeductionMonthlyMaster', 
            'deductionmonthlymaster'
        );

        return { fileName: filePath };
    } catch (error) {
        console.error("Error exporting deductionmonthlymaster data to Excel:", error);
        throw ({ status: 400, message: `Error exporting data` });
    }
};

const getDeductionMonthlyMasterMini = async (req) => {
    try {
        const whereClause = buildDeductionMonthlyMasterWhereClause(req.query);

        const records = await prisma.deductionMonthlyMaster.findMany({
            where: whereClause,
            select: {
                id: true,
                month: true,
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
            },
            orderBy: { month: 'desc' }
        });

        return records;
    } catch (error) {
        console.error("Error fetching mini deductionmonthlymaster list:", error);
        throw ({ status: 400, message: `Something Went Wrong` });
    }
};

// Helper for where clause
const buildDeductionMonthlyMonthlyWhereClause = (query) => {
    let whereClause = { AND: [] };
    if (query.month) {
        const monthDate = getMonthDateRange(query.month, query.year);
        if (monthDate) {
            whereClause.AND.push({
                month: {
                    gte: monthDate.start,
                    lte: monthDate.end
                }
            });
        }
    }
    if (query.deduction_id) {
        whereClause.AND.push({
            deduction_id: { equals: parseInt(query.deduction_id) }
        });
    }
    if (query.branch_id) {
        whereClause.AND.push({
            branch_id: { equals: parseInt(query.branch_id) }
        });
    }
    if (query.department_id) {
        whereClause.AND.push({
            department_id: { equals: parseInt(query.department_id) }
        });
    }
    return whereClause.AND.length ? whereClause : undefined;
};

const getDeductionMonthlyMonthly = async (query) => {
    try {
        let page = query.page || 1;
        let perPage = query.perPage || 10;
        const whereClause = buildDeductionMonthlyMonthlyWhereClause(query);
        const results = await paginate(prisma.deductionMonthlyMonthly, {
            where: whereClause,
            orderBy: { month: 'desc' },
            include: {
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
                deductionEmployeeMonthlyMonthly: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        }, { page: page, perPage: perPage });
        return results;
    } catch (error) {
        console.error("Error fetching deductionmonthlymonthly list:", error);
        throw ({ status: 400, message: `Something Went Wrong` });
    }
};

const getDeductionMonthlyMonthlyDetails = async (id) => {
    try {
        const result = await prisma.deductionMonthlyMonthly.findFirst({
            where: { id: parseInt(id) },
            include: {
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
                deductionEmployeeMonthlyMonthly: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        });
        if (!result) {
            throw ({ status: 404, message: `No Record Found!!!` });
        }
        return result;
    } catch (error) {
        console.error("Error fetching deductionmonthlymonthly details:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const createDeductionMonthlyMonthly = async (data) => {
    try {
        const { error, value } = deductionMonthlyMonthlySchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        const masterData = prepareDeductionMonthlyMasterDataAlt(value);
        const deductionMonthlyMonthly = await prisma.deductionMonthlyMonthly.create({
            data: masterData
        });
        if (value.employees && Array.isArray(value.employees)) {
            const employeeDeductions = value.employees.map(emp => ({
                deduction_monthly_monthly_id: deductionMonthlyMonthly.id,
                emp_id: parseInt(emp.emp_id),
                deduction_amt: parseFloat(emp.deduction_amt || 0),
                installment_amt: emp.installment_amt ? parseFloat(emp.installment_amt) : null,
                interest_percentage: emp.interest_percentage ? parseFloat(emp.interest_percentage) : null,
            }));
            await prisma.deductionEmployeeMonthlyMonthly.createMany({
                data: employeeDeductions
            });
        }
        return await prisma.deductionMonthlyMonthly.findUnique({
            where: { id: deductionMonthlyMonthly.id },
            include: {
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
                deductionEmployeeMonthlyMonthly: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error creating deductionmonthlymonthly:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const updateDeductionMonthlyMonthly = async (id, data) => {
    try {
        const existing = await prisma.deductionMonthlyMonthly.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existing) {
            throw ({ status: 404, message: "Record not found" });
        }
        const { error, value } = deductionMonthlyMonthlySchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        const result = await prisma.$transaction(async (tx) => {
            const masterData = prepareDeductionMonthlyMasterDataAlt(value);
            const deductionMonthlyMonthly = await prisma.deductionMonthlyMonthly.update({
                where: { id: parseInt(id) },
                data: masterData
            });
            if (value.employees && Array.isArray(value.employees)) {
                await prisma.deductionEmployeeMonthlyMonthly.deleteMany({
                    where: { deduction_monthly_monthly_id: parseInt(id) }
                });
                const employeeDeductions = value.employees.map(emp => ({
                    deduction_monthly_monthly_id: parseInt(id),
                    emp_id: parseInt(emp.emp_id),
                    deduction_amt: parseFloat(emp.deduction_amt || 0),
                    installment_amt: emp.installment_amt ? parseFloat(emp.installment_amt) : null,
                    interest_percentage: emp.interest_percentage ? parseFloat(emp.interest_percentage) : null,
                }));
                await prisma.deductionEmployeeMonthlyMonthly.createMany({
                    data: employeeDeductions
                });
            }
            return deductionMonthlyMonthly;
        });
        return result;
    } catch (error) {
        console.error("Error updating deductionmonthlymonthly:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const deleteDeductionMonthlyMonthly = async (id) => {
    try {
        const deductionMonthlyMonthly = await prisma.deductionMonthlyMonthly.delete({
            where: { id: parseInt(id) }
        });
        return deductionMonthlyMonthly;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete deductionMonthlyMonthly!" });
    }
};

// DeductionMonthlyAdvance
const buildDeductionMonthlyAdvanceWhereClause = (query) => {
    let whereClause = { AND: [] };
    if (query.month) {
        const monthDate = getMonthDateRange(query.month, query.year);
        if (monthDate) {
            whereClause.AND.push({
                month: {
                    gte: monthDate.start,
                    lte: monthDate.end
                }
            });
        }
    }
    if (query.deduction_id) {
        whereClause.AND.push({
            deduction_id: { equals: parseInt(query.deduction_id) }
        });
    }
    if (query.branch_id) {
        whereClause.AND.push({
            branch_id: { equals: parseInt(query.branch_id) }
        });
    }
    if (query.department_id) {
        whereClause.AND.push({
            department_id: { equals: parseInt(query.department_id) }
        });
    }
    return whereClause.AND.length ? whereClause : undefined;
};

const getDeductionMonthlyAdvance = async (query) => {
    try {
        let page = query.page || 1;
        let perPage = query.perPage || 10;
        const whereClause = buildDeductionMonthlyAdvanceWhereClause(query);
        const results = await paginate(prisma.deductionMonthlyAdvance, {
            where: whereClause,
            orderBy: { month: 'desc' },
            include: {
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
                deductionEmployeeMonthlyAdvance: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        }, { page: page, perPage: perPage });
        return results;
    } catch (error) {
        console.error("Error fetching deductionmonthlyadvance list:", error);
        throw ({ status: 400, message: `Something Went Wrong` });
    }
};

const getDeductionMonthlyAdvanceDetails = async (id) => {
    try {
        const result = await prisma.deductionMonthlyAdvance.findFirst({
            where: { id: parseInt(id) },
            include: {
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
                deductionEmployeeMonthlyAdvance: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        });
        if (!result) {
            throw ({ status: 404, message: `No Record Found!!!` });
        }
        return result;
    } catch (error) {
        console.error("Error fetching deductionmonthlyadvance details:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const createDeductionMonthlyAdvance = async (data) => {
    try {
        const { error, value } = deductionMonthlyAdvanceSchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        const masterData = prepareDeductionMonthlyMasterDataAlt(value);
        const deductionMonthlyAdvance = await prisma.deductionMonthlyAdvance.create({
            data: masterData
        });
        if (value.employees && Array.isArray(value.employees)) {
            const employeeDeductions = value.employees.map(emp => ({
                deduction_monthly_advance_id: deductionMonthlyAdvance.id,
                emp_id: parseInt(emp.emp_id),
                deduction_amt: parseFloat(emp.deduction_amt || 0),
                installment_amt: emp.installment_amt ? parseFloat(emp.installment_amt) : null,
                interest_percentage: emp.interest_percentage ? parseFloat(emp.interest_percentage) : null,
            }));
            await prisma.deductionEmployeeMonthlyAdvance.createMany({
                data: employeeDeductions
            });
        }
        return await prisma.deductionMonthlyAdvance.findUnique({
            where: { id: deductionMonthlyAdvance.id },
            include: {
                deduction: { select: { id: true, name: true } },
                branch: { select: { id: true, name: true } },
                department: { select: { id: true, name: true } },
                deductionEmployeeMonthlyAdvance: {
                    include: {
                        employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error creating deductionmonthlyadvance:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const updateDeductionMonthlyAdvance = async (id, data) => {
    try {
        const existing = await prisma.deductionMonthlyAdvance.findUnique({
            where: { id: parseInt(id) }
        });
        if (!existing) {
            throw ({ status: 404, message: "Record not found" });
        }
        const { error, value } = deductionMonthlyAdvanceSchema.validate(data);
        if (error) {
            throw ({ status: 400, message: error.message });
        }
        const result = await prisma.$transaction(async (tx) => {
            const masterData = prepareDeductionMonthlyMasterDataAlt(value);
            const deductionMonthlyAdvance = await prisma.deductionMonthlyAdvance.update({
                where: { id: parseInt(id) },
                data: masterData
            });
            if (value.employees && Array.isArray(value.employees)) {
                await prisma.deductionEmployeeMonthlyAdvance.deleteMany({
                    where: { deduction_monthly_advance_id: parseInt(id) }
                });
                const employeeDeductions = value.employees.map(emp => ({
                    deduction_monthly_advance_id: parseInt(id),
                    emp_id: parseInt(emp.emp_id),
                    deduction_amt: parseFloat(emp.deduction_amt || 0),
                    installment_amt: emp.installment_amt ? parseFloat(emp.installment_amt) : null,
                    interest_percentage: emp.interest_percentage ? parseFloat(emp.interest_percentage) : null,
                }));
                await prisma.deductionEmployeeMonthlyAdvance.createMany({
                    data: employeeDeductions
                });
            }
            return deductionMonthlyAdvance;
        });
        return result;
    } catch (error) {
        console.error("Error updating deductionmonthlyadvance:", error);
        throw ({ status: 400, message: error.message || `Something Went Wrong` });
    }
};

const deleteDeductionMonthlyAdvance = async (id) => {
    try {
        const deductionMonthlyAdvance = await prisma.deductionMonthlyAdvance.delete({
            where: { id: parseInt(id) }
        });
        return deductionMonthlyAdvance;
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: "Cannot delete deductionMonthlyAdvance!" });
    }
};

module.exports = {
    createDeductionMonthlyMaster,
    getDeductionMonthlyMaster,
    getDeductionMonthlyMasterDetails,
    updateDeductionMonthlyMaster,
    deleteDeductionMonthlyMaster,
    exportDeductionMonthlyMasterExcel,
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
    deleteDeductionMonthlyAdvance
};