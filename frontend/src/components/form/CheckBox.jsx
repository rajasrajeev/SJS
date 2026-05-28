import React from "react";
import "./CheckBoxGroup.scss";

const CheckBox = ({label, onToggle, value, id, name, title}) => {
  return (
    <div className="checkbox-group">
        {title && <label className="checkbox-group-label">{title}:</label>}
        <div className="checkbox-group-options">
            <div className="checkbox-group-item">
                <div className="checkbox-group-main">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id={id} 
                      name={name}
                      checked={value}
                      onChange={(e) => onToggle(e.target.checked)}
                    />
                    <label class="form-check-label" htmlFor={id}>
                       {label}
                    </label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckBox