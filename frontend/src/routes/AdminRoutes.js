import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Admin/Dashboard'
import { Route } from "react-router-dom";
import WorkspaceMod from '../pages/Admin/WorkspaceMod';

const AdminRoutes = (
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard/>} />
    <Route path="/dashboard/workspace-mod" element={<WorkspaceMod/>}/>
  </Route>
)

export default AdminRoutes