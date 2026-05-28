const branchSchema = require("../schemas/branch.schema");
const firmStaffSchema = require("../schemas/firm_staff.schema");
const loginSchema = require("../schemas/login.schema");
const errorFunction = require("./schema_error.util");


const firmStaffValidation = async (req, res, next) => {
	const { error } = firmStaffSchema.validate(req.body);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in payload : ${error.message}`)
		);
	} else {
		next();
	}
};

const loginValidation = async (req, res, next) => {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in payload : ${error.message}`)
		);
	} else {
		next();
	}
};

const branchValidation = async (req, res, next) => {
	const { error } = branchSchema.validate(req.body);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in payload : ${error.message}`)
		);
	} else {
		next();
	}
};

module.exports = { 
	firmStaffValidation, 
	loginValidation, 
	branchValidation 
};