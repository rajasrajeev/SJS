import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import { time, days} from '../../../utils/timeAndDays';
import { updateShift } from '../../../features/shiftSlice';


const UpdateModal = ({ show, handleClose, data }) => {
	const [formData, setFormData] = useState({
        id: "",
        name: "",
        code: "",
        start: "",
        end: "",
        start_day: ""
      });

	const dispatch = useDispatch();
	const { loading, shiftSuccess, error } = useSelector((store) => store.shift);

	useEffect(() => {
		if (data) {
			setFormData({
				id: data.id, 
				code: data.code, 
				name: data.name,
                start: data.start,
                end: data.end,
                start_day: data.start_day,
             });
		}
	}, [data]);

	useEffect(() => {
		if (shiftSuccess)
			handleClose();
	}, [shiftSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Updated Data:', formData);
		dispatch(updateShift(formData))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Shift</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <TextInput
                            label="Shift Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            type='text'
                        />
                    </div>
                    <div className='col-md-6'>
                        <TextInput
                            label="Shift Code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            type='text'
                        />
                    </div>
                    <div className='col-md-6'>
                        <CustomDropdown
                            label="Start Time"
                            name="start"
                            options={time}
                            value={formData.start}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <CustomDropdown
                            label="End Time"
                            name="end"
                            options={time}
                            value={formData.end}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <CustomDropdown
                            label="Start Day"
                            name="start_day"
                            options={days}
                            value={formData.start_day}
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