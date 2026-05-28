import React from "react";
import "./CheckBoxGroup.scss";

const CheckBoxGroup = ({ label, options = [], selectedOptions, onToggle }) => {
  return (
    <div className="checkbox-group">
      {label && <label className="checkbox-group-label">{label}:</label>}
      <div className="checkbox-group-options">
        {options.map((option, idx) => (
          <div className="checkbox-group-item" key={idx}>
            {/* Main Permission */}
            <div className="checkbox-group-main">
              <input
                type="checkbox"
                id={`checkbox-${idx}`}
                checked={selectedOptions.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="checkbox-group-input"
                aria-checked={selectedOptions.includes(option.value)}
                aria-label={`Toggle ${option.label}`}
              />
              <label
                htmlFor={`checkbox-${idx}`}
                className="checkbox-group-text"
              >
                {option.label}
              </label>
            </div>

            {/* Sub-Permissions */}
            {option.subPermissions && option.subPermissions.length > 0 && (
              <div className="checkbox-group-sub-options">
                {option.subPermissions.map((subPermission, subIdx) => (
                  <div className="checkbox-group-sub-item" key={subIdx}>
                    <input
                      type="checkbox"
                      id={`sub-checkbox-${idx}-${subIdx}`}
                      checked={selectedOptions.includes(subPermission.value)}
                      onChange={() => onToggle(subPermission.value, option.value)}
                      className="checkbox-group-input"
                      aria-checked={selectedOptions.includes(subPermission.value)}
                      aria-label={subPermission.label}
                    />
                    <label
                      htmlFor={`sub-checkbox-${idx}-${subIdx}`}
                      className="checkbox-group-text"
                    >
                      {subPermission.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;