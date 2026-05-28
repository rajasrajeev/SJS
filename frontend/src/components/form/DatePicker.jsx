import React, { useState } from "react";
import "./DatePicker.scss";

const DatePicker = ({ label, name, value, onChange, required = false, leftLabel=false }) => {
  const [error, setError] = useState("");

  const validateDate = (value) => {
    if (required && !value) {
      setError(`${label} is required.`);
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    validateDate(value);
  };

  return (
    <>
    <div className={leftLabel ? "date-picker date-same-row": "date-picker"}>
      <label htmlFor={name} className="date-picker-label"  style={leftLabel ? {marginBottom: "0px"} : {marginBottom: "5px"}}>
        {label} {required && <span className="required" style={{color: "red"}}>*</span>}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        className={`date-picker-input ${error ? "input-error" : ""}`}
      />
    </div>
    {error && <div className="date-picker-error"  style={leftLabel ? {textAlign: "left"}: {textAlign: undefined}}>{error}</div>}
    </>
  );
};

export default DatePicker;
