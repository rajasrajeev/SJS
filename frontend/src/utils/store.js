import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';
import permissionSlice from '../features/permissionSlice';
import branchSlice from '../features/branchSlice';
import locationSlice from '../features/locationSlice';
import staffSliceLocal from '../features/staffSliceLocal';
import departmentSlice from '../features/departmentSlice';
import designationSlice from '../features/designationSlice';
import shiftSlice from '../features/shiftSlice';
import leaveSlice from '../features/leaveSlice';
import deductionMasterSlice from '../features/deductionMasterSlice';
import earningSlice from '../features/earningSlice';
import firmSlice from '../features/firmSlice';
import employeeSlice from '../features/employeeSlice';
import deductionMasterMasterSlice from '../features/deductionSlice';
import daSlice from '../features/daSlice';
import nightSlice from '../features/nightSlice';
import overtimeSlice from '../features/overtimeSlice';
import pfSlice from '../features/pfSlice';
import esiSlice from '../features/esiSlice';
import monthReducer from '../features/monthSlice';
import monthlyDeductionReducer from '../features/monthlyDeductionSlice';
import advanceDeductionReducer from '../features/advanceDeductionSlice';
import attendanceReducer from '../features/attendanceSlice';
import earningsMonthlyReducer from '../features/earningsMonthlySlice';


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    menu: permissionSlice.reducer,
    branch: branchSlice.reducer,
    location: locationSlice.reducer,
    staffLocal: staffSliceLocal.reducer,
    department: departmentSlice.reducer,
    designation: designationSlice.reducer,
    shift: shiftSlice.reducer,
    leave: leaveSlice.reducer,
    deduction: deductionMasterSlice.reducer,
    earning: earningSlice.reducer,
    firm: firmSlice.reducer,
    employee: employeeSlice.reducer,
    deductionMain: deductionMasterMasterSlice.reducer,
    earningsMonthly: earningsMonthlyReducer,
    da: daSlice.reducer,
    night: nightSlice.reducer,
    overtime: overtimeSlice.reducer,
    pf: pfSlice.reducer,
    esi: esiSlice.reducer,
    month: monthReducer,
    monthlyDeduction: monthlyDeductionReducer,
    advanceDeduction: advanceDeductionReducer,
    attendance: attendanceReducer,
  },
});


export default store;
