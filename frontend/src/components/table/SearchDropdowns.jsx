import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from '../form/CustomDropdown ';
import { fetchDesignations } from '../../features/designationSlice';
import { fetchDepartments } from '../../features/departmentSlice';
import { fetchBranches } from '../../features/branchSlice';

const SearchDropdowns = ({onBranchChange, onDepartmentChange, onDesignationChange}) => {
  const dispatch = useDispatch();
  const { branches } = useSelector((store) => store.branch);
  const { departments } = useSelector((store) => store.department);
  const { designations } = useSelector((store) => store.designation);

  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDepartments());
    dispatch(fetchDesignations());
  }, [dispatch]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    onBranchChange(branchId);
    
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);
    onDepartmentChange(departmentId);
  };

  const handleDesignationChange = (e) => {
    const designationId = e.target.value;
    setSelectedDesignation(designationId);
    onDesignationChange(designationId);
  };

  return (
    <div className="search-dropdowns d-flex gap-2">
      <CustomDropdown
        label=""
        label2="Branch"
        name="branch_id"
        options={branches}
        value={selectedBranch}
        onChange={handleBranchChange}
      />
      <CustomDropdown
        label=""
        label2="Department"
        name="department_id"
        options={departments}
        value={selectedDepartment}
        onChange={handleDepartmentChange}
      />
      <CustomDropdown
        label=""
        label2="Designation"
        name="designation_id"
        options={designations}
        value={selectedDesignation}
        onChange={handleDesignationChange}
      />
    </div>
  );
};

export default SearchDropdowns;