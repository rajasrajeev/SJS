const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');

const {
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
} = require('../../controllers/firm-controller-local/earnings-monthly.controller');

const router = express.Router();

module.exports = (app) => {
  // Firm Master (EarningMonthlyMaster)
  router.get('/monthly-master', userAuth, getEarningMonthlyMasterList);
  router.get('/monthly-master/:id', userAuth, getEarningMonthlyMasterDetails);
  router.post('/monthly-master', userAuth, createEarningMonthlyMaster);
  router.patch('/monthly-master/:id', userAuth, updateEarningMonthlyMaster);
  router.delete('/monthly-master/:id', userAuth, deleteEarningMonthlyMaster);

  // Monthly processed entries (EarningMonthlyMonthly)
  router.get('/monthly', userAuth, getEarningMonthlyList);
  router.get('/monthly/:id', userAuth, getEarningMonthlyDetails);
  router.post('/monthly', userAuth, createEarningMonthly);
  router.patch('/monthly/:id', userAuth, updateEarningMonthly);
  router.delete('/monthly/:id', userAuth, deleteEarningMonthly);

  app.use('/api/v1/earnings', router);
};

