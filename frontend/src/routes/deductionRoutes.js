import React from 'react'
import { Route } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout'
import MasterDeduction from '../pages/deduction/MasterDeduction';
import MonthlyDeduction from '../pages/deduction/MonthlyDeduction';
import AdvanceDeduction from '../pages/deduction/AdvanceDeduction';


const deductionRoutes = (
  <Route path="/firm-dashboard" element={<DashboardLayout />}>
    <Route path="/firm-dashboard/deduction/master-deduction" element={<MasterDeduction/>}/>
    <Route path="/firm-dashboard/deduction/monthly-deduction" element={<MonthlyDeduction/>}/>
    <Route path="/firm-dashboard/deduction/advance-deduction" element={<AdvanceDeduction/>}/>
  </Route>
)

export default deductionRoutes