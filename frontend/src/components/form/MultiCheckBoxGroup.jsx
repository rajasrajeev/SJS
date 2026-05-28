import React from "react";
import "./MultiCheckBoxGroup.scss";

const MultiCheckBoxGroup = ({ label, options = [], selectedOptions, onToggle }) => {

  const handleCheckboxChange = (label) => {
    onToggle(label); // Call onToggle function for the selected label
  };

  return (
    <div className="multi-checkbox-group">
      {label && <label className="checkbox-group-label">{label}:</label>}
      <div className="checkbox-group-options" style={{ alignItems: "left" }}>
        {options.map((option, idx) => (
          option && option.label ? (
            <div className="checkbox-group-item" key={option.label}>
              {/* Main Permission */}
              <div className="checkbox-group-main">
                <input
                  type="checkbox"
                  id={`checkbox-${option.label}`}
                  checked={selectedOptions.includes(option.label)}
                  onChange={() => handleCheckboxChange(option.label)}
                  className="checkbox-group-input"
                  aria-checked={selectedOptions.includes(option.label)}
                  aria-label={`Toggle ${option.label}`}
                />
                <label htmlFor={`checkbox-${option.label}`} className="checkbox-group-text">
                  {option.label}
                </label>
              </div>

              {/* Submenus */}
              {option.permissions && Array.isArray(option.permissions) && option.permissions.length > 0 && (
                <div className="checkbox-group-sub-options">
                  {option.permissions.map((subMenu, subIdx) => {

                    // Ensure subPermissions is an array before iterating
                    const subPermissions = Array.isArray(subMenu.permissions) ? subMenu.permissions : [];

                    // Use permissionsToIterate instead of directly using subMenu.permissions
                    const permissionsToIterate = subPermissions.length > 0 ? subPermissions : [];

                    return (
                      <div className="checkbox-group-sub-item" key={subMenu.label}>
                        <input
                          type="checkbox"
                          id={`sub-checkbox-${subMenu.label}`}
                          checked={selectedOptions.includes(subMenu.label)}
                          onChange={() => handleCheckboxChange(subMenu.label)}
                          className="checkbox-group-input"
                          aria-checked={selectedOptions.includes(subMenu.label)}
                          aria-label={`Toggle ${subMenu.label}`}
                        />
                        <label htmlFor={`sub-checkbox-${subMenu.label}`} className="checkbox-group-text">
                          {subMenu.label}
                        </label>
                        {/* Sub-permissions */}
                        {permissionsToIterate.length > 0 && (
                          <div className="checkbox-group-sub-permissions">
                            {permissionsToIterate.map((permission) => (
                              <div className="checkbox-group-sub-item" key={permission.label}>
                                <input
                                  type="checkbox"
                                  id={`perm-checkbox-${permission.label}`}
                                  checked={selectedOptions.includes(permission.label)}
                                  onChange={() => handleCheckboxChange(permission.label)}
                                  className="checkbox-group-input"
                                  aria-checked={selectedOptions.includes(permission.label)}
                                  aria-label={`Toggle ${permission.label}`}
                                />
                                <label
                                  htmlFor={`perm-checkbox-${permission.label}`}
                                  className="checkbox-group-text"
                                >
                                  {permission.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default MultiCheckBoxGroup;