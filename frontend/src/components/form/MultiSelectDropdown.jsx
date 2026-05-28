import React, { useState, useRef, useEffect } from "react";
import "./MultiSelectDropdown.scss";

const MultiSelectDropdown = ({
  label,
  options,
  selectedOptions,
  onToggle,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const validateSelection = () => {
    if (required && selectedOptions.length === 0) {
      setError(`${label} is required.`);
    } else {
      setError("");
    }
  };

  const handleItemClick = (option) => {
    onToggle(option);
    if (error) {
      validateSelection();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (required) {
      validateSelection();
    }
  }, [selectedOptions]);

  return (
    <div
      className={`multi-select-dropdown ${error ? "error" : ""}`}
      ref={dropdownRef}
    >
      <label className="multi-select-dropdown-label">
        {label} {required && <span className="required">*</span>}:
      </label>
      <div
        className={`multi-select-dropdown-header ${isOpen ? "open" : ""}`}
        onClick={handleToggleDropdown}
      >
        <span className="multi-select-dropdown-selected">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.name).join(", ")
            : "Select options"}
        </span>
        <i className={`dropdown-icon ${isOpen ? "rotate" : ""}`}>▼</i>
      </div>
      {isOpen && (
        <div className="multi-select-dropdown-menu">
          {options.map((option) => (
            <div
              key={option.id}
              className="multi-select-dropdown-item"
              onClick={() => handleItemClick(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.some((selected) => selected.id === option.id)}
                readOnly
                className="multi-select-dropdown-checkbox"
              />
              <span className="multi-select-dropdown-text">{option.name}</span>
            </div>
          ))}
        </div>
      )}
      {error && <div className="multi-select-dropdown-error">{error}</div>}
    </div>
  );
};

export default MultiSelectDropdown;
