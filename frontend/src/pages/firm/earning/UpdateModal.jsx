import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import CheckBox from '../../../components/form/CheckBox';
import { updateEarning } from '../../../features/earningSlice';

const UpdateModal = ({ show, handleClose, data, types }) => {
	const [formData, setFormData] = useState({
        code: "",
        acc_code: "",
        name: "",
        type: "",
        effect_pf: false,
        effect_csi: false,
        id: ""
    });

	const dispatch = useDispatch();
	const { loading, earningSuccess, error } = useSelector((store) => store.earning);

	useEffect(() => {
		if (data) {
			setFormData({
                code: data.code,
                acc_code: data.acc_code,
                name: data.name,
                type: data.type,
                effect_pf: data.effect_pf,
                effect_csi: data.effect_csi,
                id: data.id
             });
		}
	}, [data]);

	useEffect(() => {
		if (earningSuccess)
			handleClose();
	}, [earningSuccess]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        console.log(formData);
		dispatch(updateEarning(formData));
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Update Earning</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <TextInput
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <TextInput
                            label="Code"
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <TextInput
                            label="Acc Code"
                            type="text"
                            name="acc_code"
                            value={formData.acc_code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <CustomDropdown
                            label="Deduction Type"
                            name="type"
                            options={types}
                            value={formData.type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-md-6'>
                        <CheckBox 
                            label="Effect PF" 
                            id="modal-pf" 
                            name="effect_pf"
                            value={formData.effect_pf}
                            onToggle={(checked) =>
                                setFormData((prevState) => ({ ...prevState, effect_pf: checked }))
                            }
                        />
                    </div>
                    <div className='col-md-6'>
                        <CheckBox 
                            label="Effect ESI" 
                            id="modal-csi" 
                            name="effect_csi"
                            value={formData.effect_csi}
                            onToggle={(checked) =>
                                setFormData((prevState) => ({ ...prevState, effect_csi: checked }))
                            }
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