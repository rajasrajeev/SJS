import React from 'react'
import { Route } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout'
import ShopDa from '../pages/da/ShopDa';
import FabDa from '../pages/da/FabDa';
import IDa from '../pages/da/IDa';

const daRoutes = (
  <Route path="/firm-dashboard" element={<DashboardLayout />}>
    <Route path="/firm-dashboard/da/shop" element={<ShopDa/>}/>
    <Route path="/firm-dashboard/da/fab" element={<FabDa/>}/>
    <Route path="/firm-dashboard/da/ida" element={<IDa/>}/>
  </Route>
)

export default daRoutes