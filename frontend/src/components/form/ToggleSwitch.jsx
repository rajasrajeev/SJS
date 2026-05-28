import React from 'react';
import './ToggleSwitch.scss';  // Optional for styling

const ToggleSwitch = ({ label, isChecked, onChange }) => {
  return (
    <div className="toggle-switch">
      {label && <span>{label}</span>}
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
