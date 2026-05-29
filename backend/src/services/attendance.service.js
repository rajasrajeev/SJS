const { prisma } = require('../utils/prisma');

const parseMonthYear = (month, year) => {
  if (!month || !year) return null;
  const monthIndexMap = {
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

  const mi = monthIndexMap[String(month).toLowerCase()];
  if (mi === undefined) return null;
  const y = parseInt(year, 10);
  if (Number.isNaN(y)) return null;

  // Keep consistent with other code in repo: Date range for month.
  const start = new Date(y, mi, 1);
  const end = new Date(y, mi + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

// attendanceData from frontend:
// {
//   month: 'January',
//   year: 2026,
//   attendanceData: [{ tno, name, days: ['P','A',...], ...totals }]
// }
// We will persist per day under a monthly record.

const getMonthlyManualAttendance = async (query) => {
  const { month, year } = query;
  const range = parseMonthYear(month, year);

  if (!range) {
    return { month, year, data: [] };
  }

  // Persist format (new prisma models expected):
  // MonthlyManualAttendanceHeader + MonthlyManualAttendanceDay
  // If models are missing, we fallback to returning employees with default P for requested days.

  const employees = await prisma.employee.findMany({
    where: { active: true },
    select: {
      id: true,
      emp_id: true,
      tno: true,
      name: true,
      branch_id: true,
      department_id: true,
    },
  }).catch(() => []);


  // If attendance tables aren't present in schema, service will throw.
  try {
    const header = await prisma.monthlyManualAttendanceHeader.findFirst({
      where: {
        month: { gte: range.start, lte: range.end },
      },
      include: {
        days: true,
      },
    });

    const daysCount = Array.from({ length: new Date(range.start.getFullYear(), range.start.getMonth() + 1, 0).getDate() }).length;

    const byEmp = new Map();
    for (const emp of employees) {
      byEmp.set(emp.id, {
        tno: emp.tno,
        name: emp.name,
        days: Array.from({ length: daysCount }, () => 'P'),
      });
    }

    if (header) {
      for (const d of header.days) {
        const empEntry = byEmp.get(d.employee_id);
        if (!empEntry) continue;
        if (d.day_no >= 1 && d.day_no <= daysCount) {
          empEntry.days[d.day_no - 1] = d.status_code;
        }
      }
    }

    return {
      month,
      year: parseInt(year, 10),
      data: Array.from(byEmp.values()),
    };
  } catch (e) {
    // Fallback: return empty data
    return { month, year: parseInt(year, 10), data: [] };
  }
};

const upsertMonthlyManualAttendance = async (body) => {
  const { month, year, attendanceData } = body;

  const range = parseMonthYear(month, year);
  if (!range) {
    throw { status: 400, message: 'Invalid month/year' };
  }
  if (!Array.isArray(attendanceData)) {
    throw { status: 400, message: 'attendanceData must be an array' };
  }

  // Determine days in the month
  const daysCount = new Date(range.start.getFullYear(), range.start.getMonth() + 1, 0).getDate();

  // Upsert header
  try {
    const header = await (async () => {
      // Prefer explicit findFirst + create if unique composite index is not defined.
      const existing = await prisma.monthlyManualAttendanceHeader.findFirst({
        where: {
          month: { gte: range.start, lte: range.end },
          year: parseInt(year, 10),
        },
      });
      if (existing) return existing;
      return prisma.monthlyManualAttendanceHeader.create({
        data: {
          month: range.start,
          year: parseInt(year, 10),
        },
      });
    })();


    // Remove existing day rows for that header
    await prisma.monthlyManualAttendanceDay.deleteMany({
      where: { monthly_manual_attendance_header_id: header.id },
    });

    const employeeMap = new Map();
    // We need employee_id from tno/emp_id in frontend.
    // Try by tno first.
    const tnos = attendanceData.map((r) => r.tno).filter(Boolean);
    const emps = await prisma.employee.findMany({
      where: { tno: { in: tnos } },
      select: { id: true, tno: true, emp_id: true },
    });
    for (const e of emps) employeeMap.set(e.tno, e.id);

    const createRows = [];
    for (const row of attendanceData) {
      const employeeId = employeeMap.get(row.tno);
      if (!employeeId) continue;

      const days = Array.isArray(row.days) ? row.days : [];
      for (let i = 0; i < Math.min(daysCount, days.length); i++) {
        const status = days[i];
        createRows.push({
          monthly_manual_attendance_header_id: header.id,
          employee_id: employeeId,
          day_no: i + 1,
          status_code: status || 'P',
        });
      }
    }

    if (createRows.length) {
      await prisma.monthlyManualAttendanceDay.createMany({ data: createRows });
    }

    return { status: 'ok', headerId: header.id };
  } catch (e) {
    // If prisma models not available, surface a helpful error.
    throw {
      status: 500,
      message:
        'Attendance persistence models not found in Prisma schema. Create monthlyManualAttendanceHeader and monthlyManualAttendanceDay models + migration.',
    };
  }
};

module.exports = {
  getMonthlyManualAttendance,
  upsertMonthlyManualAttendance,
};

