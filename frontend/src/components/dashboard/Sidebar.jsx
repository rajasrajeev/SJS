import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { useDirection } from "../../hooks/useDirection"; 
import {useLocation, Link } from "react-router-dom";
import "./Sidebar.scss";


const Sidebar = ({ expandedMenu, toggleSubmenu, showNavbar }) => {
  const { direction } = useDirection(); // Get the current direction from context
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const menuItems = JSON.parse(localStorage.getItem("menu"));
    setMenu(menuItems);
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
      toggleSubmenu(null);
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
      data-direction={direction}
    >
      <nav className="nav">
        <div>
          <Link to="/firm-dashboard" className="nav_logo">
            <i className="bx bx-layer nav_logo-icon"></i>
            <span className="nav_logo-name">SJS Consultancy</span>
          </Link>

          <div className="nav_list">
            {
              menu && menu.map((module, index) => (
                module.subMenus && module.subMenus.length > 0 ? (
                  <div className="nav_item" key={index}>
                    
                    <div className="nav_link" onClick={() => handleSubmenuClick(module.name)} >
                      <span className="nav-name">
                        <i className={`bx ${module.icon} nav_icon`}></i>
                        {module.name}
                      </span>
                        <span className="">
                          <i
                            className={`bx ${expandedMenu === module.name
                              ? "bx-chevron-up"
                              : "bx-chevron-down"
                              }`}
                          ></i>
                        </span>
                    </div>
                      <div className={`nav-submenu ${expandedMenu === module.name ? "show" : ""}`}>
                        {module.subMenus.map((submodule, subindex) => (
                            <Link key={subindex} to={submodule.url}  className={`nav_sublink ${isActive(submodule.url) ? "active" : ""}`}>
                              <span>
                                <i className="bx bx-group nav_icon"></i>
                                {submodule.name}
                              </span>
                            </Link>
                          
                        ))}
                      </div>
                    
                  </div>
                  ) : (
                    <div className="nav_item" key={index}> 
                      <Link to={module.url} className={`nav_link ${isActive(module.url) ? "active" : ""}`}>
                        <span className="nav-name">
                          <i className={`bx ${module.icon} nav_icon`}></i>
                          {module.name}
                        </span>
                      </Link>
                    </div>
                  )
              ))
            }
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
