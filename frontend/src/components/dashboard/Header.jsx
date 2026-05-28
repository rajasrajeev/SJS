import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss"; // Ensure you have the necessary styles
import DatePicker from "../form/DatePicker";
import FormButton from "../form/FormButton";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMonth } from "../../features/monthSlice";

const Header = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.month.selectedMonth);
  const [monthInput, setMonthInput] = useState(selectedMonth);

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };
  
  const handleProfileClick = () => {
    navigate("/firm-dashboard/profile-update");
  };

  const handleMonthChange = (e) => {
    setMonthInput(e.target.value);
  };

  const handleMonthSubmit = () => {
    dispatch(setSelectedMonth(monthInput));
    // Close the offcanvas manually
    const offcanvasElement = document.getElementById("offcanvasRight");
    if (offcanvasElement) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  return (
    <>
    <header className="header">
      <div className="header-content">
        {/* Other header content */}
        <div className="header-icons">
          <div className="user-icon">
            <button 
              // className="btn" 
              style={{
                backgroundColor: "transparent",
                color: "black",
                width: "35px"
              }}
              type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasRight" 
              aria-controls="offcanvasRight"
            >
              <i className="bi bi-calendar2-date" style={{ paddingTop: "7px", paddingRight: "20px", fontSize: "20px" }}></i>
            </button>
          </div>
          <div className="user-icon" onClick={toggleProfilePopup}>
            <i className="bx bx-user" style={{ paddingTop: "7px", paddingRight: "20px", fontSize: "20px" }}></i>
          </div>
          {isProfilePopupOpen && (
            <div className="profile-popup">
              <button className="profile-button"  onClick={handleProfileClick}>Profile</button>
              <button className="profile-button" >Change Password</button>
              <button className="settings-button">Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Select Month</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body" style={{marginTop: "200px"}}>
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Information</h4>
          <p>The app displays monthly data and reports based on the selected month. Choose a month to view the corresponding information.</p>
        </div>
        <div className="row">
          <div className="col">
            <input 
              type="month" 
              className="form-control" 
              value={monthInput} 
              onChange={handleMonthChange}
            />
          </div>
          <div className="col">
            <button className="btn btn-dark" style={{marginTop: "0px"}} onClick={handleMonthSubmit}>Ok</button>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Header;
