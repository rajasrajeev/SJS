import React, { useEffect, useState } from 'react'
import CustomTable from '../../../components/table/CustomTable';
import TextInput from '../../../components/form/TextInput';
import PageTitle from '../../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import { clearDa, fetchShopDaMaster, deleteShopDaMaster, createShopDaMaster } from '../../../features/daSlice';
import ShopDaMasterUpdateModal from './ShopDaMasterUpdateModal';


const ShopDaMaster = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        category: "",
        fixed: "",
        rate: ""
    });
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { loading, shopDaMaster, error, daSuccess } = useSelector((store) => store.da);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(fetchShopDaMaster());
        return () => {
            dispatch(clearDa());
        }
    }, []);

    useEffect(() => {
        setFormData({
            code: "",
            name: "",
            category: "",
            fixed: "",
            rate: ""
        });
    }, [shopDaMaster]);

    useEffect(() => {
        setFilteredData(
            shopDaMaster.filter((item) => {
                const category = item.category?.toString() || ""; 
                const name = item.name?.toString() || "";
                const code = item.code?.toLowerCase() || "";

                return (
                    category.includes(search) ||
                    name.includes(search) ||
                    code.includes(search.toLowerCase())
                );
            })
        );
    }, [search, shopDaMaster]);


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

        if (formData.name.trim() === '' ||
            formData.code.trim() === '' ||
            formData.category.trim() === '' ||
            formData.fixed.trim() === '' ||
            formData.rate.trim() === '') {
            return;
        }
        dispatch(createShopDaMaster(formData));
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
        dispatch(deleteShopDaMaster(selected.id));
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
            name: 'Fixed Constant',
            selector: (row) => row.fixed || 'N/A',
            sortable: true,
            width: '150px',
        },
        {
            name: 'Rate/Da',
            selector: (row) => row.fixed || 'N/A',
            sortable: true,
            width: '150px',
        },
    ];

    return (
        <>
            <div className="add-department mt-4">
                <PageTitle
                    title="Shop DA Master"
                    iname="bi bi-briefcase-fill"
                />
                <form action="">
                    <div className='row mb-4'>
                        <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Code"
                                name="code"
                                placeholder='PTRLSHP or MDCNSHP'
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
                                placeholder="Pertol Shop Master Da"
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
                                placeholder="Pertol Shop"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                type='text'
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Fixed Constant"
                                name="fixed"
                                placeholder="250"
                                value={formData.fixed}
                                onChange={handleChange}
                                required
                                type='number'
                                allowDecimal={true}
                            />
                        </div>
                        <div className='col-md-4 col-lg-3 col-xl-2'>
                            <TextInput
                                label="Rate/Da"
                                name="rate"
                                placeholder="26.6"
                                value={formData.rate}
                                onChange={handleChange}
                                required
                                type='number'
                                allowDecimal={true}
                            />
                        </div>
                        <div className='col-md-2 col-lg-1 col-xl-1' style={{ marginTop: '20px' }}>
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
            <ShopDaMasterUpdateModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selected}
            />
        </>
    );
};

export default ShopDaMaster;