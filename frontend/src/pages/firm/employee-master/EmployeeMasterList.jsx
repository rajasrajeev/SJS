import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/dashboard/PageTitle';
import { deleteEmployee, fetchEmployees } from '../../../features/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import BackendTable from '../../../components/table/BackendTable';
import SearchDropdowns from '../../../components/table/SearchDropdowns';
import { dateFormat } from '../../../utils/dateFormat';

const EmployeeMasterList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((store) => store.employee);

  const columns = [
    {
      name: 'SlNo',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '100px',
    },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Spouse Name', selector: row => row.spouse_name, sortable: true },
    { name: 'Father/Husband Name', selector: row => row.father_hus_name, sortable: true },
    { name: 'Mobile Number', selector: row => row.mob_no, sortable: true },
    { name: 'Department', selector: row => row.department.name, sortable: true },
    { name: 'Date of Joining Staff', selector: row => dateFormat(row.join_staff), sortable: true },
    { name: 'PNO', selector: row => row.pno, sortable: true },
    { name: 'TNO', selector: row => row.tno, sortable: true },
  ];

  // const data = [
  //     // Sample data
  //     {
  //         id: 1,
  //         name: 'John Doe',
  //         spouseName: 'Jane Doe',
  //         fatherHusbandName: 'Richard Roe',
  //         mobileNumber: '1234567890',
  //         department: 'HR',
  //         joiningTrainingDate: '2022-01-01',
  //         joiningStaffDate: '2022-06-01',
  //         retirementAge: 60,
  //         retirementDate: '2042-01-01',
  //         pno: 'PNO123',
  //         tno: 'TNO123',
  //     },
  //     // Add more data as needed
  // ];

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ branch_id: '', department_id: '', designation_id: '' });

  useEffect(() => {
    dispatch(fetchEmployees({
      page: page,
      perPage: perPage,
      search: search,
      filters: filters
    }));
    // console.log("Employee Data in list", JSON.stringify(employees));
  }, []);

  const handleEdit = (row) => {
    navigate(`/firm-dashboard/edit-employee/${row.id}`);
  };

  const handleDelete = (row) => {
    // Implement delete logic here
    // console.log('Delete', row);
    dispatch(deleteEmployee(row.id))
  };


  const handleSearch = (e) => {
    if (e.target) {
      setPage(1);
      setSearch(e.target.value);
      dispatch(fetchEmployees({
        page: 1,
        perPage: perPage,
        search: e.target.value,
        filters: filters
      }));
    } else {
      setFilters(e);
      setPage(1);
      dispatch(fetchEmployees({
        page: 1,
        perPage: perPage,
        search: search,
        filters: e
      }));
    }
  };

  const handlePageChange = newPage => {
    setPage(newPage);
    dispatch(fetchEmployees({
      page: newPage,
      perPage: perPage,
      search: search,
      filters: filters
    }));
  }

  const handlePerRowsChange = async (newPerPage, newPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
    dispatch(fetchEmployees({
      page: newPage,
      perPage: newPerPage,
      search: search,
      filters: filters
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    dispatch(fetchEmployees({
      page: 1,
      perPage: perPage,
      search: search,
      filters: newFilters
    }));
  };

  const SearchDropdownsfilters = () => {
    return (<>
      < SearchDropdowns
        onBranchChange={handleBranchChange}
        onDepartmentChange={handleDepartmentChange}
        onDesignationChange={handleDesignationChange}
      />
    </>)
  }
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
    console.log("Branch ID:" + branchId);
    handleSearch({ branch_id: branchId, department_id: selectedDepartment, designation_id: selectedDesignation });
  };

  const handleDepartmentChange = (departmentId) => {
    setSelectedDepartment(departmentId);
    handleSearch({ branch_id: selectedBranch, department_id: departmentId, designation_id: selectedDesignation });
  };

  const handleDesignationChange = (designationId) => {
    setSelectedDesignation(designationId);
    handleSearch({ branch_id: selectedBranch, department_id: selectedDepartment, designation_id: designationId });
  };

  return (
    <div className='mt-4'>
      <PageTitle
        title="Employee Master List"
        iname="bx bx-cog"
      />
      <BackendTable
        columns={columns}
        data={employees.data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
        loading={loading}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        handleSearch={handleSearch}
        search={search}
        total={employees?.meta && employees?.meta.total}
        addButton={{
          show: true,
          text: 'Employee',
          onClick: () => navigate('/firm-dashboard/employee-master'),
        }}
        handleFilterChange={handleFilterChange}
        searchDropdowns={true}
        filters={SearchDropdownsfilters}
      />
    </div>
  );
};

export default EmployeeMasterList;