import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { updateDepartment } from '../../../features/departmentSlice';


const UpdateModal = ({ show, handleClose, data }) => {
	const [formData, setFormData] = useState({id: '', code:'', name: '' });
	const dispatch = useDispatch();
	const { loading, departmentSuccess, error } = useSelector((store) => store.department);

	useEffect(() => {
		if (data) {
			setFormData({
				id: data.id, 
				code: data.code, 
				name: data.name });
		}
	}, [data]);

	useEffect(() => {
		if (departmentSuccess)
			handleClose();
	}, [departmentSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateDepartment(formData))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Department</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
				<Form onSubmit={handleSubmit}>
					<div className='row mb-4'>
					<div className='col-md-6'>
						<TextInput
						label="Department Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						/>
					</div>
					<div className='col-md-6'>
						<TextInput
						label="Department Code"
						name="code"
						value={formData.code}
						onChange={handleChange}
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

export default UpdateModal;