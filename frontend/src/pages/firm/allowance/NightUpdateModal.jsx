import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { updateNight } from '../../../features/nightSlice';


const NightUpdateModal = ({ show, handleClose, data }) => {
	const [formData, setFormData] = useState({
        id: '', 
        code:'', 
        name: '', 
        amount: '' 
    });
	const dispatch = useDispatch();
	const { loading, nightSuccess, error } = useSelector((store) => store.night);

	useEffect(() => {
		if (data) {
			setFormData({
				id: data.id, 
				code: data.code, 
				name: data.name,
				amount: data.amount });
		}
	}, [data]);

	useEffect(() => {
		if (nightSuccess)
			handleClose();
	}, [nightSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateNight({
			id: formData.id,
			name: formData.name,
            code: formData.code,
            amount: parseFloat(formData.amount)
		}))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Night</Modal.Title>
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
                                onChange={handleChange}
                                required
                            />
						</div>
						<div className='col-md-6'>
                            <TextInput
                                label="Code"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                            />
						</div>	
						<div className="col-md-6">
                            <TextInput
                                label="Amount"
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
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

export default NightUpdateModal;