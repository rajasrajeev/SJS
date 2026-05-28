import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import {  updateShopDaMaster } from '../../../features/daSlice';

const ShopDaMasterUpdateModal = ({ show, handleClose, data }) => {
	const dispatch = useDispatch();
     const [formData, setFormData] = useState({
        id: null,
        code: "",
        name: "",
        category: "",
        fixed: "",
        rate: ""
    });
	const { loading, daSuccess, error } = useSelector((store) => store.da);

	useEffect(() => {
		if (data) {
			setFormData({
                id: data.id,
                category: data.category,
                code: data.code,
                name: data.name,
                fixed: data.fixed,
                rate: data.rate
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
		dispatch(updateShopDaMaster(formData));
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update DA Point</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
				<Form onSubmit={handleSubmit}>
					<div className='row mb-4'>
                        <div className='col-md-6'>
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
                        <div className='col-md-6'>
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
                        <div className='col-md-6'>
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
                        <div className='col-md-6'>
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
                        <div className="col-md-6">
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
					</div>
					<Button variant="primary" type="submit" className="mt-3" disabled={loading ? true : false}>
						Update
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default ShopDaMasterUpdateModal;