import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WagesTab from "./tabs/WagesTab";
import CategoryTab from "./tabs/CategoryTab";
import BankTab from "./tabs/BankTab";
import StatutoryTab from "./tabs/StatutoryTab";
import PdfTab from "./tabs/PdfTab";
import PersonalTab from "./tabs/PersonalTab";
import PageTitle from "../../../components/dashboard/PageTitle";
import TabNavigation from "../../../components/dashboard/tab/TabNavigation";
import "./EmployeeMaster.scss";
import { useDispatch, useSelector } from 'react-redux';
import { clearShift, fetchShifts } from '../../../features/shiftSlice';
import { fetchDepartments } from '../../../features/departmentSlice';
import { fetchBranches } from '../../../features/branchSlice';
import { clearEmployeeState, createEmployee, fetchEmployeeById, updateEmployee } from '../../../features/employeeSlice';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import QualificationTab from './tabs/QualificationTab';
import ExperienceTab from './tabs/ExperienceTab';
import AddressTab from './tabs/AddressTab';


const EmployeeMaster = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shifts } = useSelector((store) => store.shift);
  const { departments } = useSelector((store) => store.department);
  const { branches } = useSelector((store) => store.branch);
  const { employeeDetail, success, loading, error } = useSelector((store) => store.employee); // Assuming you have an employee slice
  const [activeTab, setActiveTab] = useState("personal"); // Track active tab
  const initialFormData = {
    emp_id: '',
    pno: '',
    tno: '',
    name: '',
    branch_id: '',
    gender: '',
    blood_group: '',
    religion: '',
    age: '',
    dob: '',
    father_name: '',
    spouse_name: '',
    nominee: '',
    join_trainee: '',
    join_staff: '',
    department_id: '',
    designation_id: '',
    retire_date: '',
    // retire_age: '',
    mobile_no: '',
    alt_mobile_no: '',
    email: '',
    active: false,
    retired: false,
    photo:'',
    employeeAddress: [
      {
        house_name: "",
        house_no: "",
        street_name: "",
        place: "",
        pincode: "",
        country_id: "",
        state_id: "",
        //district_id: "0",
        is_permanent: "",
      }
    ],
  //   employeeShift: [{
  //     shift_id: '',
  //     week_off: '',
  // }],
  employeeShift: {
    shift_id: '',
    week_off: '',
  },
    employeeWage: {
      basic1: '',
      increment_percentage: '',
      increment_percentage_value: '',
      service_weightage: '',
      service_weightage_value: '',
      hra: '',
      hra_value: '',
      ltc: '',
      ltc_value: '',
      travel_allowance_percentage: '',
      travel_allowance_value: '',
      attendance_incentive: '',
      attendance_incentive_value: '',
      production_incentive: "",
      production_incentive_value: "",
      medical_allowance: "",
      medical_allowance_value: "",
      washing_allowance: "",
      washing_allowance_value: "",
      other_allowance:"",
      other_allowance_value:"",
      da_type: "Master",
      da: '45645',
      fda: '56',
      vda: '56',
      salary: ''
    },
    employeeCategory: {
      salary_type: ''
    },
    employeeStatutory: {
      is_pf: false,
      uan_no: '',
      pf_no: '',
      //pf_total_percentage: '',
      pf_amount: '',
      vpf_percentage: '',
      // employee_percentage: '',
      //pension_percentage: '',
     // diff_percentage: '',

      //establishment_pf_code: '',

      //pf_celling_amt: '',
      //edli_wages: '',
      // esic_total_percentage: '',
      // esic_employee_percentage:'',
      // esic_employeer_percentage:'',
      //esic_establishment_code:'',
      is_esic: false,
      esic_no: '',
      // esic_celling_amt:'',
      lwf: '',
      other: ''
    },
    employeeLic: [{
      lic_no: '',
      lic_amount: '',
      is_primary: false
    }],
    employeeBank: [{
      bank_name: '',
      branch_name: '',
      ifsc: '',
      account_no: '',
      is_primary: false
    }],
    employeeExperience: [{
      firm_name: '',
      place: '',
      joining_date: '',
      resigning_date: '',
      designation: ''
    }],
    employeeQualification: [{
      qualification: '',
      percentage: '',
      year: '',
      university: ''
    }],
  }
  const [formData, setFormData] = useState(initialFormData);

  // Tabs configuration
  const tabs = [
    { key: "personal", label: "Personal" },
    { key: "address", label: "Address" },
    { key: "wages", label: "Wages" },
    { key: "category", label: "Category" },
    { key: "bank", label: "Bank" },
    { key: "statutory", label: "Statutory" },
    { key: "qualification", label: "Qualification" },
    { key: "experience", label: "Experience" },
    { key: "pdf", label: "PDF" },
  ];


  //Fetch Shifts
  useEffect(() => {
    dispatch(fetchShifts());
    dispatch(fetchDepartments());
    dispatch(fetchBranches());
    if (id) {
      dispatch(fetchEmployeeById(id));
    }
    else {
      clearFormData();
      dispatch(clearEmployeeState());
    }
  }, []);

  useEffect(() => {
    if (!id) {
      clearFormData();  // Reset form when navigating to "Add Employee" page
    }
  }, [id]);

  // Populate form data when employee data is fetched
  useEffect(() => {
  if (employeeDetail) {
    // Normalize employeeShift to always be an object
    let normalizedEmployeeShift = {};
    if (Array.isArray(employeeDetail.employeeShift)) {
      normalizedEmployeeShift = employeeDetail.employeeShift[0] || { shift_id: '', week_off: '' };
    } else {
      normalizedEmployeeShift = employeeDetail.employeeShift || { shift_id: '', week_off: '' };
    }

    setFormData({
      ...employeeDetail,
      employeeShift: normalizedEmployeeShift,
    });

    //Clear Data when page
    return () => {
      dispatch(clearEmployeeState());
    }
  }
}, [employeeDetail]);

  useEffect(() => {
    if (success) {
      clearFormData();
      dispatch(clearEmployeeState());
    }

  }, [success]);
  // Handle tab selection
  const handleSelectTab = (tabKey) => {
    setActiveTab(tabKey);
  };

  // Corrected handleChange to handle nested fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length > 1) {
      setFormData((prev) => {
        const updatedData = { ...prev };
        let current = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
          // Clone nested objects instead of directly referencing them
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        // If dob or retire_age is changed, calculate the retirement date
        if (name === "dob" || name === "retire_age") {
          handleRetirementDateCalculation(updatedData);
        }
        return updatedData;
      });
    }
    //  else {
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));
    // }
    else {
      setFormData((prev) => {
        const updatedFormData = { ...prev, [name]: value };

        // If dob or retire_age is changed, calculate the retirement date
        if (name === "dob" || name === "retire_age") {
          handleRetirementDateCalculation(updatedFormData);
        }

        return updatedFormData;
      });
    }
  };

  // Calculate retirement date based on dob and retire_age
  const handleRetirementDateCalculation = (updatedFormData) => {
    if (updatedFormData.dob && updatedFormData.retire_age) {
      const birthDate = new Date(updatedFormData.dob);  // Employee's birth date
      const retireAge = parseInt(updatedFormData.retire_age);  // Employee's retirement age

      // Add the retirement age to the birth date
      birthDate.setFullYear(birthDate.getFullYear() + retireAge);

      // Update the retirement date in the form data
      setFormData(prevState => ({
        ...prevState,
        retire_date: birthDate.toISOString().split("T")[0],  // Format as YYYY-MM-DD
      }));
    }
  };

  const clearFormData = () => {
   // setFormData(initialFormData);
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSubmit = new FormData();

  for (const key in formData) {
    if (key === "photo" && formData[key]) {
      formDataToSubmit.append(key, formData[key]);
    }
    // Handle arrays (e.g., employeeAddress, employeeBank, etc.)
    else if (Array.isArray(formData[key])) {
      formData[key].forEach((item, index) => {
        // Define allowed fields for each array type
        let allowed = Object.keys(item);
        if (key === "employeeAddress") {
          allowed = [
            "house_name", "house_no", "street_name", "place", "pincode",
            "country_id", "state_id", "district_id", "is_permanent"
          ];
        }
        if (key === "employeeBank") {
          allowed = [
            "bank_name", "branch_name", "ifsc", "account_no", "is_primary"
          ];
        }
        if (key === "employeeLic") {
          allowed = [
            "lic_no", "lic_amount", "is_primary"
          ];
        }
        if (key === "employeeExperience") {
          allowed = [
            "firm_name", "place", "joining_date", "resigning_date", "designation"
          ];
        }
        if (key === "employeeQualification") {
          allowed = [
            "qualification", "percentage", "year", "university"
          ];
        }
        item &&
          allowed.forEach((subKey) => {
            if (item[subKey] !== undefined) {
              formDataToSubmit.append(`${key}[${index}][${subKey}]`, item[subKey]);
            }
          });
      });
    }
    // Handle nested objects (e.g., employeeShift, employeeWage, etc.)
    else if (typeof formData[key] === "object" && formData[key] !== null) {
      // Only include allowed fields for each object
      let allowed = Object.keys(formData[key]);
      if (key === "employeeShift") {
        allowed = ["shift_id", "week_off"];
      }
      if (key === "employeeWage") {
        allowed = [
          "basic1", "increment_percentage", "increment_percentage_value", "service_weightage",
          "service_weightage_value", "hra", "hra_value", "ltc", "ltc_value",
          "travel_allowance_percentage", "travel_allowance_value", "attendance_incentive",
          "attendance_incentive_value", "production_incentive", "production_incentive_value",
          "medical_allowance", "medical_allowance_value", "washing_allowance", "washing_allowance_value",
          "other_allowance", "other_allowance_value", "da_type", "da", "fda", "vda", "salary"
        ];
      }
      if (key === "employeeCategory") {
        allowed = ["salary_type"];
      }
      if (key === "employeeStatutory") {
        allowed = [
          "is_pf", "uan_no", "pf_no", "pf_amount", "vpf_percentage", "is_esic",
          "esic_no", "lwf", "other"
        ];
      }
      formData[key] &&
        allowed.forEach((subKey) => {
          if (formData[key][subKey] !== undefined) {
            formDataToSubmit.append(`${key}[${subKey}]`, formData[key][subKey]);
          }
        });
    }
    // Append other fields
    else {
      formDataToSubmit.append(key, formData[key]);
    }
  }

  // Dispatch the appropriate action
  if (id) {
    dispatch(updateEmployee({ formData: formDataToSubmit, id }));
  } else {
    dispatch(createEmployee(formDataToSubmit));
  }
};

  const validateForm = () => {
    if (activeTab === "personal") {
      const { emp_id, name, gender, dob, father_name, branch_id } = formData;
      return emp_id && name && gender && dob && father_name && branch_id;
    }
  
    if (activeTab === "address") {
      const { employeeAddress } = formData;
      const permanentAddress = employeeAddress.find((addr) => addr.is_permanent);
      const temporaryAddress = employeeAddress.find((addr) => !addr.is_permanent);
  
      return (
        permanentAddress &&
        permanentAddress.house_no &&
        permanentAddress.street_name &&
        permanentAddress.place &&
        permanentAddress.pincode &&
        permanentAddress.state_id &&
        permanentAddress.country_id &&
        temporaryAddress &&
        temporaryAddress.house_no &&
        temporaryAddress.street_name &&
        temporaryAddress.place &&
        temporaryAddress.pincode &&
        temporaryAddress.state_id &&
        temporaryAddress.country_id
      );
    }
  
    if (activeTab === "wages") {
      const { employeeWage } = formData;
      return employeeWage.basic1 && employeeWage.hra && employeeWage.salary;
    }
  
    if (activeTab === "category") {
      const { employeeCategory } = formData;
      return employeeCategory.salary_type;
    }
  
    if (activeTab === "bank") {
      const { employeeBank } = formData;
      return employeeBank.every(
        (bank) => bank.bank_name && bank.account_no && bank.ifsc && bank.branch_name
      );
    }
  
    if (activeTab === "statutory") {
      const { employeeStatutory } = formData;
      return employeeStatutory.is_pf || employeeStatutory.is_esic;
    }
  
    if (activeTab === "qualification") {
      const { employeeQualification } = formData;
      return employeeQualification.every(
        (qualification) =>
          qualification.qualification &&
          qualification.percentage &&
          qualification.year &&
          qualification.university
      );
    }
  
    if (activeTab === "experience") {
      const { employeeExperience } = formData;
      return employeeExperience.every(
        (experience) =>
          experience.firm_name &&
          experience.place &&
          experience.joining_date &&
          experience.resigning_date &&
          experience.designation
      );
    }
  
    return false; // Disable the button for other tabs
  };

  return (
    <div className="mt-4">
      <PageTitle
        title="Employee Master"
        iname="bx bx-building-house"
      />
      {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
      {success ? <DismissableAlert
        variant='success'
        title="success"
        msg="Save completed succesfully" />
        : null}
      <TabNavigation tabs={tabs} activeTab={activeTab} onSelectTab={handleSelectTab} />
      <div className="tab-content mt-4">
        {activeTab === "personal" &&
          <PersonalTab
            formData={formData}
            onChange={handleChange}
            shiftTypes={shifts}
            departmentTypes={departments}
            branchTypes={branches}
            id={id}
          // designationTypes={designations}
          />}
        {activeTab === "address" &&
          <AddressTab
            formData={formData}
            onChange={handleChange}
            shiftTypes={shifts}
            departmentTypes={departments}
            branchTypes={branches}
            id={id}
          // designationTypes={designations}
          />}
        {activeTab === "wages" &&
          <WagesTab
            formData={formData}
            onChange={handleChange}
            id={id}
          />}
        {activeTab === "category" &&
          <CategoryTab
            formData={formData}
            onChange={handleChange}
            salaryOptions={[
              { label: "Monthly", value: "MONTHLY" },
              { label: "Consolidate", value: "CONSOLIDATED" },
              { label: "Labour", value: "LABOUR" },
              { label: "Special Salary", value: "ADJUSTEDSALARY" },
              { label: "Minimum 25% Salary Slip", value: "MINIMUMTWENTYFIVEPERCENTSALARY" },
            ]}
          />}
        {activeTab === "bank" && <BankTab formData={formData} onChange={handleChange} />}
        {activeTab === "statutory" && <StatutoryTab formData={formData} onChange={handleChange} />}
        {activeTab === "qualification" && <QualificationTab formData={formData} onChange={handleChange} />}
        {activeTab === "experience" && <ExperienceTab formData={formData} onChange={handleChange} />}
        {activeTab === "pdf" && <PdfTab formData={formData} />}
      </div>
      <div className="sticky-buttons">
        <button type="submit" className="btn btn-success me-3" onClick={handleSubmit}
        disabled={!(activeTab === "experience" && validateForm())} // Enable only on Experience tab and if validation passes
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmployeeMaster;
