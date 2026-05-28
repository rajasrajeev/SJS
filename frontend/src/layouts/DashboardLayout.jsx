import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar-temp";
import "../layouts/DashboardLayout.scss";
import Footer from "../components/dashboard/Footer";

const DashboardLayout = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null); // State for submenu toggle
  const userId = JSON.parse(localStorage.getItem("user_id"));
  const notAuth = isNaN(parseInt(userId));

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    !notAuth ? (
      <div id="body-pd" className={`${showNavbar ? "body-pd" : ""}`}>
        {/* Header */}
        <Header showNavbar={showNavbar} toggleNavbar={toggleNavbar} />

        {/* Sidebar */}
        <Sidebar
          expandedMenu={expandedMenu}
          toggleSubmenu={toggleSubmenu}
          showNavbar={showNavbar}
        />

        {/* Main Content */}
        <div className="dash-board-body pt-1 pb-5 mb-5">
          <Outlet />
        </div>
        {/* Footer */}
        <Footer />
      </div>
    ) : (
      <Navigate to="/login" />
    )
  );
};

export default DashboardLayout;
