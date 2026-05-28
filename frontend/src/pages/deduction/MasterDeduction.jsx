import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import BackendTable from '../../components/table/BackendTable';
import { fetchMasterDeductions } from '../../features/deductionMasterSlice';
import ConfirmationDialog from '../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import MasterDeductionModal from './MasterDeductionModal';
import CustomDropdown from '../../components/form/CustomDropdown ';
import { deleteDeduction, fetchDeductions } from '../../features/deductionSlice';
import { fetchEmployees } from '../../features/employeeSlice';
import { fetchDepartments } from '../../features/departmentSlice';

const MasterDeduction = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Fixed: Use the correct slice names from debug info
    const deductionMainState = useSelector((store) => store.deductionMain || {});
    const { deductionMain, loading, error, deductionSuccess } = deductionMainState;
    
    // ✅ Extract deductionMains from the correct structure
    const deductionMains = deductionMain;

    // ✅ Get dropdown filter data (deduction) with better error handling
    const deductionSliceState = useSelector((store) => store.deduction || {});
    const { deduction: deductions, loading: deductionLoading, error: deductionError } = deductionSliceState;

    const employeeSliceState = useSelector((store) => store.employee || {});
    const employees = employeeSliceState.employees?.data || [];

    // ✅ Fixed: Add safety checks for data mapping
    const summaryData = React.useMemo(() => {
        if (!deductionMains?.data || !Array.isArray(deductionMains.data)) {
            return [];
        }
        
        return deductionMains.data.map(item => ({
            id: item.id,
            deduction_name: item.deduction?.name || "N/A",
            department_name: item.department?.name || "N/A",
            employee_count: item.deductionEmployeeMonthlyMaster?.length || 0,
            month: item.month,
            active: item.active,
            raw: item
        }));
    }, [deductionMains]);

    const columns = [
        { name: 'SlNo', selector: (row, index) => index + 1, width: '100px' },
        { name: 'Deduction Name', selector: row => row.deduction_name, sortable: true },
        { name: 'Department Name', selector: row => row.department_name, sortable: true },
        { name: 'Employee Count', selector: row => row.employee_count, sortable: true },
        {
            name: 'Month',
            selector: row =>
                row.month ? new Date(row.month).toLocaleString('default', { month: 'long', year: 'numeric' }) : "N/A",
            sortable: true
        },
        {
            name: "Active",
            selector: (row) => row.active,
            cell: (row) =>
                row.active ? (
                    <i className="bi bi-check-circle-fill" style={{ color: "green" }}></i>
                ) : (
                    <i className="bi bi-x-circle-fill" style={{ color: "red" }}></i>
                )
        },
    ];

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [selectedDeductionFilter, setSelectedDeductionFilter] = useState(null);
    const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState(null);
    const [unwantedFilter, setUnwantedFilter] = useState(false);
    const [unrecoverFilter, setUnrecoverFilter] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ Fixed: Separate effect for initial data loading
    useEffect(() => {
        dispatch(fetchDeductions({
                page: page,
                perPage: perPage,
                search: search
            })); // for dropdown filter
        dispatch(fetchEmployees({ page: 1, perPage: 1000 })); // fetch employees for dropdown
    }, [dispatch, page, perPage, search]);

    useEffect(() => {
        dispatch(fetchDepartments()); // optional if departments used elsewhere
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchMasterDeductions()); // optional if departments used elsewhere
    }, [dispatch]);

    // ✅ Fixed: Separate effect for master deductions with proper dependencies
    useEffect(() => {
        dispatch(fetchDeductions({
            page,
            perPage,
            search,
            deduction_id: selectedDeductionFilter ? selectedDeductionFilter.id : undefined,
            emp_id: selectedEmployeeFilter ? selectedEmployeeFilter.id : undefined,
            unwanted: unwantedFilter,
            unrecover: unrecoverFilter
        }));
    }, [dispatch, page, perPage, search, selectedDeductionFilter, selectedEmployeeFilter, unwantedFilter, unrecoverFilter]);

    const handleEdit = (row) => {
        setSelectedItem(row.raw);
        setIsModalOpen(true);
    };

    const handleDelete = (row) => {
        setIsDialogOpen(true);
        setSelectedItem(row.id);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    const handleEmpCancel = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    // ✅ Fixed: Use correct action for deletion and refresh data
    const handleDeleteConfirm = async () => {
        try {
            await dispatch(deleteDeduction(selectedItem));
            // Refresh the data after successful deletion
            dispatch(fetchDeductions({
                page: page,
                perPage: perPage,
                search: search
            }));
        } catch (error) {
            console.error('Error deleting deduction:', error);
        } finally {
            setIsDialogOpen(false);
            setSelectedItem(null);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        setPage(1);
        // The useEffect will handle the dispatch when search changes
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        // The useEffect will handle the dispatch when page changes
    };

    const handlePerRowsChange = (newPerPage, newPage) => {
        setPage(newPage);
        setPerPage(newPerPage);
        // The useEffect will handle the dispatch when perPage changes
    };

    const filters = () => (
        <>
            <div className="form-check filter-box-item">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={unwantedFilter}
                    onChange={(e) => setUnwantedFilter(e.target.checked)}
                    id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Unwanted
                </label>
            </div>
            <div className="form-check filter-box-item">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={unrecoverFilter}
                    onChange={(e) => setUnrecoverFilter(e.target.checked)}
                    id="flexCheckDefault2"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault2">
                    Unrecover
                </label>
            </div>
            <div className="filter-box-item">
                <CustomDropdown
                    label=""
                    label2="Deduction"
                    name="deduction"
                    options={Array.isArray(deductions) ? deductions : []}
                    value={selectedDeductionFilter}
                    onChange={(e) => {
                        const selected = deductions.find(d => d.id === e.target.value || d.id === Number(e.target.value));
                        setSelectedDeductionFilter(selected || null);
                    }}
                />
            </div>
            <div className="filter-box-item">
                <CustomDropdown
                    label=""
                    label2="Emp Id"
                    name="emp_id"
                    options={Array.isArray(employees) ? employees : []}
                    value={selectedEmployeeFilter}
                    onChange={(e) => {
                        const selected = employees.find(emp => emp.id === e.target.value || emp.id === Number(e.target.value));
                        setSelectedEmployeeFilter(selected || null);
                    }}
                />
            </div>
        </>
    );
    
    return (
        <>
            <div className='mt-4'>
                <PageTitle title="Master Deduction" iname="bx bx-cog" />

                {/* ✅ Added: Error display for both master and deduction errors */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        Master Deduction Error: {error}
                    </div>
                )}
                {deductionError && (
                    <div className="alert alert-warning" role="alert">
                        Deduction Dropdown Error: {deductionError}
                    </div>
                )}

                <BackendTable
                    columns={columns}
                    data={summaryData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showActions={true}
                    loading={loading}
                    handlePageChange={handlePageChange}
                    handlePerRowsChange={handlePerRowsChange}
                    handleSearch={handleSearch}
                    search={search}
                    total={deductionMains?.meta?.total || 0}
                    importExcel={{
                        show: true,
                        onClick: () => navigate('/firm-dashboard/deduction/master-deduction'),
                    }}
                    exportExcel={{
                        show: true,
                        onClick: () => navigate('/firm-dashboard/deduction/master-deduction'),
                    }}
                    print={{
                        show: true,
                        onClick: () => navigate('/firm-dashboard/deduction/master-deduction'),
                    }}
                    addButton={{
                        show: true,
                        text: "add",
                        onClick: () => {
                            setSelectedItem(null);
                            setIsModalOpen(true);
                        },
                    }}
                    filters={filters}
                />
            </div>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                title="Are you sure?"
                message="This action cannot be undone"
                onConfirm={handleDeleteConfirm}
                onCancel={handleCancel}
            />

            <MasterDeductionModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selectedItem}
                deductions={Array.isArray(deductions) ? deductions : []}
            />
        </>
    );
};

export default MasterDeduction;