import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from "react-select/async";

import DismissableAlert from '../../components/dashboard/miscellaneous/DismissableAlert';
import { updateAdvanceDeduction, createAdvanceDeduction } from '../../features/advanceDeductionSlice';
import CustomDropdown from '../../components/form/CustomDropdown ';
import TextInput from '../../components/form/TextInput';
import axiosInstance from '../../utils/axios';



const AdvanceDeductionModal = ({ show, handleClose, data, types, deductions }) => {
	const [formData, setFormData] = useState({
        code: "",
        acc_code: "",
        name: "",
        type: "",
        amount: "",
        installment_amt: "",
        interest: "",
        id: "",
        unwanted: false,
        unrecover: false
    });

	const dispatch = useDispatch();
	const { loading, deductionSuccess, error } = useSelector((store) => store.deduction);
	const [rows, setRows] = useState([
        { dept_code: "", emp_code: "", ref_number: "", amount: "", installment: "", interest: "" },
    ]);

	useEffect(() => {
		if (data) {
			setFormData({
                code: data.code,
                acc_code: data.acc_code,
                name: data.name,
                type: data.type,
                amount: data.amount,
                installment_amt: data.installment_amt,
                interest: data.interest,
                id: data.id,
                unwanted: data.unwanted || false,
                unrecover: data.unrecover || false
             });
            if (data.deductionEmployeeMonthlyMaster && Array.isArray(data.deductionEmployeeMonthlyMaster)) {
                const mappedRows = data.deductionEmployeeMonthlyMaster.map(item => ({
                    dept_code: item.department?.code || "",
                    emp_code: item.employee?.pno || "",
                    ref_number: item.ref_number || "",
                    amount: item.deduction_amt || "",
                    installment: item.installment_amt || "",
                    interest: item.interest_percentage || "",
                    emp_id: item.emp_id || null
                }));
                setRows(mappedRows);
            } else {
                setRows([{ dept_code: "", emp_code: "", ref_number: "", amount: "", installment: "", interest: "" }]);
            }
		}
	}, [data]);

	useEffect(() => {
		if (deductionSuccess)
			handleClose();
	}, [deductionSuccess]);


	const fetchEmployeeList = async (inputValue) => {
		if (!inputValue || inputValue.length <= 1) return [];
		try {
			// Backend mini endpoint
			// GET /api/v1/employee/mini?emp_code=...
			const response = await axiosInstance.get(`/employee/mini?emp_code=${inputValue}`);
			const data = response.data || [];
			return data.map((emp) => ({
				label: `${emp.pno} (${emp.name})`,
				value: `${emp.pno}`,
				// keep raw for any extra mapping
				raw: emp,
			}));
		} catch (error) {
			console.error('Error fetching employees:', error);
			return [];
		}
	};


	const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
		setFormData({ ...formData, [name]: val });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        const payload = { ...formData, employees: rows };
        if(formData.id) {
            dispatch(updateAdvanceDeduction({ id: formData.id, data: payload }));
        } else {
            dispatch(createAdvanceDeduction(payload));
        }
	};

	const handleEmpCodeChange = (index, selectedOption) => {
		const updatedRows = [...rows];
		updatedRows[index].emp_code = selectedOption.value;
		setRows(updatedRows);
	};

	const handleRowChange = (index, e) => {
        const updatedRows = [...rows];
        updatedRows[index][e.target.name] = e.target.value;
        setRows(updatedRows);
    };

	const handleAddRow = () => {
        setRows([...rows, { dept_code: "", emp_code: "", ref_number: "", amount: "", installment: "", interest: "" }]);
    };

	const handleRemoveRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

	return (
		<Modal size="xl" show={show} onHide={handleClose} >
			<Modal.Header closeButton>
				<Modal.Title>Advance Deduction</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
                <div className='row border-box'>
					<div className='col-md-4 col-lg-4'>
						<CustomDropdown
							label="Deduction"
							name="deduction_id"
							options={deductions}
							value={formData.deduction_id}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='col-md-4 col-lg-4'>
                        <TextInput
                            label="Department"
                            type="text"
                            name="name"
                            value={formData.name}
                        />
                    </div>
                </div>
				<div className="row">
					<div className="table-responsive ded-table">
						<table id="deductionTable" className="table-bordered">
							<thead>
								<tr>
								<th>Dept Code</th>
								<th>Emploee Code</th>
								<th>Employee Name</th>
								<th>Deduction Code</th>
								<th>Interest %</th>
								<th></th> 
								</tr>
							</thead>
							<tbody>
							{rows.map((row, index) => (
								<tr key={index} style={{height: '30px'}}>
									<td><input type="text" name="dept_code" value={row.dept_code} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
									{/* <td><input type="text" name="emp_code" value={row.emp_code} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td> */}
									<td style={{width: "200px"}}>
										{/* <input autoFocus placeholder='EMP CODE' type="text" name="emp_code" value={row.emp_code} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /> */}
										<AsyncSelect
											cacheOptions
											defaultOptions
											loadOptions={fetchEmployeeList}
											onChange={(selectedOption) => handleEmpCodeChange(index, selectedOption)}
											placeholder="Emp code"
											className="tbl"
										/>
									</td>
									<td><input type="text" name="emp_name" value={row.ref_number} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
									<td><input type="number" name="deduction code" value={row.amount} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
									<td><input type="number" name="interest" value={row.interest} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
									<td>
										<button disabled={index === 0 ? true : false} className="action-button" onClick={() => handleRemoveRow(index)}>
											<i className="bx bx-trash" style={index === 0 ? { color: '#fff' } : {color: 'red'}}></i>
										</button>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				</div>
				<Button variant="secondary" type="submit" className="mt-3" onClick={handleAddRow} disabled={loading ? true : false}>
                    Add Row
                </Button>
                <Button variant="primary" type="submit" className="mt-3" disabled={loading ? true : false}>
                    Submit
                </Button>
			</Modal.Body>
		</Modal>
	);
};

export default AdvanceDeductionModal;