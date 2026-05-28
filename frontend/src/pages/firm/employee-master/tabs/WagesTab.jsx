import React, { useState, useEffect, useCallback } from "react";
import TextInput from "../../../../components/form/TextInput";

const WagesTab = ({ formData, onChange, id }) => {
  const [basicFields, setBasicFields] = useState(["basic1", "basic2", "basic3"]); // Start with Basic 1,2,3
  const [additionalExpenses, setAdditionalExpenses] = useState([]);

  // Ensure at least Basic 1, Basic 2, and Basic 3 exist
  useEffect(() => {
    const existingBasics = Object.keys(formData.employeeWage)
      .filter((key) => key.startsWith("basic"))
      .sort((a, b) => {
        const numA = parseInt(a.replace("basic", ""));
        const numB = parseInt(b.replace("basic", ""));
        return numA - numB;
      });

    // Ensure at least Basic 1, Basic 2, and Basic 3 exist but limit to 4
    const defaultBasics = ["basic1", "basic2", "basic3"];
    //const updatedBasics = [...new Set([...defaultBasics, ...existingBasics])];
    //Limits the total fields to 4 using .slice(0, 4), preventing additional fields from being added in edit mode.
    const updatedBasics = [...new Set([...defaultBasics, ...existingBasics])].slice(0, 4);
    setBasicFields(updatedBasics);
  }, [formData]);


  // Calculate total of all Basic fields
  const calculateBasicTotal = useCallback(() => {
    return basicFields.reduce((total, field) => {
      const value = parseFloat(formData.employeeWage[field]) || 0;
      return total + value;
    }, 0);
  }, [formData.employeeWage, basicFields]);


  // Recalculate increment percentage value
  useEffect(() => {
    const totalBasic = calculateBasicTotal();
  
    const percentageFields = [
      { percentageKey: "increment_percentage", valueKey: "increment_percentage_value" },
      { percentageKey: "service_weightage", valueKey: "service_weightage_value" },
      { percentageKey: "hra", valueKey: "hra_value" },
      { percentageKey: "ltc", valueKey: "ltc_value" },
      { percentageKey: "travel_allowance_percentage", valueKey: "travel_allowance_value" },
      { percentageKey: "attendance_incentive", valueKey: "attendance_incentive_value" },
      { percentageKey: "production_incentive", valueKey: "production_incentive_value" },
      { percentageKey: "medical_allowance", valueKey: "medical_allowance_value" },
      { percentageKey: "washing_allowance", valueKey: "washing_allowance_value" },
      { percentageKey: "other_allowance", valueKey: "other_allowance_value" },
    ];
  
    percentageFields.forEach(({ percentageKey, valueKey }) => {
      const percentage = parseFloat(formData.employeeWage[percentageKey]) || 0;
      const value = calculatePercentageValue(totalBasic, percentage);
      if (formData.employeeWage[valueKey] !== value) {
        onChange({
          target: {
            name: `employeeWage.${valueKey}`,
            value: value,
          },
        });
      }
    });
  }, [
    formData.employeeWage.hra,
    formData.employeeWage.ltc,
    formData.employeeWage.travel_allowance_percentage,
    formData.employeeWage.attendance_incentive,
    formData.employeeWage.production_incentive,
    formData.employeeWage.medical_allowance,
    formData.employeeWage.washing_allowance,
    formData.employeeWage.other_allowance,
    calculateBasicTotal,
  ]);

  const calculatePercentageValue = (baseValue, percentage) => {
    return (parseFloat(baseValue) * parseFloat(percentage)) / 100 || 0;
  };

  // Add a new Basic field (up to Basic 4)
  const handleAddBasic = () => {
    if (basicFields.length < 4) { // Limit to 4 basic fields
      const nextNumber = basicFields.length + 1;
      const newField = `basic${nextNumber}`;
      setBasicFields([...basicFields, newField]);

      // Add the new basic field to formData with an empty value
      onChange({
        target: {
          name: `employeeWage.${newField}`,
          value: "",
        },
      });
    }
  };

  const handleDeleteBasic = (field) => {
    // Create a deep copy of formData
    const updatedFormData = {
      ...formData,
      employeeWage: { ...formData.employeeWage },
    };

    // Delete the field from the copied employeeWage object
    delete updatedFormData.employeeWage[field];

    // Update the state using the onChange handler
    onChange({
      target: {
        name: "employeeWage",
        value: updatedFormData.employeeWage,
      },
    });

    // Remove the field from basicFields state
    setBasicFields(basicFields.filter((f) => f !== field));
  };


  // Handle dynamic input changes
  const handleDynamicChange = (e, fieldName) => {
    onChange({ target: { name: `employeeWage.${fieldName}`, value: e.target.value } });
  };

  // Handle adding additional expenses
  const handleAddExpense = () => {
    if (additionalExpenses.length < 2) { // Limit to 2 additional expenses
      setAdditionalExpenses([...additionalExpenses, { name: "", value: "" }]);
    }
  };
  // Handle removing additional expenses
  const handleRemoveExpense = (index) => {
    const updatedExpenses = additionalExpenses.filter((_, i) => i !== index);
    setAdditionalExpenses(updatedExpenses);
  };

  // Handle change for additional expenses
  const handleExpenseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExpenses = additionalExpenses.map((expense, i) =>
      i === index ? { ...expense, [name]: value } : expense
    );
    setAdditionalExpenses(updatedExpenses);
  };

  return (
    <div className="wages-tab">
      <div className="row">
        <div className="col-md-12 mb-4">
          {/* Dynamically render Basic inputs */}
          <div className="row">
            {basicFields.map((field, index) => (
              <div key={field} className="col-md-4 d-flex align-items-center mb-2">
                <TextInput
                  label={`Basic ${index + 1}`}
                  name={`employeeWage.${field}`}
                  type="number"
                  value={formData.employeeWage[field] || ""}
                  onChange={(e) => handleDynamicChange(e, field)}
                  allowDecimal={true}
                  required={index === 0} // Only Basic 1 is required
                  width="70%"
                // leftLabel={true}
                />
                {/* Delete Button */}
                {index > 2 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm ms-3 mt-4"
                    onClick={() => handleDeleteBasic(field)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddBasic}
            className="button mt-2"
          >
            Add
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="d-flex gap-1">
            <TextInput
              label="% "
              name="employeeWage.increment_percentage"
              type="number"
              value={formData.employeeWage.increment_percentage}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
              // leftLabel={true}
              placeholder="%"
            />
            <TextInput
              label="Increment"
              name="employeeWage.increment_percentage_value"
              type="number"
              value={formData.employeeWage.increment_percentage_value}
              onChange={onChange}
              allowDecimal={true}
            // width="50%"
            //leftLabel={true}
            />
          </div>

          <div className="d-flex gap-1">
            <TextInput
              label="%"
              placeholder="%"
              name="employeeWage.service_weightage"
              type="number"
              value={formData.employeeWage.service_weightage}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
            // leftLabel={true}
            />
            <TextInput
              label="Service Weightage"
              name="employeeWage.service_weightage_value"
              type="number"
              value={formData.employeeWage.service_weightage_value}
              onChange={onChange}
              allowDecimal={true}
            // width="50%"
            // leftLabel={true}
            />
          </div>

          <div className="d-flex gap-1">
            <TextInput
              label="%"
              placeholder="%"
              name="employeeWage.hra"
              type="number"
              value={formData.employeeWage.hra}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
            //leftLabel={true}
            />
            <TextInput
              label="HRA"
              name="employeeWage.hra_value"
              type="number"
              value={formData.employeeWage.hra_value}
              onChange={onChange}
              allowDecimal={true}
            // width="50%"
            // leftLabel={true}
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="%"
              placeholder="%"
              name="employeeWage.ltc"
              type="number"
              value={formData.employeeWage.ltc}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
            //leftLabel={true}
            />
            <TextInput
              label="LTC"
              name="employeeWage.ltc_value"
              type="number"
              value={formData.employeeWage.ltc_value}
              onChange={onChange}
              allowDecimal={true}
            // width="50%"
            // leftLabel={true}
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="%"
              placeholder="%"
              name="employeeWage.washing_allowance"
              type="number"
              value={formData.employeeWage.washing_allowance}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
            //leftLabel={true}
            />
            <TextInput
              label="Washing Allowance"
              name="employeeWage.washing_allowance_value"
              type="number"
              value={formData.employeeWage.washing_allowance_value}
              onChange={onChange}
              allowDecimal={true}
            //leftLabel={true}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-2"></div>
        <div className="col-md-6 col-lg-4 gap-1">
          <div className="d-flex gap-1">
            <TextInput
              label="%"
              name="employeeWage.travel_allowance_percentage"
              type="number"
              value={formData.employeeWage.travel_allowance_percentage}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
              //leftLabel={true}
              placeholder="%"
            />
            <TextInput
              label="Travelling Allowance"
              name="employeeWage.travel_allowance_value"
              type="number"
              value={formData.employeeWage.travel_allowance_value}
              onChange={onChange}
              allowDecimal={true}
            // width="50%"
            //leftLabel={true}
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="%"
              name="employeeWage.attendance_incentive"
              type="number"
              value={formData.employeeWage.attendance_incentive}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
              placeholder="%"
            //leftLabel={true}
            />
            <TextInput
              label="Attendance Incentive"
              name="employeeWage.attendance_incentive_value"
              type="number"
              value={formData.employeeWage.attendance_incentive_value}
              onChange={onChange}
              allowDecimal={true}
            // width="50%"
            // leftLabel={true}
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="%"
              name="employeeWage.production_incentive"
              type="number"
              value={formData.employeeWage.production_incentive}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
              //leftLabel={true}
              placeholder="%"
            />
            <TextInput
              label="Production Incentive"
              name="employeeWage.production_incentive_value"
              type="number"
              value={formData.employeeWage.production_incentive_value}
              onChange={onChange}
              allowDecimal={true}
            // width="50%"
            // leftLabel={true}
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="%"
              name="employeeWage.medical_allowance"
              type="number"
              value={formData.employeeWage.medical_allowance}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
              //  leftLabel={true}
              placeholder="%"
            />
            <TextInput
              label="Medical Allowance"
              name="employeeWage.medical_allowance_value"
              type="number"
              value={formData.employeeWage.medical_allowance_value}
              onChange={onChange}
              allowDecimal={true}
            //  leftLabel={true}
            // width="60%"
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="%"
              name="employeeWage.other_allowance"
              type="number"
              value={formData.employeeWage.other_allowance}
              onChange={onChange}
              allowDecimal={true}
              width="140px"
              //  leftLabel={true}
              placeholder="%"
            />
            <TextInput
              label="Other Allowance"
              name="employeeWage.other_allowance_value"
              type="number"
              value={formData.employeeWage.other_allowance_value}
              onChange={onChange}
              allowDecimal={true}
            //  leftLabel={true}
            // width="60%"
            />
          </div>
        </div>
      </div>

      {/* Render additional expenses */}
      <div className="row mt-0">
        <div className="col-md-12">
          {/* <h5>Additional Expenses</h5> */}
          <div className="row">
            {additionalExpenses.map((expense, index) => (

              <div key={index} className=" col-md-6 col-lg-6">
                <div className="d-flex gap-1">
                  <TextInput
                    label="%"
                    name="name"
                    type="number"
                    value={expense.name}
                    allowDecimal={true}
                    width="200px"
                    onChange={(e) => handleExpenseChange(index, e)}
                  />
                  <TextInput
                    label="Other Allowance"
                    name="value"
                    type="number"
                    value={expense.value}
                    onChange={(e) => handleExpenseChange(index, e)}
                    allowDecimal={true}
                  />
                <div className="col-md-4">
                <button
                 type="button"
                    className="btn btn-danger btn-sm ms-3 mt-4"
                  onClick={() => handleRemoveExpense(index)}
                >
                  Delete
                </button>
                </div>
                </div>


              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddExpense}
            className="button mt-2"
          >
            Add
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 col-lg-4 col-xl-3">
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <TextInput
            label="Salary % "
            name="employeeWage.salary"
            type="number"
            value={formData.employeeWage.salary}
            onChange={onChange}
            allowDecimal={true}
            leftLabel={true}
          />
        </div>
      </div>
    </div>
  );
};

export default WagesTab;