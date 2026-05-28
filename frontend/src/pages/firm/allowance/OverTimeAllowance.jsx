import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/table/CustomTable";
import TextInput from "../../../components/form/TextInput";
import PageTitle from "../../../components/dashboard/PageTitle";
import CustomDropdown from "../../../components/form/CustomDropdown ";
import { clearOvertime, createOvertime, deleteOvertime, fetchOvertimes } from "../../../features/overtimeSlice";
import { useDispatch, useSelector } from "react-redux";
import DismissableAlert from "../../../components/dashboard/miscellaneous/DismissableAlert";
import ConfirmationDialog from "../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog";
import OvertimeUpdateModal from "./OvertimeUpdateModal";

const OverTimeAllowance = () => {
     const dispatch = useDispatch();
    const [formData, setFormData] = useState({ 
        code: "", 
        amount: "", 
        name: "",
        overtime_type:'',
        base_amount:'' 
    });
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const overtimeTypeOptions = [
        { id: "Single", name: "Single" },
        { id: "Double", name: "Double" },
        { id: "Triple", name: "Triple" },
    ];
    const { loading, overtimeSuccess, error, overtimes } = useSelector((store) => store.overtime);
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchOvertimes());

        return () => {
            dispatch(clearOvertime());
        }
    }, []);

    useEffect(() => {
        setFormData({
            code: "", 
            amount: "", 
            name: "",
            overtime_type:'',
            base_amount:'' 
        });
    }, [overtimes]);

    useEffect(() => {
        setFilteredData(
            overtimes.filter(
                (item) =>
                    item.name?.toLowerCase().includes(search) ||
                    item.code?.toString().includes(search) ||
                    item.amount?.toLowerCase().includes(search) 
            )
        );
    }, [search, overtimes]);

    useEffect(() => {
        if (formData.overtime_type && formData.base_amount) {
            let multiplier = 1;
            if (formData.overtime_type === "Double") {
                multiplier = 2;
            } else if (formData.overtime_type === "Triple") {
                multiplier = 3;
            }
            setFormData((prevFormData) => ({
                ...prevFormData,
                amount: prevFormData.base_amount * multiplier,
            }));
        }
    }, [formData.overtime_type, formData.base_amount]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "amount") {
            setFormData({ ...formData, base_amount: value, amount: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAdd = (event) => {
        event.preventDefault();
        if (formData.code.trim() === '' || 
            formData.name.trim() === ''
        ) {
            return;
        }
        dispatch(createOvertime({
            code: formData.code, 
            amount: parseFloat(formData.amount), 
            name: formData.name,
            overtime_type: formData.overtime_type,
            base_amount: parseFloat(formData.base_amount)
        }));
    };

    const handleEdit = (row) => {
        dispatch(clearOvertime());
        setSelected(row);
        setIsModalOpen(true);
    };

    const handleDelete = (overtime) => {
        setSelected(overtime);
        setIsDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteOvertime(selected.id));
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

    const columns = [
        { name: 'SlNo', selector: (row, index) => index + 1, width: '100px' },
        { name: "Code", selector: (row) => row.code, sortable: true },
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Overtime Type", selector: (row) => row.overtime_type, sortable: true },
        { name: "Base Amount", selector: (row) => row.base_amount, sortable: true },
        { name: "Amount", selector: (row) => row.amount, sortable: true }
    ];

    return (
        <>
        <div className="overtime-allowance mt-4">
            <PageTitle title="Over Time Allowance" iname="bi bi-graph-up" />
            <form  onSubmit={handleAdd}>
                <div className="row mb-5">
                    <div className="col-md-6 col-lg-3">
                        <TextInput
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <TextInput
                            label="Code"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <CustomDropdown
                         label="Overtime Type"
                         name="overtime_type"
                         options={overtimeTypeOptions}
                         value={formData.overtime_type}
                         onChange={handleInputChange}
                         required={true}
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <TextInput
                            label="Base Amount"
                            name="base_amount"
                            type="number"
                            value={formData.base_amount}
                            onChange={handleInputChange}
                            allowDecimal={true}
                            required
                        />
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <TextInput
                            label="Amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleInputChange}
                            allowDecimal={true}
                            required
                        />
                    </div>

                    <div className="col-md-3 col-lg-1 col-xl-1 mt-4">
                        <button type="submit" className="submit-button" >
                            Submit
                        </button>
                    </div>
                </div>
                {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                    {overtimeSuccess ? <DismissableAlert
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
            />
        </div>
            <ConfirmationDialog
                isOpen={isDialogOpen}
                title="Are you sure?"
                message="This action cannot be undone"
                onConfirm={handleDeleteConfirm}
                onCancel={handleCancel}
            />
            <OvertimeUpdateModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selected}
                options={overtimeTypeOptions}
            />
        </>
    );
};

export default OverTimeAllowance;