const { prisma } = require("../../utils/prisma");
const { createPaginator } = require('prisma-pagination');
const saveExcel = require("../../utils/saveExcel.util");
const { employeeSchema } = require("../../schemas/employee.schema");

const paginate = createPaginator();

// Build standard where clause for employee filtering
const buildEmployeeWhereClause = (query) => {
  let whereClause = { AND: [] };
  
  // Search by name or emp_id
  if (query.search) {
    if (!isNaN(parseInt(query.search))) {
      whereClause.AND.push({
        OR: [{ emp_id: { equals: parseInt(query.search) } }]
      });
    } else {
      whereClause.AND.push({
        OR: [{ name: { contains: query.search, mode: 'insensitive' } }]
      });
    }
  }

  // Filter by employee id if specified - FIXED: was using query.search instead of query.emp_id
  if (query.emp_id) {
    whereClause.AND.push({
      emp_id: { equals: parseInt(query.emp_id) }
    });
  }

  // Add filters for department, designation, branch, and active status
  ['department_id', 'designation_id', 'branch_id'].forEach(field => {
    if (query[field]) {
      whereClause.AND.push({ [field]: parseInt(query[field]) });
    }
  });

  if (query.active) {
    whereClause.AND.push({ active: query.active.toLowerCase() === 'true' });
  }

  return whereClause.AND.length ? whereClause : undefined;
};

// Helper for employee search by code or name
const buildEmployeeCodeSearchClause = (searchTerm) => {
  if (!searchTerm) return undefined;
  
  return {
    AND: [{
      OR: [
        { pno: { contains: searchTerm, mode: 'insensitive' } },
        { tno: { contains: searchTerm, mode: 'insensitive' } },
        { name: { contains: searchTerm, mode: 'insensitive' } },
      ]
    }]
  };
};

// Helper to prepare employee data for create/update operations
const prepareEmployeeData = (employeeData, type = "update") => {
    const isUpdate = type === "update";

    return {
        emp_id: parseInt(employeeData.emp_id) || null,
        branch: employeeData.branch_id && employeeData.branch_id !== ""
            ? { connect: { id: parseInt(employeeData.branch_id) } }
            : undefined,
        pno: employeeData.pno,
        tno: employeeData.tno || null,
        name: employeeData.name,
        gender: employeeData.gender,
        dob: employeeData.dob ? new Date(employeeData.dob) : null,
        blood_group: employeeData.blood_group,
        religion: employeeData.religion,
        age: employeeData.age ? parseInt(employeeData.age) : null,
        father_name: employeeData.father_name,
        spouse_name: employeeData.spouse_name,
        nominee: employeeData.nominee,
        join_trainee: employeeData.join_trainee ? new Date(employeeData.join_trainee) : null,
        join_staff: employeeData.join_staff ? new Date(employeeData.join_staff) : null,
        department: employeeData.department_id ? { connect: { id: parseInt(employeeData.department_id) } } : undefined,
        designation: employeeData.designation_id ? { connect: { id: parseInt(employeeData.designation_id) } } : undefined,
        retire_date: employeeData.retire_date ? new Date(employeeData.retire_date) : null,
        mobile_no: employeeData.mobile_no,
        alt_mobile_no: employeeData.alt_mobile_no,
        email: employeeData.email,
        active: employeeData.active,
        retired: employeeData.retired,
        photo: employeeData.photo || null,

        // Handle related collections with consistent approach
        ...(employeeData.employeeShift && {
            employeeShift: {
                ...(isUpdate && { deleteMany: {} }),
                create: {
                    shift_id: parseInt(employeeData.employeeShift.shift_id),
                    week_off: employeeData.employeeShift.week_off
                }
            }
        }),

        ...(employeeData.employeeAddress && employeeData.employeeAddress.length > 0 && {
            employeeAddress: {
                ...(isUpdate && { deleteMany: {} }),
                create: employeeData.employeeAddress.map(address => ({
                    house_no: address.house_no,
                    house_name: address.house_name,
                    street_name: address.street_name,
                    place: address.place,
                    pincode: address.pincode,
                    country_id: address.country_id ? parseInt(address.country_id) : null,
                    state_id: address.state_id ? parseInt(address.state_id) : null,
                    district_id: address.district_id ? parseInt(address.district_id) : null,
                    is_permanent: address.is_permanent,
                }))
            }
        }),

        ...(employeeData.employeeWage && {
            employeeWage: {
                ...(isUpdate && { deleteMany: {} }),
                create: {
                    basic1: employeeData.employeeWage.basic1 ? parseFloat(employeeData.employeeWage.basic1) : null,
                    basic2: employeeData.employeeWage.basic2 ? parseFloat(employeeData.employeeWage.basic2) : null,
                    basic3: employeeData.employeeWage.basic3 ? parseFloat(employeeData.employeeWage.basic3) : null,
                    basic4: employeeData.employeeWage.basic4 ? parseFloat(employeeData.employeeWage.basic4) : null,
                    basic5: employeeData.employeeWage.basic5 ? parseFloat(employeeData.employeeWage.basic5) : null,
                    basic6: employeeData.employeeWage.basic6 ? parseFloat(employeeData.employeeWage.basic6) : null,
                    increment_percentage: employeeData.employeeWage.increment_percentage
                        ? parseFloat(employeeData.employeeWage.increment_percentage)
                        : null,
                    increment_percentage_value: employeeData.employeeWage.increment_percentage_value 
                        ? parseFloat(employeeData.employeeWage.increment_percentage_value) : null,
                    service_weightage: employeeData.employeeWage.service_weightage
                        ? parseFloat(employeeData.employeeWage.service_weightage)
                        : null,
                    service_weightage_value: employeeData.employeeWage.service_weightage_value
                        ? parseFloat(employeeData.employeeWage.service_weightage_value) : null,
                    hra: employeeData.employeeWage.hra ? parseFloat(employeeData.employeeWage.hra) : null,
                    hra_value: employeeData.employeeWage.hra_value 
                        ? parseFloat(employeeData.employeeWage.hra_value) : null,
                    ltc: employeeData.employeeWage.ltc ? parseFloat(employeeData.employeeWage.ltc) : null,
                    ltc_value: employeeData.employeeWage.ltc_value 
                        ? parseFloat(employeeData.employeeWage.ltc_value) : null,
                    travel_allowance_percentage: employeeData.employeeWage.travel_allowance_percentage
                        ? parseFloat(employeeData.employeeWage.travel_allowance_percentage)
                        : null,
                    travel_allowance_value: employeeData.employeeWage.travel_allowance_value
                        ? parseFloat(employeeData.employeeWage.travel_allowance_value) : null,
                    attendance_incentive: employeeData.employeeWage.attendance_incentive
                        ? parseFloat(employeeData.employeeWage.attendance_incentive)
                        : null,
                    attendance_incentive_value: employeeData.employeeWage.attendance_incentive_value
                        ? parseFloat(employeeData.employeeWage.attendance_incentive_value) : null,
                    production_incentive: employeeData.employeeWage.production_incentive
                        ? parseFloat(employeeData.employeeWage.production_incentive)
                        : null,
                    production_incentive_value: employeeData.employeeWage.production_incentive_value
                        ? parseFloat(employeeData.employeeWage.production_incentive_value) : null,
                    medical_allowance: employeeData.employeeWage.medical_allowance
                        ? parseFloat(employeeData.employeeWage.medical_allowance)
                        : null,
                    medical_allowance_value: employeeData.employeeWage.medical_allowance_value
                        ? parseFloat(employeeData.employeeWage.medical_allowance_value) : null,
                    washing_allowance: employeeData.employeeWage.washing_allowance
                        ? parseFloat(employeeData.employeeWage.washing_allowance)
                        : null,
                    washing_allowance_value: employeeData.employeeWage.washing_allowance_value
                        ? parseFloat(employeeData.employeeWage.washing_allowance_value) : null,
                    other_allowance: employeeData.employeeWage.other_allowance
                        ? parseFloat(employeeData.employeeWage.other_allowance)
                        : null,
                    other_allowance_value: employeeData.employeeWage.other_allowance_value
                        ? parseFloat(employeeData.employeeWage.other_allowance_value) : null,
                    da_type: employeeData.employeeWage.da_type || null,
                    da: employeeData.employeeWage.da ? parseFloat(employeeData.employeeWage.da) : null,
                    fda: employeeData.employeeWage.fda ? parseFloat(employeeData.employeeWage.fda) : null,
                    vda: employeeData.employeeWage.vda ? parseFloat(employeeData.employeeWage.vda) : null,
                    salary: employeeData.employeeWage.salary ? parseFloat(employeeData.employeeWage.salary) : null
                }
            }
        }),

        ...(employeeData.employeeCategory && {
            employeeCategory: {
                ...(isUpdate && { deleteMany: {} }),
                create: {
                    salary_type: employeeData.employeeCategory.salary_type
                }
            }
        }),

        ...(employeeData.employeeBank && employeeData.employeeBank.length > 0 && {
            employeeBank: {
                ...(isUpdate && { deleteMany: {} }),
                create: employeeData.employeeBank.map(bank => ({
                    bank_name: bank.bank_name,
                    branch_name: bank.branch_name,
                    ifsc: bank.ifsc,
                    account_no: bank.account_no,
                    is_primary: bank.is_primary
                }))
            }
        }),

        ...(employeeData.employeeStatutory && {
            employeeStatutory: {
                ...(isUpdate && { deleteMany: {} }),
                create: {
                    pf_no: employeeData.employeeStatutory.pf_no,
                    is_pf: employeeData.employeeStatutory.is_pf,
                    is_esic: employeeData.employeeStatutory.is_esic,
                    uan_no: employeeData.employeeStatutory.uan_no,
                    pf_amount: employeeData.employeeStatutory.pf_amount 
                        ? parseFloat(employeeData.employeeStatutory.pf_amount) : null,
                    vpf_percentage: employeeData.employeeStatutory.vpf_percentage 
                        ? parseFloat(employeeData.employeeStatutory.vpf_percentage) : null,
                    esic_no: employeeData.employeeStatutory.esic_no,
                    lwf: employeeData.employeeStatutory.lwf,
                    other: employeeData.employeeStatutory.other
                }
            }
        }),

        ...(employeeData.employeeLic && employeeData.employeeLic.length > 0 && {
            employeeLic: {
                ...(isUpdate && { deleteMany: {} }),
                create: employeeData.employeeLic.map(lic => ({
                    lic_no: lic.lic_no,
                    lic_amount: lic.lic_amount ? parseFloat(lic.lic_amount) : null,
                    is_primary: lic.is_primary
                }))
            }
        }),

        ...(employeeData.employeeExperience && employeeData.employeeExperience.length > 0 && {
            employeeExperience: {
                ...(isUpdate && { deleteMany: {} }),
                create: employeeData.employeeExperience.map(experience => ({
                    firm_name: experience.firm_name,
                    place: experience.place,
                    joining_date: experience.joining_date ? new Date(experience.joining_date) : null,
                    resigning_date: experience.resigning_date ? new Date(experience.resigning_date) : null,
                    designation: experience.designation
                }))
            }
        }),

        ...(employeeData.employeeQualification && employeeData.employeeQualification.length > 0 && {
            employeeQualification: {
                ...(isUpdate && { deleteMany: {} }),
                create: employeeData.employeeQualification.map(qualification => ({
                    qualification: qualification.qualification,
                    percentage: qualification.percentage ? parseFloat(qualification.percentage) : null,
                    year: qualification.year,
                    university: qualification.university
                }))
            }
        })
    };
};

// Main CRUD operations
const getEmployee = async (query) => {
  try {
    let page = query.page || 1;
    let perPage = query.perPage || 10;
    
    const whereClause = buildEmployeeWhereClause(query);
    
    const employees = await paginate(prisma.employee, {
      where: whereClause,
      orderBy: { name: 'asc' },
      include: {
        department: { select: { id: true, name: true } },
        designation: { select: { id: true, name: true } }
      }
    }, { page: page, perPage: perPage });

    return employees;
  } catch (error) {
    console.error("Error fetching employee list:", error);
    throw ({ status: 400, message: `Something Went Wrong` });
  }
};

const getEmployeeDetails = async (id) => {
  try {
    const employees = await prisma.employee.findFirst({
      where: { id: parseInt(id) },
      include: {
        employeeShift: { include: { shift: true } },
        employeeWage: true,
        employeeCategory: true,
        employeeBank: true,
        employeeStatutory: true,
        employeeLic: true,
        employeeQualification: true,
        employeeExperience: true,
        employeeAddress: true,
        department: true,
        designation: true,
        branch: true
      }
    });

    if (!employees) {
      throw ({ status: 404, message: `No Employee Found!!!` });
    }

    return {
      ...employees,
      employeeWage: employees.employeeWage[0] || {},
      employeeCategory: employees.employeeCategory[0] || {},
      employeeStatutory: employees.employeeStatutory[0] || {},
      employeeShift: employees.employeeShift[0] || {},
    };
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw ({ status: 400, message: error.message || `Something Went Wrong` });
  }
};

const createEmployee = async (employeeData, files) => {
  try {
    // Handle file upload
    if (files && files.photo) {
      employeeData.photo = files.photo[0].path;
    }

    console.log("employeeData", files?.photo);
    
    // Validate the data
    const { error, value } = employeeSchema.validate(employeeData);
    if (error) {
      throw ({ status: 400, message: error.message });
    }
    
    // Prepare the data
    const preparedData = prepareEmployeeData(value, "create");
    
    // Create the employee
    const result = await prisma.employee.create({ data: preparedData });
    return result;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw ({ status: 400, message: error.message || `Something Went Wrong` });
  }
};

const updateEmployee = async (employeeId, employeeData, files) => {
  try {
    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: parseInt(employeeId) }
    });

    if (!existingEmployee) {
      throw ({ status: 404, message: "Employee not found" });
    }

    // Handle file upload
    if (files && files.photo) {
      employeeData.photo = files.photo[0].path;
    }
    
    // Validate the data
    const { error, value } = employeeSchema.validate(employeeData);
    if (error) {
      throw ({ status: 400, message: error.message });
    }
    
    // Prepare the data for update
    const preparedData = prepareEmployeeData(value, "update");
    
    // Update the employee using transaction with increased timeout
    const result = await prisma.$transaction(async (tx) => {
      return await tx.employee.update({
        where: { id: parseInt(employeeId) },
        data: preparedData,
        include: {
          department: true,
          designation: true,
          branch: true,
          employeeShift: true,
          employeeWage: true,
          employeeCategory: true,
          employeeBank: true,
          employeeStatutory: true,
          employeeLic: true,
          employeeQualification: true,
          employeeExperience: true,
          employeeAddress: true
        }
      });
    }, {
      timeout: 20000, // Increase timeout to 20 seconds
    });
    
    return result;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw ({ status: 400, message: error.message || `Something Went Wrong` });
  }
};

const deleteEmployee = async (employeeId) => {
  try {
    // Ensure employee ID is an integer
    const empId = parseInt(employeeId);
    if (isNaN(empId)) {
      throw new Error("Invalid employee ID");
    }
    
    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: empId }
    });

    if (!existingEmployee) {
      throw ({ status: 404, message: "Employee not found" });
    }
    
    // Use a transaction to ensure all related data is deleted properly
    const result = await prisma.$transaction(async (tx) => {
      // Delete all related records
      await tx.employeeShift.deleteMany({ where: { emp_id: empId } });
      await tx.employeeWage.deleteMany({ where: { emp_id: empId } });
      await tx.employeeCategory.deleteMany({ where: { emp_id: empId } });
      await tx.employeeBank.deleteMany({ where: { emp_id: empId } });
      await tx.employeeStatutory.deleteMany({ where: { emp_id: empId } });
      await tx.employeeLic.deleteMany({ where: { emp_id: empId } });
      await tx.employeeQualification.deleteMany({ where: { emp_id: empId } });
      await tx.employeeExperience.deleteMany({ where: { emp_id: empId } });
      await tx.employeeAddress.deleteMany({ where: { emp_id: empId } });
      
      // Finally delete the employee
      return tx.employee.delete({ where: { id: empId } });
    });
    
    return result;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw ({ status: 400, message: error.message || `Something Went Wrong` });
  }
};

const exportEmployeeExcel = async () => {
  try {
    // Get all employees with necessary data
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        emp_id: true,
        name: true,
        gender: true,
        pno: true,
        tno: true,
        mobile_no: true,
        email: true,
        department: { select: { name: true } },
        designation: { select: { name: true } },
        join_staff: true
      }
    });
    
    // Format data for excel export
    const formattedData = employees.map(emp => ({
      ID: emp.emp_id || emp.id,
      Name: emp.name,
      Gender: emp.gender,
      'PNo': emp.pno,
      'TNo': emp.tno || '',
      'Mobile': emp.mobile_no,
      'Email': emp.email || '',
      'Department': emp.department?.name || '',
      'Designation': emp.designation?.name || '',
      'Join Date': emp.join_staff ? emp.join_staff.toLocaleDateString() : ''
    }));
    
    // Save to Excel
    const filePath = saveExcel(formattedData, `Employee-List-${Date.now()}`, 'Employees', 'employee');
    
    return { fileName: filePath };
  } catch (error) {
    console.error("Error exporting employee data to Excel:", error);
    throw ({ status: 400, message: `Error exporting data` });
  }
};

const getEmployeeMini = async (req) => {
  try {
    const pno_tno_name = req.query.emp_code || '';
    const whereClause = buildEmployeeCodeSearchClause(pno_tno_name);
    
    const employees = await prisma.employee.findMany({
      where: whereClause,
      select: {
        id: true,
        pno: true,
        tno: true,
        name: true,
        department_id: true,
        department: {
          select: {
            id: true,
            code: true,
            name: true
          }
        }
      }
    });
    
    return employees;
  } catch (error) {
    console.error("Error fetching mini employee list:", error);
    throw ({ status: 400, message: `Something Went Wrong` });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  getEmployeeDetails,
  updateEmployee,
  deleteEmployee,
  exportEmployeeExcel,
  getEmployeeMini
};