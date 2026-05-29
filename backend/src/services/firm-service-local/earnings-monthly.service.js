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
  console.log(Object.keys(prisma).filter(k => k.toLowerCase().includes('earning')));

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
  // Rule: master applies always; monthly should exist for payroll month.
  // So when creating/updating monthly, we always create employee rows for ALL employees
  // present in EarningMonthlyMaster for that earning_id (and matching scope), with
  // amount = master.amount if provided, else 0.

  const monthDate = getMonthDateRange(body.month, body.year || new Date().getFullYear());
  if (!monthDate) throw { status: 400, message: 'Invalid month/year' };

  const masters = await prisma.earningMonthlyMaster.findMany({
    where: {
      earning_id: parseInt(body.earning_id),
      ...(body.branch_id != null && {
        branch_id: parseInt(body.branch_id)
      }),

      ...(body.department_id != null && {
        department_id: parseInt(body.department_id)
      }),
      // master is month-independent for processing; use master rows as defined for employees
      // but keep date filter off
    },
    include: {
      employees: true,
    },
    orderBy: { id: 'desc' },
  });

  const employeesToCreate = (body.employees || []).map((e) => ({
    emp_id: parseInt(e.emp_id),
    earning_amt: parseFloat(e.earning_amt || 0),
  }));

  // Use branch/department from request if present; else fallback from first master
  const fallbackMaster = masters[0];

  const created = await prisma.earningMonthlyMonthly.create({
    data: {
      earning_id: parseInt(body.earning_id),
      branch_id: body.branch_id ? parseInt(body.branch_id) : fallbackMaster?.branch_id ?? null,
      department_id: body.department_id
        ? parseInt(body.department_id)
        : fallbackMaster?.department_id ?? null,
      month: monthDate.start,
      employees: {
        create: employeesToCreate,
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
  // Rule: master applies always; monthly should exist for payroll month.
  // For update: recreate employee rows for ALL employees present in EarningMonthlyMaster
  // for the given earning_id/scope, and set earning_amt = (payload override) else 0.

  const existing = await prisma.earningMonthlyMonthly.findUnique({ where: { id: parseInt(id) } });
  if (!existing) throw { status: 404, message: 'Record not found' };

  const monthDate = getMonthDateRange(body.month, body.year || new Date().getFullYear());
  if (!monthDate) throw { status: 400, message: 'Invalid month/year' };

  const masters = await prisma.earningMonthlyMaster.findMany({
    where: {
      earning_id: parseInt(body.earning_id),
      ...(body.branch_id ? { branch_id: parseInt(body.branch_id) } : { branch_id: null }),
      ...(body.department_id
        ? { department_id: parseInt(body.department_id) }
        : { department_id: null }),
    },
    include: { employees: true },
  });

  const empMapMaster = new Map();
  for (const m of masters) {
    for (const e of m.employees || []) {
      empMapMaster.set(e.emp_id, e.earning_amt);
    }
  }

  const payloadEmpMap = new Map();
  for (const e of body.employees || []) {
    if (e?.emp_id == null) continue;
    payloadEmpMap.set(parseInt(e.emp_id), parseFloat(e.earning_amt ?? 0));
  }

  const employeesToCreate = Array.from(empMapMaster.keys()).map((emp_id) => {
    const overrideAmt = payloadEmpMap.get(emp_id);
    return {
      emp_id: parseInt(emp_id),
      earning_amt: parseFloat(overrideAmt ?? 0),
    };
  });

  await prisma.earningEmployeeMonthlyMonthly.deleteMany({
    where: { earning_monthly_monthly_id: parseInt(id) },
  });

  const fallbackMaster = masters[0];

  const rec = await prisma.earningMonthlyMonthly.update({
    where: { id: parseInt(id) },
    data: {
      earning_id: parseInt(body.earning_id),
      branch_id: body.branch_id ? parseInt(body.branch_id) : fallbackMaster?.branch_id ?? null,
      department_id: body.department_id ? parseInt(body.department_id) : fallbackMaster?.department_id ?? null,
      month: monthDate.start,
      employees: {
        create: employeesToCreate,
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

