import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { dateFormatFromString } from '../../../utils/dateFormat';
import { updateDesignation } from '../../../features/designationSlice';


const ViewDesignation = ({ show, handleClose, data }) => {
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

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>View Designation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p style={{color: "red"}}>Values will show after integration</p>
                    </div>
                </div>
            </div>
			</Modal.Body>
		</Modal>
	);
};

export default ViewDesignation;