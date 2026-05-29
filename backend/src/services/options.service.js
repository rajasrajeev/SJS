// Options for frontend dropdowns.
// These are derived from Prisma enum values where applicable.
// If you later add new enums/categories, update this mapping.

const listDeductionTypes = async () => {
  // Prisma enum DeductionType: Master | Monthly | Advance
  return [
    { id: 'Master', name: 'Master' },
    { id: 'Monthly', name: 'Monthly' },
    { id: 'Advance', name: 'Advance' },
  ];
};

const listDeductionCategories = async () => {
  // Prisma enum DeductionCategory values (raw ids):
  // FULLWITHOUTUNRECOVER, FULLWITHUNRECOVER, POSSIBLEWITHOUTUNRECOVER, POSSIBLEWITHUNRECOVER,
  // MONTHLYSETTINGWITHOUTUNRECOVER, CHARTWITHOUTINTEREST, CHARTWITHINTEREST
  const mapping = {
    FULLWITHOUTUNRECOVER: 'Deduct full amount without unrecover',
    FULLWITHUNRECOVER: 'Deduct full amount with unrecover',
    POSSIBLEWITHOUTUNRECOVER: 'Deduct possible amount without unrecover',
    POSSIBLEWITHUNRECOVER: 'Deduct possible amount with unrecover',
    MONTHLYSETTINGWITHOUTUNRECOVER: 'Deduct as per monthly setting without unrecover',
    CHARTWITHOUTINTEREST: 'Deduct as per chart without interest',
    CHARTWITHINTEREST: 'Deduct as per chart with interest',
  };

  return Object.keys(mapping).map((key) => ({ id: key, name: mapping[key] }));
};

const listMonths = async () => {
  // Frontend currently expects month objects like {id:'January', name:'January', days:?}
  return [
    { id: 'January', name: 'January', days: 31 },
    { id: 'February', name: 'February', days: 28 },
    { id: 'March', name: 'March', days: 31 },
    { id: 'April', name: 'April', days: 30 },
    { id: 'May', name: 'May', days: 31 },
    { id: 'June', name: 'June', days: 30 },
    { id: 'July', name: 'July', days: 31 },
    { id: 'August', name: 'August', days: 31 },
    { id: 'September', name: 'September', days: 30 },
    { id: 'October', name: 'October', days: 31 },
    { id: 'November', name: 'November', days: 30 },
    { id: 'December', name: 'December', days: 31 },
  ];
};

const listFirmStatusOptions = async () => {
  // Prisma enum FirmStatus: PROPRIETOR | PARTNERSHIP | COMPANY | OTHER
  return [
    { id: 'PROPRIETOR', name: 'Proprietor' },
    { id: 'PARTNERSHIP', name: 'Partnership' },
    { id: 'COMPANY', name: 'Company' },
    { id: 'OTHER', name: 'Others' },
  ];
};

const listFirmTypeOptions = async () => {
  // Prisma enum FirmType: SHOP | FAB | OTHER
  return [
    { id: 'SHOP', name: 'Shop' },
    { id: 'FAB', name: 'Fab' },
    { id: 'OTHER', name: 'Others' },
  ];
};

module.exports = {
  listDeductionTypes,
  listDeductionCategories,
  listMonths,
  listFirmStatusOptions,
  listFirmTypeOptions,
};



