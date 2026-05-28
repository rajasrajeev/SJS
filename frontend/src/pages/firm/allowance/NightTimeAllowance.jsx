import React, { useEffect, useState } from "react";
import TextInput from '../../../components/form/TextInput';
import CustomTable from '../../../components/table/CustomTable';
import PageTitle from "../../../components/dashboard/PageTitle";
import { clearNight, createNight, deleteNight, fetchNights } from "../../../features/nightSlice";
import { useDispatch, useSelector } from "react-redux";
import DismissableAlert from "../../../components/dashboard/miscellaneous/DismissableAlert";
import ConfirmationDialog from "../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog";
import NightUpdateModal from "./NightUpdateModal";


const NightTimeAllowance = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [amount, setAmount] = useState('');
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { loading, error, nightSuccess, nights } = useSelector((store) => store.night);
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const columns = [
        { name: 'SlNo', selector: (row, index) => index + 1, width: '100px' },
        { name: "Code", selector: (row) => row.code, sortable: true },
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Amount", selector: (row) => row.amount, sortable: true },
    ];

    useEffect(() => {
        dispatch(fetchNights());

        return () => {
            dispatch(clearNight());
        }
    }, []);

    useEffect(() => {
        setName('');
        setCode('');
        setAmount('');
    }, [nights]);

    useEffect(() => {
        setFilteredData(
            nights.filter(
                (item) =>
                    item.name?.toString().includes(search) ||
                    item.code?.toString().includes(search) ||
                    item.amount?.toLowerCase().includes(search)
            )
        );
    }, [search, nights]);

    const handleAdd = (event) => {
        event.preventDefault();

        if (name.trim() === '' || 
            code.trim() === ''    
        ) {
            return;
        }

        dispatch(createNight({
            name: name,
            code: code,
            amount: parseFloat(amount)
        }));
    };

    const handleEdit = (row) => {
        dispatch(clearNight());
        setSelected(row);
        setIsModalOpen(true);
    };

    const handleDelete = (night) => {
        setSelected(night);
        setIsDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteNight(selected.id));
        setIsDialogOpen(false);
        setSelected(null);
    }

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSelected(null);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    return (
        <>
        <div className="mt-4">
            <PageTitle title="Night Allowance" iname="bi bi-graph-up" />
            <form onSubmit={handleAdd}>
                <div className="row mb-5">
                    <div className="col-md-6 col-lg-3">
                        <TextInput
                            label="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <TextInput
                            label="Code"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <TextInput
                            label="Amount"
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            allowDecimal={true}
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2 mt-4">
                        <button type="submit" className="submit-button">
                            Submit </button>
                    </div>
                </div>
                {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                    {nightSuccess ? <DismissableAlert
                        variant='success'
                        title="success"
                        msg="Save completed succesfully" />
                        : null}
            </form>
            <CustomTable
                columns={columns}
                data={filteredData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
                showSearchBar={true}
                addButton={{ show: false }}
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
            <NightUpdateModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selected}
            />
        </>
    );
};

export default NightTimeAllowance;