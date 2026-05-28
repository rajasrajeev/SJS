import React from 'react'
import { Route } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout'
import PromotionWages from '../pages/firm/process/PromotionWages';
import NightAllowance from '../pages/firm/process/NightAllowance';
import SalaryAdvance from '../pages/firm/process/SalaryAdvance';
import OverTimeWages from '../pages/firm/process/OverTimeWages';
import Processing from '../pages/firm/process/Processing';

const processRoutes = (
  <Route path="/firm-dashboard" element={<DashboardLayout />}>
    <Route path="/firm-dashboard/process/promotion-wages" element={<PromotionWages/>}/>
    <Route path="/firm-dashboard/process/night-allowance" element={<NightAllowance/>}/>
    <Route path="/firm-dashboard/process/salary-advance" element={<SalaryAdvance/>}/>
    <Route path="/firm-dashboard/process/over-time-wages" element={<OverTimeWages/>}/>
    <Route path="/firm-dashboard/process/processing" element={<Processing/>}/>

  </Route>
)

export default processRoutes