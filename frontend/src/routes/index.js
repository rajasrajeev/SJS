import { Routes } from 'react-router-dom';
import history from '../utils/history';
import CustomRouter from '../utils/CustomRouter';
import authRoutes from './authRoutes';
// import AdminRoutes from './AdminRoutes';
import firmRoutes from './firmRoutes';
import deductionRoutes from './deductionRoutes';
// import daRoutes from './daRoutes';
import abstractRoutes from './abstractRoutes';
import processRoutes from './processRoutes';
import earningRoutes from './earningRoutes';

const AppRoutes = () => (
  <CustomRouter history={history}>
    <Routes>
      {authRoutes}
      {/* {AdminRoutes} */}
      {firmRoutes}
      {deductionRoutes}
      {/* {daRoutes} */}
      {abstractRoutes}
      {processRoutes}
      {earningRoutes}
    </Routes>
  </CustomRouter>
);

export default AppRoutes;
