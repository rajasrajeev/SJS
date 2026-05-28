import React from "react";
import "./Footer.scss";
import { useLocation } from "react-router-dom";


const Footer = () => {
  const location = useLocation();
// List of paths where the footer should be hidden
  const hiddenPaths = ["/firm-dashboard/add-staff","/firm-dashboard/profile-update","/firm-dashboard/employee-master"];
// Check if the current path is in the hiddenPaths list
  const shouldHideFooter = hiddenPaths.includes(location.pathname);
  return (
    !shouldHideFooter && (
    <footer className="footer bg-light text-center py-3">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} SJS Consultancy. All Rights Reserved.
      </p>
    </footer>
    )
  );
};

export default Footer;
