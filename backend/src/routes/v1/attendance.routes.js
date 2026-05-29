const express = require('express');
const { userAuth } = require('../../middlewares/auth.middleware');

const {
  upsertMonthlyManualAttendanceController,
  getMonthlyManualAttendanceController,
} = require('../../controllers/attendance.controller');

const router = express.Router();

module.exports = (app) => {
  router.get('/manual-monthly', userAuth, getMonthlyManualAttendanceController);
  router.post('/manual-monthly', userAuth, upsertMonthlyManualAttendanceController);

  app.use('/api/v1/attendance', router);
};

