import React from 'react'
import { Route } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout'
import MonthlyEarnings from '../pages/earnings/monthly-earnings/MonthlyEarnings';
import MasterEarnings from '../pages/earnings/master-earnings/MasterEarnings';

const earningRoutes = (
  <Route path="/firm-dashboard" element={<DashboardLayout />}>
    <Route path="/firm-dashboard/earnings/master-earnings" element={<MasterEarnings/>}/>
    <Route path="/firm-dashboard/earnings/monthly-earnings" element={<MonthlyEarnings/>}/>
  </Route>
)

export default earningRoutes