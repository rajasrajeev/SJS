import React, { useState } from "react";
import TextInput from "../../../../components/form/TextInput";
import CheckBoxGroup from "../../../../components/form/CheckBoxGroup";
import CustomRadioButtonGroup from "../../../../components/form/CustomRadioButton";


const CategoryTab = ({ formData, onChange,salaryOptions }) => {
  const [selectedSalaryType, setSelectedSalaryType] = useState(formData.employeeCategory.salary_type);

  const handleSalaryTypeChange = (e) => {
    const { value } = e.target;
    setSelectedSalaryType(value);
    onChange({ target: { name: 'employeeCategory.salary_type', value } });
  };

  return (
    <div className="category-tab">
      <div className="row">
        <div className="col-md-6">
        <CustomRadioButtonGroup
            label="Salary Type"
            name="employeeCategory.salary_type"
            options={salaryOptions}
            value={selectedSalaryType}
            onChange={handleSalaryTypeChange}
            isColumn={true}
          />
        </div>
        {/* <div className="col-md-3">
          <TextInput
            label="Wages %"
            name="wagesPercent"
            type="number"
            value={formData.wagesPercent}
            onChange={onInputChange}
            allowDecimal = {true}
          />
          <TextInput
            label="Type"
            name="type"
            value={formData.type}
            onChange={onInputChange}
          />


        </div> */}

        {/* <div className="col-md-3">
        <TextInput
            label="Shift"
            name="shift"
            value={formData.shift}
            onChange={onInputChange}
          />
        <TextInput
            label="Work Done"
            name="workDone"
            value={formData.workDone}
            onChange={onInputChange}
          />

        </div> */}
        {/* <div className="col-md-3">
        <TextInput
            label="Work Hours"
            name="workHours"
            type="number"
            value={formData.workHours}
            onChange={onInputChange}
          />
        </div> */}
      </div>
      <div className="sticky-buttons">
        <button type="submit" className="btn btn-success me-3">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CategoryTab;
