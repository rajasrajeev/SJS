import React, { useEffect, useState, useRef } from "react";
import TextInput from "../../../../components/form/TextInput";
import DatePicker from "../../../../components/form/DatePicker";
import CustomDropdown from "../../../../components/form/CustomDropdown ";
import { fetchDesignations } from "../../../../features/designationSlice";
import { useDispatch, useSelector } from 'react-redux';
import { datePickerFormats } from "../../../../utils/dateFormat";
import Form from 'react-bootstrap/Form';
import TextInputWithPrefixSuffix from "../../../../components/form/TextInputWithPrefixSuffix";
import ImageUpload from "../../../../components/form/ImageUpload";
import DefaultLogo from '../../../../assets/100.png';


const PersonalTab = ({ formData, onChange, shiftTypes, departmentTypes, branchTypes, designationTypes, id }) => {
  const dispatch = useDispatch();
  const [selectedShift, setSelectedShift] = useState(null);
  const prevDepartmentIdRef = useRef();
  const { designations } = useSelector((store) => store.designation);
  const [gender, setGender] = useState(formData.gender || "");
  const [copyAddress, setCopyAddress] = useState(false);
  const [pno, setPno] = useState(""); // The combined value (pno + pnoSuffix)
  const [pnoSuffix, setPnoSuffix] = useState(""); // The suffix

  // const genderOptions = [
  //   { value: "MALE", label: "Male" },
  //   { value: "FEMALE", label: "Female" },
  //   { value: "OTHER", label: "Other" },
  // ];
  const genderOptions = [
    { id: "MALE", name: "Male" },
    { id: "FEMALE", name: "Female" },
    { id: "OTHER", name: "Other" },
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
      onChange({ target: { name: "temp_house_name", value: formData.house_name } });
      onChange({ target: { name: "temp_house_no", value: formData.house_no } });
      onChange({ target: { name: "temp_street", value: formData.street } });
      onChange({ target: { name: "temp_place", value: formData.place } });
      onChange({ target: { name: "temp_pincode", value: formData.pincode } });
      onChange({ target: { name: "temp_state", value: formData.state } });
      onChange({ target: { name: "temp_country", value: formData.country } });
    } else {
      onChange({ target: { name: "temp_house_name", value: "" } });
      onChange({ target: { name: "temp_house_no", value: "" } });
      onChange({ target: { name: "temp_street", value: "" } });
      onChange({ target: { name: "temp_place", value: "" } });
      onChange({ target: { name: "temp_pincode", value: "" } });
      onChange({ target: { name: "temp_state", value: "" } });
      onChange({ target: { name: "temp_country", value: "" } });
    }
  };

  const handlePnoChange = (e) => {
    const newPno = e.target.value;
    setPno(e.target.value);
    onChange({ target: { name: "pno", value: `${pnoSuffix}${newPno}` } });
  };

  const handleSuffixChange = (e) => {
    const newSuffix = e.target.value;
    setPnoSuffix(newSuffix);
    onChange({ target: { name: "pno", value: `${newSuffix}${pno}` } });
  };

  const handleImageChange = (e) => {
    const { name, value, type } = e.target;

    // if (type === 'file') {
    //     setFormData({
    //         ...formData,
    //         "logo": e.target.files[0],
    //     });
    // } else {
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // }
  };

  return (
    <div className="personal-tab">
      <div className="row">
        <div className=" col-md-3 personal-tab-container">
          <ImageUpload
            className=""
            label="Logo"
            name="logo"
            defaultImage={DefaultLogo}
            handleChange={handleImageChange}
            leftLabel={true}
          />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4 col-lg-3">
                  <TextInput
                    label="EMP ID"
                    name="emp_id"
                    value={formData.emp_id}
                    onChange={onChange}
                    required
                    leftLabel={true}
                  />
            </div>
            <div className="col-md-4 col-lg-3">
                  <TextInputWithPrefixSuffix
                    label="PNO"
                    value={pno}
                    onChange={handlePnoChange}
                    onPrefixChange={handleSuffixChange}
                    prefix={pnoSuffix}
                    required
                    type="text"
                    placeholder=" No:"
                    leftLabel={true}
                  />
                </div>
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-2">
              <CustomDropdown
                label="Gender"
                name="gender"
                options={genderOptions}
                value={formData.gender}
                onChange={onChange}
                required={true}
                leftLabel={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <DatePicker
                label="DOB"
                name="dob"
                value={datePickerFormats(formData.dob)}
                onChange={onChange}
                required
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <TextInput
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={onChange}
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <TextInput
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={onChange}
                leftLabel={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Father Name"
                name="father_hus_name"
                value={formData.father_hus_name}
                onChange={onChange}
                required
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Spouse Name"
                name="spouse_name"
                value={formData.spouse_name}
                onChange={onChange}
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Nominee Name"
                name="nominee"
                value={formData.nominee}
                onChange={onChange}
                leftLabel={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <CustomDropdown
                label="Department"
                // label2="one"
                name="department_id"
                options={departmentTypes}
                value={formData.department_id}
                onChange={handleDepartmentChange}
                required
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <CustomDropdown
                label="Designation"
                // label2="one"
                name="designation_id"
                options={designations}
                value={formData.designation_id}
                onChange={onChange}
                required
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <CustomDropdown
                label="Blood Group"
                // label2="one"
                name="blood_group"
                options={bloodTypeOptions}
                value={formData.blood_group}
                onChange={onChange}
                required={true}
                leftLabel={true}
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <CustomDropdown
                label="Branch"
                // label2="one"
                name="branch_id"
                options={branchTypes}  // Updated dropdown options
                value={formData.branch_id}
                onChange={onChange}
                required
                leftLabel={true}
              />
            </div>
            {/* <div className="col-md-2">
              <TextInput
                label="TNO"
                name="tno"
                value={formData.tno}
                onChange={onChange}
                required
                leftLabel={true}
              />
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <div className="d-flex gap-1">
                <TextInput
                  label="Mobile"
                  name="mob_no"
                  value={formData.mob_no}
                  onChange={onChange}
                  width="100px"
                  leftLabel={true}
                />
                <TextInput
                  label=""
                  name="mob_no"
                  type="mobile"
                  value={formData.mob_no}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-4">
              <div className="d-flex gap-1">
                <TextInput
                  label="Alter Mobile"
                  name="alt_mob_no"
                  value={formData.alt_mob_no}
                  onChange={onChange}
                  width="100px"
                  leftLabel={true}
                />
                <TextInput
                  label=""
                  name="alt_mob_no"
                  type="mobile"
                  value={formData.alt_mob_no}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                width="80%"
                leftLabel={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-6 mt-0 pt-0">
          <div className="d-block gap-3 p-3" style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
            <h6>Permanent Address</h6>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="House Name"
                  name="house_name"
                  value={formData.house_name}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="House No"
                  name="house_no"
                  value={formData.house_no}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Street Name"
                  name="street"
                  value={formData.street}
                  onChange={onChange}
                  leftLabel={true}
                />

              </div>
              <div className="col-md-6">
                <TextInput
                  label="Place"
                  name="place"
                  value={formData.place}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">

                <TextInput
                  label="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="state"
                  name="state"
                  value={formData.state}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="country"
                  name="country"
                  value={formData.country}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 mt-0 mb-4">
          <div className="d-block gap-3" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: "0px 20px"}}>
            <div className="row">
              <div className="col">
                <h6 style={{marginTop: '20px'}}>Present Address</h6>
              </div>
              <div className="col">
                <Form.Check
                  type="checkbox"
                  label="Same as Permanent Address"
                  checked={copyAddress}
                  onChange={handleCopyAddressChange}
                  style={{ fontSize: '14px', marginTop: '20px', marginBottom: '1rem' }}
              />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="House Name"
                  name="temp_house_name"
                  value={formData.temp_house_name}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="House No"
                  name="temp_house_no"
                  value={formData.temp_house_no}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="Street Name"
                  name="temp_street"
                  value={formData.temp_street}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="Place"
                  name="platemp_placece"
                  value={formData.temp_place}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextInput
                  label="pincode"
                  name="temp_pincode"
                  value={formData.temp_pincode}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  label="state"
                  name="temp_state"
                  value={formData.temp_state}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">

                <TextInput
                  label="country"
                  name="countemp_countrytry"
                  value={formData.temp_country}
                  onChange={onChange}
                  leftLabel={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-md-3 col-lg-3 mt-4">

        </div> */}
      </div>
      <div className="row">
        <div className="col-md-4 col-lg-4 col-xl-4">
          <DatePicker
            label="Date of Joining Training"
            name="join_trainee"
            //value={formData.join_trainee}
            value={datePickerFormats(formData.join_trainee)}
            onChange={onChange}
            required
            leftLabel={true}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-xl-4">
          <DatePicker
            label="Date of Joining Staff"
            name="join_staff"
            //value={formData.join_staff}
            value={datePickerFormats(formData.join_staff)}
            onChange={onChange}
            leftLabel={true}
          />

        </div>
        {/* <div className="col-md-2">
          <TextInput
            label="Retirement Age"
            name="retire_age"
            type="number"
            value={formData.retire_age}
            onChange={onChange}
            leftLabel={true}
          />
        </div> */}
        <div className="col-md-4 col-lg-4 col-xl-4">
          <DatePicker
            label="Retirement Date"
            name="retire_date"
            value={datePickerFormats(formData.retire_date)}
            onChange={onChange}
            leftLabel={true}
          />
        </div>

      </div>
      <div className="row">
        <div className="col-md-4 col-lg-4 col-xl-3">
          <CustomDropdown
            label="Shift Type"
            name="shift_id"
            options={shiftTypes}  // Updated dropdown options
            //value={formData.employeeShift.shift_id}
            value={formData.employeeShift?.[0]?.shift_id || ''}
            onChange={handleShiftChange}
            required
            leftLabel={true}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-xl-3">
          <TextInput
            label="Shift Time"
            name="shiftTime"
            value={selectedShift ? `${selectedShift.start} - ${selectedShift.end}` : 'Select a shift'}
            onChange={onChange}
            required
            readOnly
            leftLabel={true}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-xl-3">
          <TextInput
            label="Work Hours"
            name="workHours"
            value={selectedShift ? calculateWorkHours(selectedShift.start, selectedShift.end) : 'Select a shift'}
            onChange={onChange}
            required
            readOnly
            leftLabel={true}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-xl-3">
          <TextInput
            label="Week Off"
            name="weekoff"
            value={formData.weekoff}
            onChange={onChange}
            required
            readOnly
            leftLabel={true}
          />
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-2">
          <div className="mb-4">
            <ToggleSwitch
              label="Enable Active"
              isChecked={isActive}
              onChange={handleActiveChange}
            />
            <h6 style={{ fontSize: '14px' }}>Employe Status: {isActive ? 'ON' : 'OFF'}</h6>
          </div>
        </div>
        <div className="col-md-2">
          <div className="mb-4">
            <ToggleSwitch
              label="Retired"
              isChecked={isRetired}
              onChange={handleRetiredChange}
            />
            <h6 style={{ fontSize: '14px' }}> Status: {isRetired ? 'ON' : 'OFF'}</h6>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default PersonalTab;


// Employeemaster.scss
// .personal-tab-container{
//     width: 230px;
//     height: 200px;
//       .image-preview-img {
//           width: 200px;
//           height: 200px;
//       }
//       .icon-container {
//         margin-left: -25px;
//       }
//   }
  
//   #gender {
//     width: auto;
//   }

// Textinput with prefix
// .same-row {
//     display: flex ;
//     flex-direction: row ;
  
//     label {
//       width: 125px ;
//       margin-top: 8px ;
//     }
//   }