import React, { useEffect, useState, useRef } from "react";
import TextInput from "../../../../components/form/TextInput";
import RichTextField from "../../../../components/form/RichTextField";
import DatePicker from "../../../../components/form/DatePicker";
import CustomDropdown from "../../../../components/form/CustomDropdown ";
import CustomRadioButtonGroup from "../../../../components/form/CustomRadioButton";
import { fetchDesignations } from "../../../../features/designationSlice";
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat, dateFormatFromString, datePickerFormat, datePickerFormats } from "../../../../utils/dateFormat";
import Form from 'react-bootstrap/Form';
import ToggleSwitch from "../../../../components/form/ToggleSwitch";
import TextInputWithPrefixSuffix from "../../../../components/form/TextInputWithPrefixSuffix";

const PersonalTab = ({ formData, onChange, shiftTypes, departmentTypes, branchTypes, designationTypes, id }) => {
  const dispatch = useDispatch();
  const [selectedShift, setSelectedShift] = useState(null);
  const prevDepartmentIdRef = useRef();
  const { designations } = useSelector((store) => store.designation);
  const [gender, setGender] = useState(formData.gender || "");
  const [copyAddress, setCopyAddress] = useState(false);
  const [pno, setPno] = useState(""); // The combined value (pno + pnoSuffix)
  const [pnoSuffix, setPnoSuffix] = useState(""); // The suffix

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ];
  const bloodTypeOptions = [
    { id: 'APOSITIVE', name: 'A+' },
    { id: 'ANEGATIVE', name: 'A-' },
    { id: 'BPOSITIVE', name: 'B+' },
    { id: 'BNEGATIVE', name: 'B-' },
    { id: 'OPOSITIVE', name: 'O+' },
    { id: 'ONEGATIVE', name: 'O-' },
    { id: 'ABPOSITIVE', name: 'AB+' },
    { id: 'ABNEGATIVE', name: 'AB-' },
  ];

  const [isActive, setIsActive] = useState(formData.active || true);
  const [isRetired, setIsRetired] = useState(formData.retired || false);

  useEffect(() => {
    setIsActive(formData.active || false);
    setIsRetired(formData.retired || false);
  }, [formData]);

  useEffect(() => {
    if (formData.department_id && formData.department_id !== prevDepartmentIdRef.current) {
      dispatch(fetchDesignations(formData.department_id));
      prevDepartmentIdRef.current = formData.department_id;
    }
  }, [formData.department_id, dispatch]);

  useEffect(() => {
    if (designations.length > 0 && formData.designation_id) {
      const designation = designations.find((designation) => designation.id === formData.designation_id);
      if (designation) {
        onChange({ target: { name: "designation_id", value: designation.id } });
      }
    }
  }, [designations, formData.designation_id]);

  useEffect(() => {
    if (formData.employeeShift?.[0]?.shift_id) {
      const shift = shiftTypes.find((shift) => shift.id === formData.employeeShift[0].shift_id);
      if (shift) {
        setSelectedShift(shift);
        const shiftStart = new Date(`1970-01-01T${shift.start}:00`);
        let shiftEnd = new Date(`1970-01-01T${shift.end}:00`);

        // If shift end time is before shift start time, it means the shift spans across midnight
        if (shiftEnd <= shiftStart) {
          shiftEnd = new Date(shiftEnd.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours to shift end time
        }

        const diff = shiftEnd - shiftStart;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const workHours = `${hours}h ${minutes}m`;

        onChange({ target: { name: "shiftTime", value: `${shift.start} - ${shift.end}` } });
        onChange({ target: { name: "workHours", value: workHours } });
      }
    }
  }, [formData.employeeShift, shiftTypes]);

  useEffect(() => {
    if (id) {
          // Updated regex: letters first, then numbers
    const match = formData.pno.trim().match(/^([a-zA-Z]+)(\d+)$/);
      console.log("PNO" + formData.pno);
      if (match) {
        setPnoSuffix(match[1]);         // Numeric part
        setPno(match[2]);   // String suffix
        console.log("Numeric Part:", match[2]);
        console.log("Suffix Part:", match[1]);
      } else {
        console.warn("PNO does not match the expected pattern.");
        setPno(formData.pno);
      }
    }
  }, [id, formData.pno]);

  const handleActiveChange = (checked) => {
    setIsActive(checked);
    onChange({ target: { name: "active", value: checked } });
  };

  const handleRetiredChange = (checked) => {
    setIsRetired(checked);
    onChange({ target: { name: "retired", value: checked } });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    onChange({
      target: {
        name: "gender",
        value: e.target.value, // Update the gender field in the parent formData
      },
    });
  };

  const handleShiftChange = (e) => {
    const shiftId = e.target.value;
    const shift = shiftTypes.find((shift) => shift.id === parseInt(shiftId));
    if (shift) {
      setSelectedShift(shift);
      const shiftStart = new Date(`1970-01-01T${shift.start}:00`);
      const shiftEnd = new Date(`1970-01-01T${shift.end}:00`);
      const diff = shiftEnd - shiftStart;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const workHours = `${hours}h ${minutes}m`;

      const updatedEmployeeShift = [{ shift_id: shiftId }];
      onChange({ target: { name: "employeeShift", value: updatedEmployeeShift } });
      onChange({ target: { name: "shiftTime", value: `${shift.start} - ${shift.end}` } });
      onChange({ target: { name: "workHours", value: workHours } });
    }
  };

 
  const calculateWorkHours = (start, end) => {
    const shiftStart = new Date(`1970-01-01T${start}:00`);
    let shiftEnd = new Date(`1970-01-01T${end}:00`);

    // If shift end time is before shift start time, it means the shift spans across midnight
    if (shiftEnd <= shiftStart) {
      shiftEnd = new Date(shiftEnd.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours to shift end time
    }

    const diff = shiftEnd - shiftStart;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };


  const handleDepartmentChange = (e) => {

    const departmentId = e.target.value;
    const department = departmentTypes.find((department) => department.id === parseInt(departmentId));
    onChange({ target: { name: "department_id", value: e.target.value } })
    dispatch(fetchDesignations(departmentId));
  }

  const handleCopyAddressChange = (e) => {
    const isChecked = e.target.checked;
    setCopyAddress(isChecked);
    if (isChecked) {
      onChange({ target: { name: "temp_address", value: formData.permanent_address } });
    } else {
      onChange({ target: { name: "temp_address", value: "" } });
    }
  };

  const handlePnoChange = (e) => {
    const newPno = e.target.value;
    setPno(e.target.value);
    onChange({ target: { name: "pno", value: `${pnoSuffix}${newPno}`  } });
  };
  
  const handleSuffixChange = (e) => {
    const newSuffix = e.target.value;
    setPnoSuffix(newSuffix);
    onChange({ target: { name: "pno", value: `${newSuffix}${pno}` } });
  };
  
  return (
    <div className="personal-tab">
      <div className="row">
        <div className="col-md-3">
          <CustomDropdown
            label="Branch Type"
            name="branch_id"
            options={branchTypes}  // Updated dropdown options
            value={formData.branch_id}
            onChange={onChange}
            required
          />
          <TextInput
            label="EMP ID"
            name="emp_id"
            value={formData.emp_id}
            onChange={onChange}
            required
          />
          {/* <TextInputWithPrefixSuffix
          id={id}
            label="PNO"
            name="pno"
            type="number"
            value={formData.pno}
            onChange={(e) => handlePNOChange(e, "pno")}
            required={true}
            prefix={formData.pnoSuffix}
            onPrefixChange={(e) => handlePNOChange(e, "pnoSuffix")}
          /> */}
          {/* TextInputWithPrefixSuffix usage */}

          <TextInputWithPrefixSuffix
  label="PNO"
  value={pno}
  onChange={handlePnoChange} // Corrected handler
  onPrefixChange={handleSuffixChange}
  prefix={pnoSuffix}
  required
  type="text"
  placeholder="Enter PNO"
/>

          <TextInput
            label="TNO"
            name="tno"
            // type="number"
            value={formData.tno}
            onChange={onChange}
            required
          />
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <DatePicker
            label="Date of Birth"
            name="dob"
            //value={formData.join_trainee}
            value={datePickerFormats(formData.dob)}
            onChange={onChange}
            required
          />

          <TextInput
            label="Nominee"
            name="nominee"
            value={formData.nominee}
            onChange={onChange}
          />
          <CustomDropdown
            label="Blood Group"
            name="blood_group"
            options={bloodTypeOptions}
            value={formData.blood_group}
            onChange={onChange}
            required={true}
          />
          {/* Gender Radio Button Group */}
          <CustomRadioButtonGroup
            label="Gender"
            name="gender"
            options={genderOptions}
            value={formData.gender}
            onChange={handleGenderChange}
          />
        </div>

        <div className="col-md-3">
          <RichTextField
            label="Permanent Address"
            name="permanent_address"
            value={formData.permanent_address}
            onChange={onChange}
            required
          />
          <Form.Check
            type="checkbox"
            label="Same as Permanent Address"
            checked={copyAddress}
            onChange={handleCopyAddressChange}
            style={{ fontSize: '14px', marginTop: '2rem', marginBottom: '1.5rem' }}
          />
          <RichTextField
            label="Present Address"
            name="temp_address"
            value={formData.temp_address}
            onChange={onChange}
          />
          {/* <TextInput
            label="Mobile Number"
            name="mob_no"
            type="mobile"
            value={formData.mob_no}
            onChange={onChange}
            required
          /> */}
          <div className="d-flex gap-3">
            <TextInput
              label="Country"
              name="mob_no"
              type="number"
              value={formData.mob_no}
              onChange={onChange}
              //allowDecimal={true}
              width="80px"
            />
            <TextInput
              label="Mobile Number"
              name="mob_no"
              type="mobile"
              value={formData.mob_no}
              onChange={onChange}
              //allowDecimal={true}
              width="100%"
            />
          </div>
          {/* <TextInput
            label="Alternate Mobile Number"
            name="alt_mob_no"
            type="mobile"
            value={formData.alt_mob_no}
            onChange={onChange}
          /> */}
          <div className="d-flex gap-3">
            <TextInput
              label="Country"
              name="alt_mob_no"
              type="number"
              value={formData.alt_mob_no}
              onChange={onChange}
              //allowDecimal={true}
              width="80px"
            />
            <TextInput
              label="Alternate Mobile Number"
              name="alt_mob_no"
              type="mobile"
              value={formData.alt_mob_no}
              onChange={onChange}
              //allowDecimal={true}
              width="100%"
            />
          </div>
          <TextInput
            label="Spouse Name"
            name="spouse_name"
            value={formData.spouse_name}
            onChange={onChange}
          />
          <TextInput
            label="Father/Husband Name"
            name="father_hus_name"
            value={formData.father_hus_name}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-3">
          <div className="mb-4">
            <ToggleSwitch
              label="Enable Active"
              isChecked={isActive}
              onChange={handleActiveChange}
            />
            <h6 style={{ fontSize: '14px' }}>Employe Status: {isActive ? 'ON' : 'OFF'}</h6>
          </div>

          <CustomDropdown
            label="Department Type"
            name="department_id"
            options={departmentTypes}  // Updated dropdown options
            value={formData.department_id}
            onChange={handleDepartmentChange}
            required
          />
          <CustomDropdown
            label="Designation Type"
            name="designation_id"
            options={designations}  // Updated dropdown options
            value={formData.designation_id}
            onChange={onChange}
            required
          />
          <DatePicker
            label="Date of Joining Training"
            name="join_trainee"
            //value={formData.join_trainee}
            value={datePickerFormats(formData.join_trainee)}
            onChange={onChange}
            required
          />
          <DatePicker
            label="Date of Joining Staff"
            name="join_staff"
            //value={formData.join_staff}
            value={datePickerFormats(formData.join_staff)}
            onChange={onChange}
          />
          <TextInput
            label="Retirement Age"
            name="retire_age"
            type="number"
            value={formData.retire_age}
            onChange={onChange}
          />
          <DatePicker
            label="Retirement Date"
            name="retire_date"
            value={datePickerFormats(formData.retire_date)}
            onChange={onChange}
          />
        </div>
        <div className="col-md-3">
          <div className="mb-4">
            <ToggleSwitch
              label="Retired"
              isChecked={isRetired}
              onChange={handleRetiredChange}
            />
            <h6 style={{ fontSize: '14px' }}> Status: {isRetired ? 'ON' : 'OFF'}</h6>
          </div>
          {/* <TextInput
            label="PNO"
            name="pno"
            // type="number"
            value={formData.pno}
            onChange={onChange}
            required
          /> */}

          <CustomDropdown
            label="Shift Type"
            name="shift_id"
            options={shiftTypes}  // Updated dropdown options
            //value={formData.employeeShift.shift_id}
            value={formData.employeeShift?.[0]?.shift_id || ''}
            onChange={handleShiftChange}
            required
          />
          <TextInput
            label="Shift Time"
            name="shiftTime"
            value={selectedShift ? `${selectedShift.start} - ${selectedShift.end}` : 'Select a shift'}
            onChange={onChange}
            required
            readOnly
          />
          <TextInput
            label="Work Hours"
            name="workHours"
            value={selectedShift ? calculateWorkHours(selectedShift.start, selectedShift.end) : 'Select a shift'}
            onChange={onChange}
            required
            readOnly
          />
        </div>
      </div>

    </div>
  );
};

export default PersonalTab;
