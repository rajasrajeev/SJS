import React from 'react'
import { Route } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/firm/Dashboard'
import AddStaff from '../pages/staff/AddStaff';
import StaffListView from '../pages/staff/StaffListView';
import AddBranch from '../pages/firm/branch/AddBranch';
import BranchList from '../pages/firm/branch/BranchList';
import EmployeeMaster from '../pages/firm/employee-master/EmployeeMaster';
import FirmProfileUpdate from '../pages/firm/firm-profile/FirmProfileUpdate';
import EmployeeMasterList from '../pages/firm/employee-master/EmployeeMasterList';
import AddLocation from '../pages/firm/location-master/AddLocation';
import DepartmentMaster from '../pages/firm/department/DepartmentMaster';
import DesignationMaster from '../pages/firm/designation/DesignationMaster';
import ShiftMaster from '../pages/firm/shift/ShiftMaster';
import LeaveMaster from '../pages/firm/leave/LeaveMaster';
import DeductionMaster from '../pages/firm/deduction/DeductionMaster';
import EarningMaster from '../pages/firm/earning/EarningMaster';
import AttendanceTable from '../pages/firm/attendance/AttendanceTable';
import ShopDaMaster from '../pages/firm/da/ShopDaMaster';
import Da from '../pages/firm/da/Da';
import FactoryDaMaster from '../pages/firm/da/FactoryDaMaster';
import OverTimeAllowance from '../pages/firm/allowance/OverTimeAllowance';
import NightTimeAllowance from '../pages/firm/allowance/NightTimeAllowance';
import Statutory from '../pages/firm/statutory-master/Statutory';
import AttendanceTableSingleEntry from '../pages/firm/attendance/AttendanceMonthlyEntry';
import AttendanceTableFNAN from '../pages/firm/attendance/AttendanceTableFNAN';
import AttendanceReport from '../pages/firm/attendance/AttendanceReport';
import Import from '../pages/firm/attendance/Import';
import AttendanceSingleEntry from '../pages/firm/attendance/AttendanceSingleEntry';
import AttendanceMonthlyEntry from '../pages/firm/attendance/AttendanceMonthlyEntry';


const firmRoutes = (
  <Route path="/firm-dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard/>} />

    <Route path="/firm-dashboard/add-staff" element={<AddStaff/>}/>
    <Route path="/firm-dashboard/staff-list" element={<StaffListView/>}/>

    <Route path="/firm-dashboard/add-branch" element={<AddBranch/>}/>
    <Route path="/firm-dashboard/edit-branch/:id" element={<AddBranch/>}/>
    <Route path="/firm-dashboard/branch-list" element={<BranchList/>}/>

    <Route path="/firm-dashboard/employee-master" element={<EmployeeMaster/>}/>
    <Route path="/firm-dashboard/edit-employee/:id" element={<EmployeeMaster />} />
    <Route path="/firm-dashboard/profile-update" element={<FirmProfileUpdate/>}/>
    <Route path="/firm-dashboard/employee-master-list" element={<EmployeeMasterList/>}/>

    <Route path="/firm-dashboard/add-location" element={<AddLocation/>}/>

    <Route path="/firm-dashboard/firm-department-add" element={<DepartmentMaster/>}/>
    <Route path="/firm-dashboard/firm-designation-add" element={<DesignationMaster/>}/>
    <Route path="/firm-dashboard/firm-deduction-add" element={<DeductionMaster/>}/>
    <Route path="/firm-dashboard/firm-earning-add" element={<EarningMaster/>}/>
    <Route path="/firm-dashboard/firm-shift-master" element={<ShiftMaster/>}/>
    <Route path="/firm-dashboard/firm-leave-master" element={<LeaveMaster/>}/>

    <Route path="/firm-dashboard/attendance-table" element={<AttendanceTable/>}/>
    <Route path="/firm-dashboard/attendance-single-entry" element={<AttendanceSingleEntry/>}/>
    <Route path="/firm-dashboard/attendance-monthly-entry" element={<AttendanceMonthlyEntry/>}/>
    <Route path="/firm-dashboard/attendance-FNAN" element={<AttendanceTableFNAN/>}/>
    <Route path="/firm-dashboard/attendance-report" element={<AttendanceReport/>}/>
    <Route path="/firm-dashboard/attendance-excel" element={<Import/>}/>

    <Route path="/firm-dashboard/firm-shopda-master" element={<ShopDaMaster/>}/>
    <Route path="/firm-dashboard/firm-factoryda-master" element={<FactoryDaMaster/>}/>
    <Route path="/firm-dashboard/firm-da" element={<Da/>}/>
    <Route path="/firm-dashboard/firm-over-time-allowance" element={<OverTimeAllowance/>}/>
    <Route path="/firm-dashboard/firm-night-allowance" element={<NightTimeAllowance/>}/>
    <Route path="/firm-dashboard/statutory" element={<Statutory/>}/>
  </Route>
)

export default firmRoutes