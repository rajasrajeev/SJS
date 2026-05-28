import React from "react";
import "./RichTextField.scss";

const RichTextField = ({ label, name, value, onChange, required = false, className, placeholder, height, leftLabel=false }) => {
  return (
    <div className={leftLabel ? "rich-text-field rich-label-row" : "rich-text-field"}>
      <label htmlFor={name} className="rich-text-field-label" style={leftLabel ? {marginBottom: "0px"} : {marginBottom: "5px"}}>
        {label} {required && <span className="required">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`rich-text-field-input ${className}`}
        rows={height ? height : 4}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextField;
