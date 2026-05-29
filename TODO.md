# TODO - Earnings/Deduction/Attendance Backend+Frontend

## Attendance (already partially done)
- [ ] Ensure Prisma models exist + correct migrations for MonthlyManualAttendanceHeader/Day
- [ ] Wire attendance frontend submit to backend `/api/v1/attendance/manual-monthly`
- [ ] Verify attendance table loads from backend

## Earnings: Firm Master -> Monthly Processing (required)
- [ ] Update `backend/prisma/schema.prisma` to add:
  - [ ] `EarningMonthlyMaster`
  - [ ] `EarningEmployeeMonthlyMaster`
  - [ ] `EarningMonthlyMonthly`
  - [ ] `EarningEmployeeMonthlyMonthly`
  - [ ] Add relation fields on `Employee` for reverse relations
- [ ] Create migration folder (run `prisma migrate` on server)
- [ ] Implement backend service/controller/routes for earnings master & monthly:
  - [ ] POST `/api/v1/earnings/monthly-master`
  - [ ] GET `/api/v1/earnings/monthly-master?month=&year=`
  - [ ] POST `/api/v1/earnings/monthly`
- [ ] Implement frontend redux thunks:
  - [ ] fetch monthly master/monthly entries
  - [ ] create/update monthly
- [ ] Update earnings UI:
  - [ ] MasterEarningModal: select earning -> auto-fill amount; add employees rows
  - [ ] MonthlyEarnings: load by month/year and allow processing only when employees exist

## Deduction UI consistency
- [ ] Ensure deduction master modal auto-fills amount and employee rows already match existing backend
- [ ] Ensure monthly deduction loads/creates based on month/year and existing employee entries

