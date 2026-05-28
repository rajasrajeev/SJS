const Joi = require('joi');

// Base schemas for reusable parts
const addressSchema = Joi.object({
  house_no: Joi.string().required(),
  house_name: Joi.string().required(),
  street_name: Joi.string().required(),
  place: Joi.string().required(),
  pincode: Joi.number().integer().required(),
  country_id: Joi.number().integer().required(),
  state_id: Joi.number().integer().required(),
  district_id: Joi.number().integer().optional().allow(null),
  is_permanent: Joi.boolean().default(false)
});

const bankSchema = Joi.object({
  bank_name: Joi.string().required(),
  branch_name: Joi.string().required(),
  ifsc: Joi.string().required(),
  account_no: Joi.string().required(),
  is_primary: Joi.boolean().default(false)
});

const licSchema = Joi.object({
  lic_no: Joi.string().required(),
  lic_amount: Joi.number().required(),
  is_primary: Joi.boolean().default(false)
});

const shiftSchema = Joi.object({
  shift_id: Joi.number().integer().required(),
  week_off: Joi.string().optional()
});

const wageSchema = Joi.object({
  basic1: Joi.number().required(),
  basic2: Joi.number().optional().allow(null),
  basic3: Joi.number().optional().allow(null),
  basic4: Joi.number().optional().allow(null),
  basic5: Joi.number().optional().allow(null).default(0),
  basic6: Joi.number().optional().allow(null).default(0),
  increment_percentage: Joi.number().optional().allow(null).default(0),
  increment_percentage_value: Joi.number().default(0),
  service_weightage: Joi.number().optional().allow(null).default(0),
  service_weightage_value: Joi.number().default(0),
  hra: Joi.number().optional().allow(null).default(0),
  hra_value: Joi.number().default(0),
  ltc: Joi.number().optional().allow(null).default(0),
  ltc_value: Joi.number().default(0),
  travel_allowance_percentage: Joi.number().default(0),
  travel_allowance_value: Joi.number().default(0),
  attendance_incentive: Joi.number().default(0),
  attendance_incentive_value: Joi.number().default(0),
  production_incentive: Joi.number().default(0),
  production_incentive_value: Joi.number().default(0),
  medical_allowance: Joi.number().default(0),
  medical_allowance_value: Joi.number().default(0),
  washing_allowance: Joi.number().default(0),
  washing_allowance_value: Joi.number().default(0),
  other_allowance: Joi.number().default(0),
  other_allowance_value: Joi.number().default(0),
  da_type: Joi.string().valid('Master', 'Monthly', 'Advance').optional().allow(null),
  da: Joi.number().optional().allow(null),
  fda: Joi.number().optional().allow(null),
  vda: Joi.number().optional().allow(null),
  salary: Joi.number().optional().allow(null)
});

const statutorySchema = Joi.object({
  is_pf: Joi.boolean().default(false),
  is_esic: Joi.boolean().default(false),
  uan_no: Joi.string().optional().allow(null),
  pf_no: Joi.string().optional().allow(null),
  pf_amount: Joi.number().optional().allow(null),
  vpf_percentage: Joi.number().optional().allow(null),
  esic_no: Joi.string().optional().allow(null),
  lwf: Joi.string().optional().allow(null),
  other: Joi.string().optional().allow(null)
});

const experienceSchema = Joi.object({
  firm_name: Joi.string().required(),
  place: Joi.string().required(), // Note: This was parsed as float in your code
  joining_date: Joi.date().required(),
  resigning_date: Joi.date().optional().allow(null),
  designation: Joi.string().required()
});

const qualificationSchema = Joi.object({
  qualification: Joi.string().required(),
  percentage: Joi.number().required(),
  year: Joi.number().required(),
  university: Joi.string().required() // Note: This was parsed as float in your code
});

// Main employee schema
const employeeSchema = Joi.object({
  emp_id: Joi.number().integer().optional().allow(null),
  branch_id: Joi.number().integer().optional().allow(null),
  pno: Joi.string().required(),
  tno: Joi.string().optional().allow(null, ''),
  name: Joi.string().required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
  dob: Joi.date().required(),
  blood_group: Joi.string().valid('APOSITIVE', 'ANEGATIVE', 'BPOSITIVE', 'BNEGATIVE', 'OPOSITIVE', 'ONEGATIVE', 'ABPOSITIVE', 'ABNEGATIVE').required(),
  religion: Joi.string().optional().allow(null, ''),
  age: Joi.number().integer().required(),
  father_name: Joi.string().required(),
  spouse_name: Joi.string().required(),
  nominee: Joi.string().required(),
  join_trainee: Joi.date().required(),
  join_staff: Joi.date().required(),
  department_id: Joi.number().integer().required(),
  designation_id: Joi.number().integer().required(),
  retire_date: Joi.date().required(),
  mobile_no: Joi.string().required(),
  active: Joi.boolean().default(true),
  retired: Joi.boolean().default(false),
  alt_mobile_no: Joi.string().optional().allow(null, ''),
  shiftTime: Joi.string().optional().allow(null, ''),
  workHours: Joi.string().optional().allow(null, ''),
  email: Joi.string().email().optional().allow(null, ''),
  photo: Joi.any().meta({ swaggerType: 'file' }).optional().allow(null), // For file upload
  employeeShift: shiftSchema.required(),
  employeeAddress: Joi.array().items(addressSchema).required(),
  employeeWage: wageSchema.required(),
  employeeCategory: Joi.object({
    salary_type: Joi.string().valid('MONTHLY', 'CONSOLIDATED', 'LABOUR', 'ADJUSTEDSALARY', 'MINIMUMTWENTYFIVEPERCENTSALARY').required()
  }).required(),
  employeeBank: Joi.array().items(bankSchema).optional(),
  employeeStatutory: statutorySchema.required(),
  employeeLic: Joi.array().items(licSchema).optional(),
  employeeExperience: Joi.array().items(experienceSchema).optional(),
  employeeQualification: Joi.array().items(qualificationSchema).optional()
});

module.exports = { employeeSchema };