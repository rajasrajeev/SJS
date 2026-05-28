import React from 'react'
import { Route } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout'
import Abstract from '../pages/abstract/Abstract';
import AllAbstract from '../pages/abstract/AllAbstract';
import DepartmentAbstract from '../pages/abstract/DepartmentAbstract';

const abstractRoutes = (
  <Route path="/firm-dashboard" element={<DashboardLayout />}>
    <Route path="/firm-dashboard/abstract" element={<Abstract/>}/>
    <Route path="/firm-dashboard/abstract/all-abstract" element={<AllAbstract/>}/>
    <Route path="/firm-dashboard/abstract/department-abstract" element={<DepartmentAbstract/>}/>
  </Route>
)

export default abstractRoutes