const {
  listDeductionTypes,
  listDeductionCategories,
  listMonths,
  listFirmStatusOptions,
  listFirmTypeOptions,
} = require('../services/options.service');


const getDeductionTypeOptions = async (req, res, next) => {
  try {
    const data = await listDeductionTypes();
    return res.status(200).send({ options: data });
  } catch (err) {
    next(err);
  }
};

const getDeductionCategoryOptions = async (req, res, next) => {
  try {
    const data = await listDeductionCategories();
    return res.status(200).send({ options: data });
  } catch (err) {
    next(err);
  }
};

const getMonthsOptions = async (req, res, next) => {
  try {
    const data = await listMonths();
    return res.status(200).send({ options: data });
  } catch (err) {
    next(err);
  }
};

const getFirmStatusOptions = async (req, res, next) => {
  try {
    const data = await listFirmStatusOptions();
    return res.status(200).send({ options: data });
  } catch (err) {
    next(err);
  }
};

const getFirmTypeOptions = async (req, res, next) => {
  try {
    const data = await listFirmTypeOptions();
    return res.status(200).send({ options: data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDeductionTypeOptions,
  getDeductionCategoryOptions,
  getMonthsOptions,
  getFirmStatusOptions,
  getFirmTypeOptions,
};



