import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useDirection } from "../../hooks/useDirection"; // Import the direction context
import { getOwnModules } from "../../features/permissionSlice";
import {useLocation, Link } from "react-router-dom";
import "./Sidebar.scss";


const Sidebar = ({ expandedMenu, toggleSubmenu, showNavbar }) => {
  const { direction } = useDirection(); // Get the current direction from context
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // dispatch(getOwnModules());
  }, []);

  useEffect(() => {
    const bodyElement = document.querySelector('.dash-board-body');
    if (isOpen) {
      bodyElement.classList.remove('sidebar-closed');
    } else {
      bodyElement.classList.add('sidebar-closed');
    }
  }, [isOpen]);

  const signOut = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    if (isOpen) {
      toggleSubmenu(null); // Close any expanded submenu when collapsing the sidebar
    }
    setIsOpen(!isOpen);
  };

  const handleSubmenuClick = (menu) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    toggleSubmenu(menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`l-navbar ${isOpen ? "open" : "closed"}`}
      id="nav-bar"
      data-direction={direction} // Optional attribute for debugging
    >
      <nav className="nav">
        <div>
          <Link to="/firm-dashboard" className="nav_logo">
            <i className="bx bx-layer nav_logo-icon"></i>
            <span className="nav_logo-name">SJS Consultancy</span>
          </Link>
          <div className="nav_list">
          <div className="nav_item">
            <Link to="/firm-dashboard" className={`nav_link ${isActive("/firm-dashboard") ? "active" : ""}`}>
              <span className="nav-name">
                <i className="bx bx-grid-alt nav_icon"></i>
                Dashboard</span>
            </Link>
            </div>
            {/* Firm Master */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("firm-master")}
              >

                <span className="nav-name">
                <i className="bi bi-box-fill"></i>
                  Firm Master
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "firm-master"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "firm-master" ? "show" : ""}`}>
                 <Link to="/firm-dashboard/profile-update"  className={`nav_sublink ${isActive("/firm-dashboard/profile-update") ? "active" : ""}`}>
                  <i className="bi bi-person-fill"></i>
                  <span> Firm Profile</span>
                </Link>
                <Link to="/firm-dashboard/firm-department-add"  className={`nav_sublink ${isActive("/firm-dashboard/firm-department-add") ? "active" : ""}`}>
                  <i className="bi bi-briefcase-fill"></i>
                  <span> Firm Department</span>
                </Link>
                <Link to="/firm-dashboard/firm-designation-add"  className={`nav_sublink ${isActive("/firm-dashboard/firm-designation-add") ? "active" : ""}`}>
                  <i className="bi bi-person-badge-fill"></i>
                  <span> Firm Designation</span>
                </Link>
                <Link to="/firm-dashboard/firm-deduction-add"  className={`nav_sublink ${isActive("/firm-dashboard/firm-deduction-add") ? "active" : ""}`}>
                  <i className="bi bi-file-earmark-minus"></i>
                  <span> Firm Deduction</span>
                </Link>
                <Link to="/firm-dashboard/firm-earning-add"  className={`nav_sublink ${isActive("/firm-dashboard/firm-earning-add") ? "active" : ""}`}>
                  <i className="bi bi-graph-up"></i>
                  <span> Firm Earning</span>
                </Link>
                 <Link to="/firm-dashboard/firm-shift-master"  className={`nav_sublink ${isActive("/firm-dashboard/firm-shift-master") ? "active" : ""}`}>
                  <i className="bi bi-calendar-event nav_icon"></i>
                  <span>Add Shift</span>
                </Link>
                <Link to="/firm-dashboard/firm-leave-master"  className={`nav_sublink ${isActive("/firm-dashboard/firm-leave-master") ? "active" : ""}`}>
                  <i className="bi bi-person-dash nav_icon"></i>
                  <span>Add Leave</span>
                </Link>
                <Link to="/firm-dashboard/firm-shopda-master"  className={`nav_sublink ${isActive("/firm-dashboard/firm-shopda-master" ) ? "active" : ""}`}>
                  <i className="bi bi-person-dash nav_icon"></i>
                  <span>Shop DA Master</span>
                </Link>
                <Link to="/firm-dashboard/firm-factoryda-master"  className={`nav_sublink ${isActive("/firm-dashboard/firm-factoryda-master") ? "active" : ""}`}>
                  <i className="bi bi-person-dash nav_icon"></i>
                  <span>FAB DA Master</span>
                </Link>
                <Link to="/firm-dashboard/firm-da"  className={`nav_sublink ${isActive("/firm-dashboard/firm-da") ? "active" : ""}`}>
                  <i className="bi bi-person-dash nav_icon"></i>
                  <span>DA</span>
                </Link>
                <Link to="/firm-dashboard/firm-over-time-allowance"  className={`nav_sublink ${isActive("/firm-dashboard/firm-over-time-allowance") ? "active" : ""}`}>
                  <i className="bi bi-person-dash nav_icon"></i>
                  <span>Over Time</span>
                </Link>
                <Link to="/firm-dashboard/firm-night-allowance"  className={`nav_sublink ${isActive("/firm-dashboard/firm-night-allowance") ? "active" : ""}`}>
                  <i className="bi bi-person-dash nav_icon"></i>
                  <span>Night Allowance</span>
                </Link>
              </div>
            </div>
            {/* Staff */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("ca-staff")}
              >
                <span className="nav-name">
                  <i className="bx bx-user nav_icon"></i>
                  Staff Login
                </span>

                <span className="">

                  <i
                    className={`bx ${expandedMenu === "ca-staff"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "ca-staff" ? "show" : ""
                  }`}
              >
                <Link to="/firm-dashboard/staff-list"  className={`nav_sublink ${isActive("/firm-dashboard/staff-list") ? "active" : ""}`}>

                  <span>
                    <i className="bx bx-group nav_icon"></i>
                    Staff List</span>
                </Link>
                <Link to="/firm-dashboard/add-staff"  className={`nav_sublink ${isActive("/firm-dashboard/add-staff") ? "active" : ""}`}>
                  <i className="bx bx-user-plus nav_icon"></i>
                  <span>Add Staff</span>
                </Link>
              </div>
            </div>
            {/* Branch */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("branch")}
              >

                <span className="nav-name">
                  <i className="bx bx-network-chart nav_icon"></i>
                  Branch

                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "branch"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "branch" ? "show" : ""
                  }`}
              >
                <Link to="/firm-dashboard/branch-list" className={`nav_sublink ${isActive("/firm-dashboard/branch-list") ? "active" : ""}`}>
                  <i className="bx bx-cog nav_icon"></i>
                  <span>Branch List</span>
                </Link>
                <Link to="/firm-dashboard/add-branch"  className={`nav_sublink ${isActive("/firm-dashboard/add-branch") ? "active" : ""}`}>
                  <i className="bx bx-building-house nav_icon"></i>
                  <span>Add Branch</span>
                </Link>
              </div>
            </div>

            {/* Employee MAster */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("employee")}
              >

                <span className="nav-name">
                <i className="bx bx-user nav_icon"></i>
                  Employee

                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "employee"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "employee" ? "show" : ""
                  }`}
              >
                <Link to="/firm-dashboard/employee-master-list"  className={`nav_sublink ${isActive("/firm-dashboard/employee-master-list") ? "active" : ""}`}>
                  <i className="bx bx-cog nav_icon"></i>
                  <span> Employee List</span>
                </Link>
                <Link to="/firm-dashboard/employee-master"  className={`nav_sublink ${isActive("/firm-dashboard/employee-master") ? "active" : ""}`}>
                  <i className="bx bx-building-house nav_icon"></i>
                  <span>Add Employee</span>
                </Link>
              </div>
            </div>
            {/* Employee MAster End */}

            

            {/* Attendance Master */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("attendance-master")}
              >

                <span className="nav-name">
                <i className="bi bi-calendar-check-fill"></i>
                  Attendance
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "attendance-master"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "attendance-master" ? "show" : ""}`}>
                 {/* <Link to="/firm-dashboard/attendance-table"  className={`nav_sublink ${isActive("/firm-dashboard/attendance-table") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Manual </span>
                </Link> */}
                {/* <Link to="/firm-dashboard/attendance-table"  className={`nav_sublink ${isActive("/firm-dashboard/attendance-table") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> MustRoll</span>
                </Link>*/}
                
                {/* <Link to="/firm-dashboard/attendance-entry"  className={`nav_sublink ${isActive("/firm-dashboard/attendance-entry") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Monthly Entry</span>
                </Link>  */}
                <Link to="/firm-dashboard/attendance-single-entry"  className={`nav_sublink ${isActive("/firm-dashboard/attendance-single-entry") ? "active" : ""}`}>
                  <i className="bi bi-table"></i>
                  <span> Manual </span>
                </Link>
                <Link to="/firm-dashboard/attendance-excel" className={`nav_sublink ${isActive("/firm-dashboard/attendance-excel") ? "active" : ""}`}>
                  <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Import</span>
                </Link>
                {/* <Link to="/firm-dashboard/attendance-FNAN"  className={`nav_sublink ${isActive("/firm-dashboard/attendance-FNAN") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Attendance Marking with FN/AN</span>
                </Link>  */}
                <Link to="/firm-dashboard/attendance-report"  className={`nav_sublink ${isActive("/firm-dashboard/attendance-report") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Muster Roll</span>
                </Link> 
              </div>
            </div>

            {/* Deduction */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("deduction")}
              >

                <span className="nav-name">
                <i className="bi bi-calendar-check-fill"></i>
                  Deduction
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "deduction"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "deduction" ? "show" : ""}`}>
                 <Link to="/firm-dashboard/deduction/master-deduction"  className={`nav_sublink ${isActive("/firm-dashboard/deduction/master-deduction") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Master</span>
                </Link>
                <Link to="/firm-dashboard/deduction/monthly-deduction"  className={`nav_sublink ${isActive("/firm-dashboard/deduction/monthly-deduction") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Monthly</span>
                </Link>
                <Link to="/firm-dashboard/deduction/advance-deduction"  className={`nav_sublink ${isActive("/firm-dashboard/deduction/advance-deduction") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Advance</span>
                </Link>
              </div>
            </div>
 {/* Earnings */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("earnings")}
              >

                <span className="nav-name">
                <i className="bi bi-calendar-check-fill"></i>
                 Earnings
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "earnings"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "earnings" ? "show" : ""}`}>
                 <Link to="/firm-dashboard/earnings/master-earnings"  className={`nav_sublink ${isActive("/firm-dashboard/earnings/master-earnings") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Master Earnings</span>
                </Link>
                <Link to="/firm-dashboard/earnings/monthly-earnings"  className={`nav_sublink ${isActive("/firm-dashboard/earnings/monthly-earnings") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Monthly Earnings</span>
                </Link>
              </div>
            </div>

            {/* DA */}
            {/* <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("da")}
              >

                <span className="nav-name">
                <i className="bi bi-calendar-check-fill"></i>
                  DA
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "da"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "da" ? "show" : ""}`}>
                 <Link to="/firm-dashboard/da/shop"  className={`nav_sublink ${isActive("/firm-dashboard/da/shop") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Shop DA</span>
                </Link>
                <Link to="/firm-dashboard/da/fab"  className={`nav_sublink ${isActive("/firm-dashboard/da/fab") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> FAB DA</span>
                </Link>
                <Link to="/firm-dashboard/da/ida"  className={`nav_sublink ${isActive("/firm-dashboard/da/ida") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> I DA </span>
                </Link>
              </div>
            </div> */}

            {/* Process */}

            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("process")}
              >

                <span className="nav-name">
                <i className="bi bi-calendar-check-fill"></i>
                  PROCESS
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "process"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "process" ? "show" : ""}`}>
                 <Link to="/firm-dashboard/process/promotion-wages"  className={`nav_sublink ${isActive("/firm-dashboard/process/promotion-wages") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> Promotion Wages</span>
                </Link>
                <Link to="/firm-dashboard/process/night-allowance"  className={`nav_sublink ${isActive("/firm-dashboard/process/night-allowance") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Night Allowance</span>
                </Link>
                <Link to="/firm-dashboard/process/salary-advance"  className={`nav_sublink ${isActive("/firm-dashboard/process/salary-advance") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Salary Advance</span>
                </Link>
                <Link to="/firm-dashboard/process/over-time-wages"  className={`nav_sublink ${isActive("/firm-dashboard/process/over-time-wages") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Over Time Wages</span>
                </Link>
                <Link to="/firm-dashboard/process/processing"  className={`nav_sublink ${isActive("/firm-dashboard/process/processing") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Processing</span>
                </Link>
              </div>
            </div>

            {/* <Link to="/firm-dashboard/abstract" className={`nav_link ${isActive("/firm-dashboard/abstract") ? "active" : ""}`}>
              <span className="nav-name">
                <i className="bx bx-grid-alt nav_icon"></i>
                Abstract</span>
            </Link> */}
          {/* Abstract */}
            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("abstract")}
              >

                <span className="nav-name">
                <i className="bi bi-calendar-check-fill"></i>
                  Abstract
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "abstract"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "abstract" ? "show" : ""}`}>
                 <Link to="/firm-dashboard/abstract/all-abstract"  className={`nav_sublink ${isActive("/firm-dashboard/abstract/all-abstract") ? "active" : ""}`}>
                 <i className="bi bi-table"></i>
                  <span> All Abstract</span>
                </Link>
                <Link to="/firm-dashboard/abstract/department-abstract"  className={`nav_sublink ${isActive("/firm-dashboard/abstract/department-abstract") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> Department Abstract</span>
                </Link>
                {/* <Link to="/firm-dashboard/da/ida"  className={`nav_sublink ${isActive("/firm-dashboard/da/ida") ? "active" : ""}`}>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                  <span> I DA </span>
                </Link> */}
              </div>
            </div>

            <div className="nav_item">
              <div
                className="nav_link"
                onClick={() => handleSubmenuClick("settings")}
              >

                <span className="nav-name">
                <i className="bx bx-cog nav_icon"></i>
                  Settings
                </span>
                <span>
                  <i
                    className={`bx ${expandedMenu === "settings"
                      ? "bx-chevron-up"
                      : "bx-chevron-down"
                      }`}
                  ></i>
                </span>
              </div>
              <div
                className={`nav-submenu ${expandedMenu === "settings" ? "show" : ""}`}>
                 {/* <Link to="/firm-dashboard/profile-update"  className={`nav_sublink ${isActive("/firm-dashboard/profile-update") ? "active" : ""}`}>
                  <i className="bx bx-cog nav_icon"></i>
                  <span> Firm Profile</span>
                </Link> */}
                <Link to="/firm-dashboard/add-location"  className={`nav_sublink ${isActive("/firm-dashboard/add-location") ? "active" : ""}`}>
                  <i className="bx bx-building-house nav_icon"></i>
                  <span>Add Location</span>
                </Link>
                <Link to="/firm-dashboard/statutory"  className={`nav_sublink ${isActive("/firm-dashboard/statutory") ? "active" : ""}`}>
                  <i className="bx bx-building-house nav_icon"></i>
                  <span>Statutory</span>
                </Link>
              </div>
             
            </div>
            {/* Additional menu items */}
            {/* <Link to="/firm-dashboard/employee-master" className="nav_link">

              <span className="nav-name">
                <i className="bx bx-male-female nav_icon"></i>
                Employee Master</span>
            </Link> */}
            {/*<Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Deductions</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">DA</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">PROCESS</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Abstract</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Reports</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Bonus</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Leave</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">PTax</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">PF</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">ESI</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Settings</span>
            </Link>
            <Link to="/firmdashboard" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Backup</span>
            </Link>*/}
          </div>
          <div onClick={signOut} className="nav_link">

            <span className="nav-name">
              <i className="bx bx-log-out nav_icon"></i>
              Sign Out</span>
          </div>
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? (
              <i className="bx bx-chevron-left" style={{ paddingBottom: "8px" }}></i>
            ) : (
              <i className="bx bx-chevron-right" style={{ paddingBottom: "8px" }}></i>
            )}
          </div>
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;
