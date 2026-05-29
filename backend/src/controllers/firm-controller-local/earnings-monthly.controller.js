const {
  getEarningMonthlyMasterService,
  getEarningMonthlyMasterDetailsService,
  createEarningMonthlyMasterService,
  updateEarningMonthlyMasterService,
  deleteEarningMonthlyMasterService,

  getEarningMonthlyService,
  getEarningMonthlyDetailsService,
  createEarningMonthlyService,
  updateEarningMonthlyService,
  deleteEarningMonthlyService,
} = require('../../services/firm-service-local/earnings-monthly.service');


// Monthly Master (firm-side)
const getEarningMonthlyMasterList = async (req, res, next) => {
  try {
    const data = await getEarningMonthlyMasterService(req.query);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const getEarningMonthlyMasterDetails = async (req, res, next) => {
  try {
    const data = await getEarningMonthlyMasterDetailsService(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const createEarningMonthlyMaster = async (req, res, next) => {
  try {
    const data = await createEarningMonthlyMasterService(req.body);
    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

const updateEarningMonthlyMaster = async (req, res, next) => {
  try {
    const data = await updateEarningMonthlyMasterService(req.params.id, req.body);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const deleteEarningMonthlyMaster = async (req, res, next) => {
  try {
    const data = await deleteEarningMonthlyMasterService(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

// Monthly processed entries
const getEarningMonthlyList = async (req, res, next) => {
  try {
    const data = await getEarningMonthlyService(req.query);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const getEarningMonthlyDetails = async (req, res, next) => {
  try {
    const data = await getEarningMonthlyDetailsService(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const createEarningMonthly = async (req, res, next) => {
  try {
    const data = await createEarningMonthlyService(req.body);
    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
};

const updateEarningMonthly = async (req, res, next) => {
  try {
    const data = await updateEarningMonthlyService(req.params.id, req.body);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const deleteEarningMonthly = async (req, res, next) => {
  try {
    const data = await deleteEarningMonthlyService(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEarningMonthlyMasterList,
  getEarningMonthlyMasterDetails,
  createEarningMonthlyMaster,
  updateEarningMonthlyMaster,
  deleteEarningMonthlyMaster,

  getEarningMonthlyList,
  getEarningMonthlyDetails,
  createEarningMonthly,
  updateEarningMonthly,
  deleteEarningMonthly,
};

