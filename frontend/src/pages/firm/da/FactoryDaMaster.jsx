import React, { useEffect, useState } from 'react'
import CustomTable from '../../../components/table/CustomTable';
import TextInput from '../../../components/form/TextInput';
import PageTitle from '../../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import { clearDa, createFabDaMaster, deleteFabDaMaster, fetchFabDaMaster } from '../../../features/daSlice';
import FabDaMasterUpdateModal from './FabDaMasterUpdateModal';

const FactoryDaMaster = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        category: "",
        code: "",
        name: "",
        deduction: "",
        rate_per_da: "",
        rate_of_point: ""
    });

    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { loading, fabDaMaster, error, daSuccess } = useSelector((store) => store.da);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchFabDaMaster());
        return () => {
            dispatch(clearDa());
        }
    }, []);

    useEffect(() => {
        setFormData({
            category: "",
            code: "",
            name: "",
            deduction: "",
            rate_per_da: "",
            rate_of_point: ""
        })
    }, [fabDaMaster]);

    useEffect(() => {
        setFilteredData(
            fabDaMaster.filter(
                (item) =>
                    item.code.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toString().includes(search) ||
                    item.category.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, fabDaMaster]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleAddDa = (e) => {
        e.preventDefault();
        if (formData.code.trim() === '' ||
            formData.name.trim() === '' ||
            formData.category.trim() === ''
        ) {
            return;
        }
        dispatch(createFabDaMaster(formData));
    };

    const handleEditDa = (da) => {
        dispatch(clearDa());
        setSelected(da);
        setIsModalOpen(true);
    };

    const handleDeleteDa = (da) => {
        setSelected(da);
        setIsDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteFabDaMaster(selected.id));
        setIsDialogOpen(false);
        setSelected(null);
    }

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSelected(null);
    }

    const columns = [
        { name: 'SlNo', selector: (row, index) => index + 1, width: '100px' },
        {
            name: 'Code',
            selector: row => row.code || 'N/A',
            sortable: true,
            width: '100px',
        },
        {
            name: 'Name',
            selector: row => row.name || 'N/A',
            sortable: true,
            width: '250px',
        },
        {
            name: 'Category',
            selector: (row) => row.category || 'N/A',
            sortable: true,
            width: '150px',
        },
        {
            name: 'Rate of Point',
            selector: (row) => row.rate_of_point || 'N/A',
            sortable: true,
            width: '150px',
        },
        {
            name: 'Deduction',
            selector: (row) => row.deduction || 'N/A',
            sortable: true,
            width: '150px',
        },
        {
            name: 'Rate/Da',
            selector: (row) => row.rate_per_da || 'N/A',
            sortable: true,
            width: '150px',
        },
    ];

    return (
        <>
            <div className="add-department mt-4">
                <PageTitle
                    title="Factory DA Master"
                    iname="bi bi-briefcase-fill"
                />
                <form action="">
                    <div className='row mb-4'>
                    <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Code"
                                name="code"
                                placeholder='FCT1'
                                value={formData.code}
                                onChange={handleChange}
                                required
                                type='text'
                            />
                        </div>
                        <div className='col-md-6 col-lg-3'>
                            <TextInput
                                label="Name"
                                name="name"
                                placeholder="Factory name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                type='text'
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Category"
                                name="category"
                                placeholder="Goods Factory"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                type='text'
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Rate of Point"
                                name="rate_of_point"
                                placeholder="450"
                                value={formData.rate_of_point}
                                onChange={handleChange}
                                required
                                type='number'
                                allowDecimal={true}
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Deduction"
                                name="deduction"
                                placeholder="400"
                                value={formData.deduction}
                                onChange={handleChange}
                                required
                                type='number'
                                allowDecimal={true}
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Rate/Da"
                                name="rate_per_da"
                                placeholder="26.6"
                                value={formData.rate_per_da}
                                onChange={handleChange}
                                required
                                type='number'
                                allowDecimal={true}
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 col-xl-2' style={{ marginTop: '20px' }}>
                            <button className="add-department-button" onClick={handleAddDa}>
                                Submit
                            </button>
                        </div>
                    </div>
                    {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                    {daSuccess ? <DismissableAlert
                        variant='success'
                        title="success"
                        msg="Save completed succesfully" />
                        : null}
                </form>
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    onEdit={handleEditDa}
                    onDelete={handleDeleteDa}
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
            <FabDaMasterUpdateModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selected}
            />
        </>
    );
};

export default FactoryDaMaster;