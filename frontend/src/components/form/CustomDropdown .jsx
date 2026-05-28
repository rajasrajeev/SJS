import React from "react";
import "./Dropdown.scss"; // Include the styles for dropdown

const CustomDropdown = ({ label, label2, name, options = [], value, onChange, required = false, leftLabel=false,style = {},disabled = false }) => {
  // Ensure options is an array
  const validOptions = Array.isArray(options) ? options : [];

  return (
    <div className={leftLabel ? "dropdown drop-same-row" : "dropdown"}>
      <label className="dropdown-label" htmlFor={name} style={leftLabel ? {marginBottom: "0px"} : {marginBottom: "5px"}}>
        {label}{required && <span className="required">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        required={required}
        className="dropdown-select"
        style={style} // Apply dynamic styles here
         disabled={disabled}
      >
        <option value="">
          Select {label2 || label}
        </option>
        {validOptions.length > 0 ? (
          validOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </div>
  );
};

export default CustomDropdown;