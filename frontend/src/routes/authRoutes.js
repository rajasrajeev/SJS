import { Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import NewPassword from "../pages/auth/NewPassword";
import PasswordResetSuccess from "../pages/auth/PasswordResetSuccess";
import PasswordResetEmail from "../pages/auth/PasswordResetEmail";
import ResetOtp from "../pages/auth/ResetOtp";

const authRoutes = (
  <Route path="/" element={<AuthLayout />}>
    <Route index element={<Login/>} />
    <Route path="/reset-password-email" element={<PasswordResetEmail/>}/>
    <Route path="/verify-otp" element={<ResetOtp/>}/>
    <Route path="/reset-password" element={<NewPassword/>} />
    <Route path="/reset-success" element={<PasswordResetSuccess/>} />
  </Route>
);

export default authRoutes;