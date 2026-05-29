const { prisma } = require('../../utils/prisma');

const getMonthDateRange = (monthName, year = new Date().getFullYear()) => {
  const months = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  const monthIndex = months[String(monthName || '').toLowerCase()];
  if (monthIndex === undefined) return null;

  const start = new Date(year, monthIndex, 1);
  const end = new Date(year, monthIndex + 1, 0, 23, 59, 59);

  return { start, end };
};

const buildWhere = (query, modelType) => {
  // modelType: 'master' | 'monthly'
  const where = { AND: [] };

  if (query.month) {
    const range = getMonthDateRange(query.month, query.year);
    if (range) where.AND.push({ month: { gte: range.start, lte: range.end } });
  }

  if (query.earning_id) {
    where.AND.push({ earning_id: { equals: parseInt(query.earning_id) } });
  }

  if (query.branch_id) {
    where.AND.push({ branch_id: { equals: parseInt(query.branch_id) } });
  }

  if (query.department_id) {
    where.AND.push({ department_id: { equals: parseInt(query.department_id) } });
  }

  return where.AND.length ? where : undefined;
};

// --------------------
// EarningMonthlyMaster
// --------------------
const getEarningMonthlyMasterService = async (query) => {
  const where = buildWhere(query, 'master');
  const page = parseInt(query.page || '1', 10);
  const perPage = parseInt(query.perPage || '10', 10);

  const data = await prisma.earningMonthlyMaster.findMany({
    where,
    orderBy: { month: 'desc' },
    skip: (page - 1) * perPage,
    take: perPage,
    include: {
      earning: { select: { id: true, name: true, code: true, acc_code: true, type: true } },
      branch: { select: { id: true, name: true } },
      department: { select: { id: true, name: true, code: true } },
      employees: {
        include: { employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } } },
      },
    },
  });

  const total = await prisma.earningMonthlyMaster.count({ where });
  return { data, meta: { total, page, perPage } };
};

const getEarningMonthlyMasterDetailsService = async (id) => {
  const rec = await prisma.earningMonthlyMaster.findFirst({
    where: { id: parseInt(id) },
    include: {
      earning: { select: { id: true, name: true, code: true, acc_code: true, type: true } },
      branch: { select: { id: true, name: true } },
      department: { select: { id: true, name: true, code: true } },
      employees: {
        include: { employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true, department_id: true } } },
      },
    },
  });

  if (!rec) throw { status: 404, message: 'No Record Found!!!' };
  return rec;
};

const createEarningMonthlyMasterService = async (body) => {
  // body expected:
  // { earning_id, branch_id?, department_id?, month, year?, employees:[{emp_id, earning_amt}] }
  const monthDate = getMonthDateRange(body.month, body.year || new Date().getFullYear());
  if (!monthDate) throw { status: 400, message: 'Invalid month/year' };

  const header = await prisma.earningMonthlyMaster.create({
    data: {
      earning_id: parseInt(body.earning_id),
      branch_id: body.branch_id ? parseInt(body.branch_id) : null,
      department_id: body.department_id ? parseInt(body.department_id) : null,
      month: monthDate.start,
      unwanted: !!body.unwanted,
      employees: {
        create: (body.employees || []).map((e) => ({
          emp_id: parseInt(e.emp_id),
          earning_amt: parseFloat(e.earning_amt || body.earning_amt || 0),
        })),
      },
    },
    include: {
      earning: true,
      branch: true,
      department: true,
      employees: { include: { employee: true } },
    },
  });

  return header;
};

const updateEarningMonthlyMasterService = async (id, body) => {
  const monthDate = getMonthDateRange(body.month, body.year || new Date().getFullYear());
  if (!monthDate) throw { status: 400, message: 'Invalid month/year' };

  const existing = await prisma.earningMonthlyMaster.findUnique({ where: { id: parseInt(id) } });
  if (!existing) throw { status: 404, message: 'Record not found' };

  await prisma.earningEmployeeMonthlyMaster.deleteMany({
    where: { earning_monthly_master_id: parseInt(id) },
  });

  const rec = await prisma.earningMonthlyMaster.update({
    where: { id: parseInt(id) },
    data: {
      earning_id: parseInt(body.earning_id),
      branch_id: body.branch_id ? parseInt(body.branch_id) : null,
      department_id: body.department_id ? parseInt(body.department_id) : null,
      month: monthDate.start,
      unwanted: !!body.unwanted,
      employees: {
        create: (body.employees || []).map((e) => ({
          emp_id: parseInt(e.emp_id),
          earning_amt: parseFloat(e.earning_amt || body.earning_amt || 0),
        })),
      },
    },
    include: {
      earning: true,
      branch: true,
      department: true,
      employees: { include: { employee: true } },
    },
  });

  return rec;
};

const deleteEarningMonthlyMasterService = async (id) => {
  const rec = await prisma.earningMonthlyMaster.delete({ where: { id: parseInt(id) } });
  return rec;
};

// --------------------
// EarningMonthlyMonthly
// --------------------
const getEarningMonthlyService = async (query) => {
  const where = buildWhere(query, 'monthly');
  const page = parseInt(query.page || '1', 10);
  const perPage = parseInt(query.perPage || '10', 10);

  const data = await prisma.earningMonthlyMonthly.findMany({
    where,
    orderBy: { month: 'desc' },
    skip: (page - 1) * perPage,
    take: perPage,
    include: {
      earning: { select: { id: true, name: true, code: true, acc_code: true, type: true } },
      branch: { select: { id: true, name: true } },
      department: { select: { id: true, name: true, code: true } },
      employees: {
        include: { employee: { select: { id: true, name: true, emp_id: true, pno: true, tno: true } } },
      },
    },
  });

  const total = await prisma.earningMonthlyMonthly.count({ where });
  return { data, meta: { total, page, perPage } };
};

const getEarningMonthlyDetailsService = async (id) => {
  const rec = await prisma.earningMonthlyMonthly.findFirst({
    where: { id: parseInt(id) },
    include: {
      earning: true,
      branch: true,
      department: true,
      employees: { include: { employee: true } },
    },
  });

  if (!rec) throw { status: 404, message: 'No Record Found!!!' };
  return rec;
};

const createEarningMonthlyService = async (body) => {
  // Process only employees that exist in EarningMonthlyMaster for given earning_id + month/year.
  const monthDate = getMonthDateRange(body.month, body.year || new Date().getFullYear());
  if (!monthDate) throw { status: 400, message: 'Invalid month/year' };

  const master = await prisma.earningMonthlyMaster.findFirst({
    where: {
      earning_id: parseInt(body.earning_id),
      month: { gte: monthDate.start, lte: monthDate.start },
    },
    include: { employees: true },
  });

  if (!master) {
    // If no master employees exists for that month, do nothing.
    return { status: 'skipped', reason: 'No earning master employees for this month' };
  }

  const created = await prisma.earningMonthlyMonthly.create({
    data: {
      earning_id: parseInt(body.earning_id),
      branch_id: master.branch_id,
      department_id: master.department_id,
      month: monthDate.start,
      employees: {
        create: master.employees.map((r) => ({
          emp_id: r.emp_id,
          earning_amt: r.earning_amt,
        })),
      },
    },
    include: {
      earning: true,
      branch: true,
      department: true,
      employees: { include: { employee: true } },
    },
  });

  return created;
};

const updateEarningMonthlyService = async (id, body) => {
  // Simple update: wipe and recreate employee rows based on provided rows.
  // You can later align with master processing behavior.
  const existing = await prisma.earningMonthlyMonthly.findUnique({ where: { id: parseInt(id) } });
  if (!existing) throw { status: 404, message: 'Record not found' };

  const monthDate = getMonthDateRange(body.month, body.year || new Date().getFullYear());
  if (!monthDate) throw { status: 400, message: 'Invalid month/year' };

  await prisma.earningEmployeeMonthlyMonthly.deleteMany({
    where: { earning_monthly_monthly_id: parseInt(id) },
  });

  const rec = await prisma.earningMonthlyMonthly.update({
    where: { id: parseInt(id) },
    data: {
      earning_id: parseInt(body.earning_id),
      branch_id: body.branch_id ? parseInt(body.branch_id) : null,
      department_id: body.department_id ? parseInt(body.department_id) : null,
      month: monthDate.start,
      employees: {
        create: (body.employees || []).map((e) => ({
          emp_id: parseInt(e.emp_id),
          earning_amt: parseFloat(e.earning_amt || 0),
        })),
      },
    },
    include: {
      earning: true,
      branch: true,
      department: true,
      employees: { include: { employee: true } },
    },
  });

  return rec;
};

const deleteEarningMonthlyService = async (id) => {
  const rec = await prisma.earningMonthlyMonthly.delete({ where: { id: parseInt(id) } });
  return rec;
};

module.exports = {
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
};

