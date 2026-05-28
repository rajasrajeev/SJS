import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { updateLeave } from '../../../features/leaveSlice';
import CustomRadioButtonGroup from '../../../components/form/CustomRadioButton';


const UpdateModal = ({ show, handleClose, data, salaryStatusOptions }) => {
	const [formData, setFormData] = useState({id: '', code:'', name: '', status: '' });
	const dispatch = useDispatch();
	const { loading, leaveSuccess, error } = useSelector((store) => store.leave);

	useEffect(() => {
		if (data) {
			setFormData({
				id: data.id, 
				code: data.code, 
				name: data.name,
				status: data.status });
		}
	}, [data]);

	useEffect(() => {
		if (leaveSuccess)
			handleClose();
	}, [leaveSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateLeave(formData))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Leave</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
				<Form onSubmit={handleSubmit}>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextInput
							label="Leave Name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							/>
						</div>
						<div className='col-md-6'>
							<TextInput
							label="Leave Code"
							name="code"
							value={formData.code}
							onChange={handleChange}
							required
							/>
						</div>	
						<div className="col-md-6">
							<CustomRadioButtonGroup
                                label="Status"
                                name="status"
                                options={salaryStatusOptions}
                                value={formData.status}
                                onChange={handleChange}
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