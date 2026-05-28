import React, { useEffect, useState } from 'react'
import CustomTable from '../../../components/table/CustomTable';
import TextInput from '../../../components/form/TextInput';
import PageTitle from '../../../components/dashboard/PageTitle';
import { clearDepartment, createDepartment, deleteDepartment, fetchDepartments } from '../../../features/departmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import UpdateModal from './UpdateModal';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';


const DepartmentMaster = () => {
    const dispatch = useDispatch();
    const [departmentName, setDepartmentName] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const { departments, loading, error, departmentSuccess } = useSelector((store) => store.department);
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchDepartments());

        return () => {
            dispatch(clearDepartment());
        }
    }, []);

    useEffect(() => {
        setDepartmentName('');
        setDepartmentCode('');
    }, [departments]);

    useEffect(() => {
        setFilteredData(
            departments.filter((item) => {
                const name = item.code?.toLowerCase() || ""; // Handle null/undefined
                const code = item.name?.toLowerCase() || ""; // Handle null/undefined

                return (
                    name.includes(search) ||
                    code.includes(search)
                );
            })
        );
    }, [search, departments]);


    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleAddDepartment = (e) => {
        e.preventDefault();

        if (departmentName.trim() === '' || departmentCode.trim() === '') {
            return;
        }

        dispatch(createDepartment({
            name: departmentName,
            code: departmentCode
        }));
    };

    const handleEditDepartment = (department) => {
        dispatch(clearDepartment());
        setSelected(department);
        setIsModalOpen(true);
    };

    const handleDeleteDepartment = (department) => {
        setSelected(department);
        setIsDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteDepartment(selected.id));
        setIsDialogOpen(false);
        setSelected(null);
    }

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSelected(null);
    }

    const columns = [
        { name: 'SlNo', selector: (row, index) => index + 1, sortable: true, width: '100px' },
        {
            name: 'Department Name',
            selector: (row) => row.name,
            sortable: true,
            width: '300px',
        },
        {
            name: 'Department Code',
            selector: (row) => row.code,
            sortable: true,
            width: '300px',
        },
    ];

    return (
        <>
            <div className="add-department mt-4">
                <PageTitle
                    title="Department Master"
                    iname="bi bi-briefcase-fill"
                />
                <form action="">
                    <div className='row mb-4'>
                        <div className='col-md-3'>
                            <TextInput
                                label="Department Name"
                                name="departmentName"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                required
                                type='text'
                            />
                        </div>
                        <div className='col-md-3'>
                            <TextInput
                                label="Department Code"
                                name="departmentCode"
                                value={departmentCode}
                                onChange={(e) => setDepartmentCode(e.target.value)}
                                required
                                type='text'

                            />
                        </div>
                        <div className='col-md-3' style={{ marginTop: '20px' }}>
                            <button className="add-department-button" onClick={handleAddDepartment}>
                                Submit
                            </button>
                        </div>
                    </div>
                    {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                    {departmentSuccess ? <DismissableAlert
                        variant='success'
                        title="success"
                        msg="Save completed succesfully" />
                        : null}
                </form>
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    onEdit={handleEditDepartment}
                    onDelete={handleDeleteDepartment}
                    showActions={true}
                    showSearchBar={true}
                    handleSearch={handleSearch}
                    onView={() => alert("Will implement soon")}
                />
            </div>
            <ConfirmationDialog
                isOpen={isDialogOpen}
                title="Are you sure?"
                message="This action cannot be undone"
                onConfirm={handleDeleteConfirm}
                onCancel={handleCancel}
            />
            <UpdateModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selected}
            />
        </>
    );
};

export default DepartmentMaster;