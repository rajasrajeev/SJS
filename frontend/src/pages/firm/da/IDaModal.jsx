import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { createShopDa } from '../../../features/daSlice';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import TextInput from '../../../components/form/TextInput';
import { months, years } from '../../../utils/timeAndDays';
import DatePicker from '../../../components/form/DatePicker';


const IDaModal = ({ show, handleClose, data }) => {
	const [formData, setFormData] = useState({
        month: "",
        year: "",
        effective_date: "",
        da_point: "",
        fac_constant: "",
        da_rate: "",
        da_rs: "",
        id: null
    });
    const [manual, setManual] = useState(false);
	const dispatch = useDispatch();
	const { loading, daSuccess, error } = useSelector((store) => store.da);

	useEffect(() => {
		if (data) {
			setFormData({
                month: data.month,
                fac_constant: data.fac_constant,
                effective_date: data.effective_date,
                da_point: data.da_point,
                da_rate: data.da_rate,
                da_rs: data.da_rs,
                id: data.id
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
		dispatch(createShopDa(formData))
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>IDA</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-md-6">
                        <TextInput
                            label="Amount"
                            type="number"
                            name="fac_constant"
                            value={formData.fac_constant}
                            onChange={handleChange}
                            required
                            allowDecimal={true}
                        />
                    </div>
                    
                </div>
                <Button variant="primary" type="submit" className="mt-3" disabled={loading ? true : false}>
                    Submit
                </Button>
            </Form>
			</Modal.Body>
		</Modal>
	);
};

export default IDaModal;