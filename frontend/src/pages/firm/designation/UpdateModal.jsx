import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { updateDepartment } from '../../../features/departmentSlice';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import DatePicker from '../../../components/form/DatePicker';
import { dateFormatFromString } from '../../../utils/dateFormat';
import { updateDesignation } from '../../../features/designationSlice';


const UpdateModal = ({ show, handleClose, data }) => {
	const [formData, setFormData] = useState({
        department_id: '',
        code: '',
        name: '',
        effective_date: '',
        basic: '',
        id: ''
    });
	const dispatch = useDispatch();
    const { departments } = useSelector((store) => store.department);
	const { loading, designationSuccess, error } = useSelector((store) => store.designation);

	useEffect(() => {
		if (data) {
			setFormData({
				id: data.id, 
				code: data.code, 
				name: data.name,
                department_id: data.department_id,
                effective_date: dateFormatFromString(new Date(data.effective_date)),
                basic: data.basic,
             });
		}
	}, [data]);

	useEffect(() => {
		if (designationSuccess)
			handleClose();
	}, [designationSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateDesignation(formData))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Department</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <CustomDropdown
                            label="Department"
                            name="department_id"
                            options={departments}
                            value={formData.department_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <TextInput
                            label="Designation Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <TextInput
                            label="Designation Code"
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <TextInput
                            label="Basic"
                            type="number"
                            name="basic"
                            value={formData.basic}
                            onChange={handleChange}
                            allowDecimal={true}
                        />
                    </div>
                    <div className='col-md-6'>
                        <DatePicker
                            label="Effective Date"
                            name="effective_date"
                            value={formData.effective_date}
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