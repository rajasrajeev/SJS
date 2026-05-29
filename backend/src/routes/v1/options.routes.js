const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');

const {
  getDeductionTypeOptions,
  getDeductionCategoryOptions,
  getMonthsOptions,
  getFirmStatusOptions,
  getFirmTypeOptions,
} = require('../../controllers/options.controller');


const router = express.Router();

module.exports = (app) => {
  router.get('/deduction-types', userAuth, getDeductionTypeOptions);
  router.get('/deduction-categories', userAuth, getDeductionCategoryOptions);
  router.get('/months', userAuth, getMonthsOptions);

  router.get('/firm-status', userAuth, getFirmStatusOptions);
  router.get('/firm-type', userAuth, getFirmTypeOptions);

  app.use('/api/v1/options', router);
};


