import React, { useState, useEffect } from "react";
import "./TextInputWithPrefixSuffix.scss";

const TextInputWithPrefixSuffix = ({
  label = "",
  prefix = "",
  suffix = "",
  value,
  onChange,
  onPrefixChange,
  onSuffixChange,
  disablePrefix = false, 
  disableSuffix = true,
  placeholder = "",
  required = false,
  type = "text",
  allowDecimal = false,
  errorMessage = "This field is required",
  id,
  width= "100%",
  leftLabel=false,
  ...props
}) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (id && value) {
      // When editing, split pno and pnoSuffix
      const pnoValue = Number(value.slice(0, -2)); // Assuming the last 2 characters are the suffix
      const pnoSuffixValue = value.slice(-2);

      onPrefixChange({ target: { name: "pnoSuffix", value: pnoSuffixValue } });
      onChange({ target: { name: "pno", value: pnoValue } });
    }
  }, [id, value]);

  // Validation Logic
  const validateInput = (value) => {
    let errorMessage = "";
    const valueStr = value !== undefined && value !== null ? String(value) : "";

    if (required && !valueStr.trim()) {
      errorMessage = `${label} is required.`;
    } else if (type === "mobile" && valueStr && !/^\d{10}$/.test(valueStr)) {
      errorMessage = "Mobile number must be exactly 10 digits.";
    } else if (type === "number" && !allowDecimal && valueStr && !/^\d+$/.test(valueStr)) {
      errorMessage = "Only whole numbers are allowed.";
    }

    setError(errorMessage);
  };


  // Handle Change for Main Input
const handleChange = (e) => {
  const newValue = e.target.value;
  onChange({ target: { name: "pno", value: newValue } });
  if (touched) {
    validateInput(newValue);
  }
};

// Handle Prefix/Suffix Change
const handlePrefixSuffixChange = (e, field) => {
  const updatedValue = e.target.value;

  if (field === "pnoSuffix") {
    onPrefixChange({ target: { name: "pnoSuffix", value: updatedValue } });
  } else {
    onChange({ target: { name: "pno", value: updatedValue } });
  }
};


  // Handle Focus (User clicks into the input)
  const handleFocus = () => {
    setTouched(true);
  };

  // Handle Blur (User leaves the input)
  const handleBlur = () => {
    validateInput(value);
  };

  useEffect(() => {
    if (touched) {
      validateInput(value); // Validate if touched
    }
  }, [value]);

  return (
    <>
    <div className={leftLabel ? "text-input-wrapper same-row": "text-input-wrapper"} style={{ width: width }}>
      {/* Label with asterisk if required */}
      {label && (
        <label className="text-input-label" style={leftLabel ? {marginBottom: "0px"} : {marginBottom: "5px"}}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      {/* Input Fields */}
      <div className={`text-input-container ${error ? "input-error" : ""}`}>
        {/* Prefix Input */}
        <input
          type="text"
          value={prefix}
          onChange={(e) => handlePrefixSuffixChange(e, "pnoSuffix")}
          disabled={disablePrefix}
          className="text-input-prefix"
          placeholder="P"
        />

        {/* Divider */}
        <div className="text-input-divider"></div>

        {/* Main Input */}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus} // Set touched on focus
          placeholder={placeholder}
          {...props}
          className={`text-input-main ${error ? "input-error" : ""}`}
        />
      </div>
    </div>
    {touched && error && <div className="text-input-error"  style={leftLabel ? {textAlign: "left"}: {textAlign: undefined}}>{error}</div>}
    </>
  );
};

export default TextInputWithPrefixSuffix;
