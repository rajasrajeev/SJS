import React, { useState } from "react";
import "./TextInput.scss";

const TextInput = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  required = false, 
  disabled,
  placeholder = "",
  allowDecimal = false,
  width = "100%",  // Added width prop with default value
  leftLabel = false
}) => {
  const [error, setError] = useState("");

  const validateInput = (value) => {
    let errorMessage = "";
    const valueStr = value !== undefined && value !== null ? String(value) : "";
  
    if (required && !valueStr.trim()) {
      errorMessage = `${label} is required.`;
    } else if (type === "email" && valueStr && !/^\S+@\S+\.\S+$/.test(valueStr)) {
      errorMessage = "Invalid email address.";
    } else if (type === "mobile" && valueStr && !/^\d{10}$/.test(valueStr)) {
      errorMessage = "Mobile number must be exactly 10 digits.";
    } else if (type === "number" && !allowDecimal && valueStr && !/^\d+$/.test(valueStr)) {
      errorMessage = "Only whole numbers are allowed.";
    } else if (type === "number" && allowDecimal && valueStr && !/^\d*\.?\d*$/.test(valueStr)) {
      errorMessage = "Only numeric values with decimals are allowed.";
    } else if (type === "password" && valueStr && valueStr.length < 6) {
      errorMessage = "Password must be at least 6 characters.";
    }
  
    setError(errorMessage);
  };
  

  const handleBlur = () => {
    validateInput(value);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Prevent non-numeric input for number and mobile fields
    // if ((type === "number" || name === "mobile") && newValue && !/^\d*$/.test(newValue)) {
    //   return;
    // }

    // Prevent non-numeric input for number and mobile fields
    if (type === "number" && !allowDecimal && newValue && !/^\d*$/.test(newValue)) {
      return;
    }
    if (type === "number" && allowDecimal && newValue && !/^\d*\.?\d*$/.test(newValue)) {
      return;
    }
    if (type === "mobile" && newValue && !/^\d*$/.test(newValue)) {
      return;
    }
    onChange(e);
    if (error) {
      validateInput(newValue); // Revalidate if there was an error
    }
  };

  return (
    <>
    <div className={leftLabel ? "text-input label-same-row": "text-input"} style={{ width: width }}>
      <label 
        htmlFor={name} 
        className="text-input-label" 
        style={{
          marginBottom: leftLabel ? "0px" : "5px", 
          width: label === "" && leftLabel ? "2px" : undefined, 
        }}
        >
        {label}{required && <span className="required">*</span>}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder={placeholder}
        className={`text-input-field ${error ? "input-error" : ""} ${
          label === "" && leftLabel ? "adjust-margin" : ""
        }`}
        style={{ width: "100%"}} 
      />
    </div>
    {error && <div className="text-input-error" style={leftLabel ? {textAlign: "left"} : {textAlign: undefined}}>{error}</div>}
    </>
  );
};

export default TextInput;
