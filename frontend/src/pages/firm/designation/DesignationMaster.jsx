import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/form/TextInput';
import DatePicker from '../../../components/form/DatePicker';
import CustomTable from '../../../components/table/CustomTable';
import PageTitle from '../../../components/dashboard/PageTitle';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../../../features/departmentSlice';
import { clearDesignation, createDesignation, deleteDesignation, fetchDesignations } from '../../../features/designationSlice';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import UpdateModal from './UpdateModal';
import ViewDesignation from './ViewDesignation';


const DesignationMaster = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        department_id: '',
        code: '',
        name: '',
        effective_date: '',
        basic: ''
    });
    const { departments } = useSelector((store) => store.department);
    const { designations, loading, error, designationSuccess } = useSelector((store) => store.designation);
    const [selected, setSelected] = useState(null);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDes, setIsModalOpenDes] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchDepartments());
        dispatch(fetchDesignations());

        return () => {
            dispatch(clearDesignation());
        }
    }, []);

    useEffect(() => {
        setFormData({
            department_id: '',
            code: '',
            name: '',
            effective_date: '',
            basic: ''
        })
    }, [designations]);

    useEffect(() => {
        setFilteredData(
            designations.filter(
                (item) =>
                    item.department.name?.toLowerCase().includes(search.toLowerCase()) ||
                    item.name?.toLowerCase().includes(search) ||
                    item.basic?.toString().includes(search) ||
                    item.code?.toLowerCase().includes(search.toLowerCase()) ||
                    item.effective_date?.toString().includes(search)
            )
        );
    }, [search, designations]);


    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddDesignation = (e) => {
        e.preventDefault();

        if (formData.code.trim() === '' ||
            formData.name.trim() === '' ||
            formData.effective_date.trim() === '' ||
            formData.department_id === ''
        ) return;

        dispatch(createDesignation(formData));
    };

    const handleEdit = (row) => {
        dispatch(clearDesignation());
        setSelected(row);
        setIsModalOpen(true);
    };
    const handleView = (row) => {
        // dispatch(clearDesignation());
        setSelectedDesignation(row);
        setIsModalOpenDes(true);
    };

    const handleDelete = (row) => {
        setSelected(row);
        setIsDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteDesignation(selected.id));
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
            name: 'Designation Name',
            selector: (row) => row.name,
            sortable: true,
            width: '250px'
        },
        {
            name: 'Designation Code',
            selector: (row) => row.code,
            sortable: true
        },
        {
            name: 'Department',
            selector: (row) => row.department.name,
            sortable: true
        },
        {
            name: 'Basic',
            selector: (row) => row.basic,
            sortable: true
        },
        {
            name: 'Effective Date',
            selector: (row) => row.effective_date,
            sortable: true
        }
    ];

    return (
        <>
            <div className="add-department mt-4">
                <PageTitle
                    title="Designation Master"
                    iname="bi bi-person-badge-fill"
                />
                <form>
                    <div className='row'>
                        <div className='col-md-4 col-lg-3'>
                            <CustomDropdown
                                label="Department"
                                name="department_id"
                                options={departments}
                                value={formData.department_id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-4 col-lg-3'>
                            <TextInput
                                label="Designation Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-4 col-lg-3'>
                            <TextInput
                                label="Designation Code"
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-4 col-lg-3'>
                            <TextInput
                                label="Basic"
                                type="number"
                                name="basic"
                                value={formData.basic}
                                onChange={handleChange}
                                allowDecimal={true}
                            />
                        </div>
                        <div className='col-md-4 col-lg-3'>
                            <DatePicker
                                label="Effective Date"
                                name="effective_date"
                                value={formData.effective_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 ' style={{ marginTop: '20px' }}>
                            <button type="button" onClick={handleAddDesignation}>Submit</button>
                        </div>

                    </div>
                    {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                    {designationSuccess ? <DismissableAlert
                        variant='success'
                        title="success"
                        msg="Save completed succesfully" />
                        : null}
                </form><br />
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                    showActions={true}
                    showSearchBar={true}
                    addButton={{ show: false }}
                    handleSearch={handleSearch}
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
            <ViewDesignation
                show={isModalOpenDes}
                handleClose={() => setIsModalOpenDes(false)}
                data={selectedDesignation}
            />
        </>
    );
};

export default DesignationMaster;