import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { updateFabDaMaster } from '../../../features/daSlice';


const FabDaMasterUpdateModal = ({ show, handleClose, data }) => {
	const [formData, setFormData] = useState({
		id: null,
		category: "",
        code: "",
        name: "",
        deduction: "",
        rate_per_da: "",
        rate_of_point: ""
	});
	const dispatch = useDispatch();
	const { loading, error, daSuccess } = useSelector((store) => store.da);

	useEffect(() => {
		if (data) {
			setFormData({
				id: data.id, 
				category: data.category,
                code: data.code,
                name: data.name,
				deduction: data.deduction,
                rate_per_da: data.rate_per_da,
                rate_of_point: data.rate_of_point
		 	});
		}
	}, [data]);

	useEffect(() => {
		if (daSuccess)
			handleClose();
	}, [daSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateFabDaMaster(formData))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update FAB DA</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
				<Form onSubmit={handleSubmit}>
					<div className='row mb-4'>
					<div className='col-md-6'>
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
					<div className='col-md-6'>
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
					<div className='col-md-6'>
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
					<div className='col-md-6'>
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
					<div className="col-md-6">
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
					<div className="col-md-6">
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
					</div>
					<Button variant="primary" type="submit" className="mt-3" disabled={loading ? true : false}>
						Update
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default FabDaMasterUpdateModal;