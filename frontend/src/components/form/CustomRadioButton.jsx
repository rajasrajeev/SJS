import React from "react";

const CustomRadioButtonGroup = ({ label, name, options, value, onChange, isColumn = false }) => {
    return (
        <div className="form-group">
            <label className="text-input-label">{label}</label>
            <div className="radio-buttons d-flex gap-2"
             style={{ flexDirection: isColumn ? "column" : "row" }}  // Conditional styling
            >
                {options.map((option) => (
                    <div key={option.value} className="form-check gap-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            id={option.value}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                        />
                        <label className="form-check-label" htmlFor={option.value}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomRadioButtonGroup;