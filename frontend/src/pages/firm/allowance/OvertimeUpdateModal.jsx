import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { updateOvertime } from '../../../features/overtimeSlice';
import CustomDropdown from '../../../components/form/CustomDropdown ';


const OvertimeUpdateModal = ({ show, handleClose, data, options }) => {
	const [formData, setFormData] = useState({
        id: '', 
        code: "", 
        amount: "", 
        name: "",
        overtime_type:'',
        base_amount:'' 
    });
	const dispatch = useDispatch();
	const { loading, overtimeSuccess, error } = useSelector((store) => store.overtime);

	useEffect(() => {
		if (data) {
			setFormData({
				id: data.id, 
				code: data.code, 
				name: data.name,
				amount: data.amount,
                overtime_type: data.overtime_type,
                base_amount: data.base_amount
            });
		}
	}, [data]);

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

	useEffect(() => {
		if (overtimeSuccess)
			handleClose();
	}, [overtimeSuccess]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "amount") {
            setFormData({ ...formData, base_amount: value, amount: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

	const handleSubmit = (e) => {
		e.preventDefault();

        if (formData.code.trim() === '' || 
            formData.name.trim() === ''
        ) {
            return;
        }

		dispatch(updateOvertime({
			id: formData.id,
            code: formData.code, 
            amount: parseFloat(formData.amount), 
            name: formData.name,
            overtime_type: formData.overtime_type,
            base_amount: parseFloat(formData.base_amount)
		}))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Overtime</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
				<Form onSubmit={handleSubmit}>
					<div className='row mb-4'>
						<div className='col-md-6'>
                            <TextInput
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
						</div>
						<div className='col-md-6'>
                            <TextInput
                                label="Code"
                                name="code"
                                value={formData.code}
                                onChange={handleInputChange}
                            />
						</div>	
						<div className="col-md-6">
                            <CustomDropdown
                                label="Overtime Type"
                                name="overtime_type"
                                options={options}
                                value={formData.overtime_type}
                                onChange={handleInputChange}
                                required={true}
                            />
						</div>
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
					</div>
					<Button variant="primary" type="submit" className="mt-3" disabled={loading ? true : false}>
						Update
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default OvertimeUpdateModal;