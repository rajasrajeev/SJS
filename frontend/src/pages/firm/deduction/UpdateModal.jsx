import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import MultiSelectDropdown from "../../../components/form/MultiSelectDropdown";
import { updateDeduction } from '../../../features/deductionMasterSlice';

const UpdateModal = ({
    show,
    handleClose,
    data,
    types,
    categories,
    months
}) => {
    const [formData, setFormData] = useState({
        code: "",
        acc_code: "",
        name: "",
        type: "",
        amount: "",
        installment_amt: "",
        interest: "",
        id: "",
        category: "",
        month: [],
    });
    const [selectedMonths, setSelectedMonths] = useState([]);

    const dispatch = useDispatch();
    const { loading, deductionSuccess, error } = useSelector((store) => store.deduction);

    useEffect(() => {
        if (data) {
            setFormData({
                code: data.code || "",
                acc_code: data.acc_code || "",
                name: data.name || "",
                type: data.type || "",
                amount: data.amount || "",
                installment_amt: data.installment_amt || "",
                interest: data.interest || "",
                id: data.id || "",
                category: data.category || "",
                month: data.month || [],
            });
            // Set selected months for MultiSelectDropdown
            setSelectedMonths(
                months.filter((m) => (data.month || []).includes(m.id))
            );
        }
    }, [data, months]);

    useEffect(() => {
        if (deductionSuccess) handleClose();
    }, [deductionSuccess, handleClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleToggleMonth = (month) => {
        const updatedSelectedMonth = selectedMonths.some((b) => b.id === month.id)
            ? selectedMonths.filter((b) => b.id !== month.id)
            : [...selectedMonths, month];

        setSelectedMonths(updatedSelectedMonth);
        setFormData((prev) => ({
            ...prev,
            month: updatedSelectedMonth.map((b) => b.id),
        }));
    };

    // For disabling fields if type is Monthly
    const monthlySelected = formData.type === 'Monthly';

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateDeduction(formData));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Deduction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                <Form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <TextInput
                                label="Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-6'>
                            <TextInput
                                label="Code"
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-6'>
                            <TextInput
                                label="Acc Code"
                                type="text"
                                name="acc_code"
                                value={formData.acc_code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-6'>
                            <CustomDropdown
                                label="Deduction Type"
                                name="type"
                                options={types}
                                value={formData.type}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-6'>
                            <CustomDropdown
                                label="Category Type"
                                name="category"
                                options={categories}
                                value={formData.category}
                                onChange={handleChange}
                                required
                                disabled={true}
                            />
                        </div>
                        {(formData.category === 'FULLWITHOUTUNRECOVER' ||
                            formData.category === 'POSSIBLEWITHUNRECOVER' ||
                            formData.category === 'FULLWITHUNRECOVER' ||
                            formData.category === 'CHARTWITHINTEREST' ||
                            formData.category === 'CHARTWITHOUTINTEREST' ||
                            formData.category === 'MONTHLYSETTINGWITHOUTUNRECOVER') && (
                                <div className='col-md-6'>
                                    <TextInput
                                        label="Amount"
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        allowDecimal={true}
                                        disabled={monthlySelected}
                                    />
                                </div>
                            )}
                        {(formData.category === 'CHARTWITHINTEREST' ||
                            formData.category === 'CHARTWITHOUTINTEREST' ||
                            formData.category === 'FULLWITHOUTUNRECOVER') && (
                                <div className='col-md-6'>
                                    <TextInput
                                        label="Interest Percentage"
                                        type="number"
                                        name="interest"
                                        value={formData.interest}
                                        onChange={handleChange}
                                        allowDecimal={true}
                                        disabled={monthlySelected}
                                    />
                                </div>
                            )}
                        {formData.category === 'MONTHLYSETTINGWITHOUTUNRECOVER' && (
                            <div className='col-md-6'>
                                <MultiSelectDropdown
                                    label="Months"
                                    options={months}
                                    selectedOptions={selectedMonths}
                                    onToggle={handleToggleMonth}
                                />
                            </div>
                        )}
                        {(formData.category === 'CHARTWITHINTEREST' ||
                            formData.category === 'FULLWITHOUTUNRECOVER' ||
                            formData.category === 'CHARTWITHOUTINTEREST') && (
                                <div className='col-md-6'>
                                    <TextInput
                                        label="Installment Amount"
                                        type="number"
                                        name="installment_amt"
                                        value={formData.installment_amt}
                                        onChange={handleChange}
                                        allowDecimal={true}
                                        disabled={monthlySelected}
                                    />
                                </div>
                            )}
                    </div>
                    <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateModal;