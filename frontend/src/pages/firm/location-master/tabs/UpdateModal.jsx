import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateCountry, updateState, updateDistrict } from '../../../../features/locationSlice';
import TextInput from '../../../../components/form/TextInput';
import DismissableAlert from '../../../../components/dashboard/miscellaneous/DismissableAlert';


const UpdateModal = ({ show, handleClose, location, label, method }) => {
	const [formData, setFormData] = useState({ id:'', name: '' });
	const dispatch = useDispatch();
	const { loading, locationSuccess, error } = useSelector((store) => store.location);

	useEffect(() => {
		if (location) {
				setFormData({ id: location.id, name: location.name });
		}
	}, [location]);

	useEffect(() => {
		if (locationSuccess)
				handleClose();
	}, [locationSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (method === "country") {
			dispatch(updateCountry({ 
				...formData
			}));
		} else if (method === "state") {
			dispatch(updateState({ 
				id: formData.id,
				name:formData.name,
				selectedId: location.selectedId
			}));
		} else {
			dispatch(updateDistrict({ 
				id: formData.id,
				name:formData.name,
				selectedId: location.selectedId
			}));
		}

	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Location</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
				<Form onSubmit={handleSubmit}>
					<TextInput
						label={label}
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<Button variant="primary" type="submit" className="mt-3" disabled={loading ? true : false}>
						Update
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default UpdateModal;