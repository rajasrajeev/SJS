const {
  getMonthlyManualAttendance,
  upsertMonthlyManualAttendance,
} = require('../services/attendance.service');

const getMonthlyManualAttendanceController = async (req, res, next) => {
  try {
    const data = await getMonthlyManualAttendance(req.query);
    return res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const upsertMonthlyManualAttendanceController = async (req, res, next) => {
  try {
    const result = await upsertMonthlyManualAttendance(req.body);
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMonthlyManualAttendanceController,
  upsertMonthlyManualAttendanceController,
};

