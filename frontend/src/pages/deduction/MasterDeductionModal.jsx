
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from "react-select/async";

import DismissableAlert from '../../components/dashboard/miscellaneous/DismissableAlert';
import { createDeduction, updateDeduction, deleteDeduction } from '../../features/deductionSlice';
import CustomDropdown from '../../components/form/CustomDropdown ';
import TextInput from '../../components/form/TextInput';
import axiosInstance from '../../utils/axios';
import { fetchBranches } from '../../features/branchSlice';
import { fetchMonths } from '../../features/optionsSlice';
import './style.scss';


const MasterDeductionModal = ({ show, handleClose, data, types, deductions }) => {
	
	const [formData, setFormData] = useState({
        code: "",
        acc_code: "",
        name: "",
        type: "",
        amount: "",
        installment_amt: "",
        interest: "",
        id: "",
        department_id: "",
		branch_id: null,
        emp_id: "",
        month: "",
		year: "",
        unwanted: false,
        unrecover: false
    });
	const [selectedDeduction, setSelectedDeduction] = useState(null);
	const [employees, setEmployees] = useState([]);
	const [showDetail, setShowDetail] = useState(false);
	const dispatch = useDispatch();
	const { loading, error, deductionSuccess } = useSelector((store) => store.deductionMain);
	const { branches } = useSelector((store) => store.branch);
	const { selectedMonth } = useSelector((store) => store.month || {});
	const { months: monthOptions = [] } = useSelector((store) => store.options || {});


	const [rows, setRows] = useState([
        { dept_code: "", emp_code: "", ref_number: "", amount: "", installment: "", interest: "" },
    ]);

	  useEffect(() => {
		dispatch(fetchBranches());
		dispatch(fetchMonths());
	  }, []);


	useEffect(() => {
		if (data) {
			// console.log("data ===================>", data)
			const filteredDeduction = deductions.find(deduction => deduction.id === Number(data.deduction_id));
			setSelectedDeduction(filteredDeduction);
			setFormData(prev => ({
                ...prev,
                code: data.department.code,
				deduction_id: data.deduction_id,
                acc_code: data.acc_code,
                name: data.department.name,
                type: data.type,
                amount: data.amount,
                installment_amt: data.installment_amt,
                interest: data.interest,
                id: data.id,
				branch_id: data.branch_id,
                unwanted: data.unwanted || false,
                unrecover: data.unrecover || false
             }));
            if (data.deductionEmployeeMonthlyMaster && Array.isArray(data.deductionEmployeeMonthlyMaster)) {
                const mappedRows = data.deductionEmployeeMonthlyMaster.map(item => ({
                    dept_code: data.department?.code || "",
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
			// console.log("rows ========================>", rows)
		}
	}, [data]);

	useEffect(() => {
		if (deductionSuccess)
			handleClose();
	}, [deductionSuccess]);

	useEffect(() => {
		if(selectedMonth && Array.isArray(monthOptions) && monthOptions.length > 0) {
			// selectedMonth expected: "YYYY-MM"
			const [year, monthNum] = selectedMonth.split('-');
			const padded = String(monthNum).padStart(2, '0');

			// monthOptions from backend are like { id: 'January', name: 'January', days: 31 }
			const monthName = monthOptions.find((m) => {
				const mm = String(m.id)
					.slice(0, 3)
					.toLowerCase();
				const map = {
					'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
					'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12',
				};
				return map[mm] === padded;
			})?.name;

			setFormData(prev => ({ ...prev, month: monthName || "", year: parseInt(year, 10) }));
		}
	}, [selectedMonth, monthOptions]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
		setFormData({ ...formData, [name]: val });

		if(name === 'deduction_id') {
			const filteredDeduction = deductions.find(deduction => deduction.id === Number(value));
			setSelectedDeduction(filteredDeduction);
		} else if(name === 'department_id' || name === 'code') {
            setFormData(prev => ({ ...prev, department_id: val }));
        } else if(name === 'branch_id') {
            setFormData(prev => ({ ...prev, branch_id: val }));
        }
		console.log("rows ===========> when change ====> deduction ========> ", rows)
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		// Construct the payload object as required
		const payload = {
			month: formData.month || "", // You may need to add month to formData state and update accordingly
			year: formData.year.toString() || "",
			deduction_id: parseInt(formData.deduction_id) || null,
			department_id: parseInt(formData.department_id) || null, // Assuming code is department code
			branch_id: parseInt(formData.branch_id) || null,
            unwanted: formData.unwanted,
            unrecover: formData.unrecover,
			active: formData.unrecover ? false : true,
			employees: rows.map(row => ({
				emp_id: parseInt(row.emp_id) || null,
				deduction_amt: parseFloat(row.amount) || 0,
				installment_amt: parseFloat(row.installment) || 0,
				interest_percentage: parseFloat(row.interest) || 0
			}))
		};

		if(formData.id) {
			dispatch(updateDeduction(payload));
		} else {
			dispatch(createDeduction(payload));
		}
	}

	const fetchEmployeeList = async (inputValue, callback) => {
		if(inputValue.length > 1) {
			try {
				let response = await axiosInstance.get(`/employee/mini?emp_code=${inputValue}`);
				setEmployees(response.data);
				const options = response.data.map(emp => ({
					label: `${emp.pno} (${emp.name})`,
					value: `${emp.pno}`
				}));
				return options;
			} catch (err) {
				return [];
			}
	
		} else {
			return [];
		}
	};

	const handleRowChange = (index, e) => {
        const updatedRows = [...rows];
        updatedRows[index][e.target.name] = e.target.value;
        setRows(updatedRows);
    };

		const handleEmpCodeChange = (index, selectedOption) => {
		const updatedRows = [...rows];
		updatedRows[index].emp_code = selectedOption.value;
		updatedRows[index].amount = selectedDeduction.amount;
		updatedRows[index].installment = selectedDeduction.installment_amt;
		updatedRows[index].interest = selectedDeduction.interest;

		const selectedEmpl = employees.find(employee => employee.pno === selectedOption.value);
		updatedRows[index].dept_code = selectedEmpl.department.code;
		updatedRows[index].emp_id = selectedEmpl.id;

		setFormData(prev => ({ ...prev, emp_id: selectedEmpl.pno, department_id: parseInt(selectedEmpl.department.id), code: selectedEmpl.department.code, name: selectedEmpl.department.name }));

		setRows(updatedRows);
	};

	const handleAddRow = () => {
        setRows([...rows, { dept_code: "", emp_code: "", ref_number: "", amount: "", installment: null, interest: "" }]);
    };

	const handleRemoveRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

	const onKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleAddRow()
		}
	}

	return (
		<Modal size="xl" show={show} onHide={handleClose} >
			<Modal.Header closeButton>
				<Modal.Title>Master Deduction</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
				<form>
                <div className='border-box'>
					<div className='row'>
				<div className='col-md-3 col-lg-3'>
					<CustomDropdown
						label="Deduction"
						name="deduction_id"
						options={deductions}
						value={formData.deduction_id}
						onChange={handleChange}
						required
					/>
				</div>
				{branches && branches.length > 0 && <div className='col-md-3 col-lg-3'>
					<CustomDropdown
						label="Branch"
						name="branch_id"
						options={branches}
						value={formData.branch_id}
						onChange={handleChange}
					/>
 				</div>}
				<div className='col-md-3 col-lg-3'>
					<TextInput
						label="Department"
						type="text"
						name="name"
						value={formData.code}
					/>
				</div>

				<div className='col-md-3 col-lg-3'>
					<TextInput
						label="Name"
						type="text"
						name="name"
						value={formData.name}
					/>
				</div>
				<div className='col-md-3 col-lg-3 d-flex align-items-center'>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							name="unwanted"
							id="unwantedCheckbox"
							checked={formData.unwanted}
							onChange={handleChange}
						/>
						<label className="form-check-label" htmlFor="unwantedCheckbox">
							Unwanted
						</label>
					</div>
				</div>
				<div className='col-md-3 col-lg-3 d-flex align-items-center'>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							name="unrecover"
							id="unrecoverCheckbox"
							checked={formData.unrecover}
							onChange={handleChange}
						/>
						<label className="form-check-label" htmlFor="unrecoverCheckbox">
							Unrecover
						</label>
					</div>
				</div>
					</div>
					{selectedDeduction &&
						<div>
							<button className="btn btn-light" type="button" onClick={() => setShowDetail((prev) => !prev)}>
								<i className="bi bi-eye" style={{ color: 'blue' }}></i> view detail
							</button>
								{showDetail ? <div className="container table-responsive">
									<h4>Deduction Detail</h4>
									<table className='table table-boredered'>
										<tbody>
											<tr>
												<th>Code</th>
												<td>{selectedDeduction.code}</td>
											</tr>
											<tr>
												<th>Name</th>
												<td>{selectedDeduction.name}</td>
											</tr>
											<tr>
												<th>acc_code</th>
												<td>{selectedDeduction.acc_code}</td>
											</tr>
											<tr>
												<th>Type</th>
												<td>{selectedDeduction.type}</td>
											</tr>
											<tr>
												<th>Amount</th>
												<td>{selectedDeduction.amount}</td>
											</tr>
											<tr>
												<th>Installment Amount</th>
												<td>{selectedDeduction.installment_amt}</td>
											</tr>
											<tr>
												<th>Interest</th>
												<td>{selectedDeduction.interest} %</td>
											</tr>
										</tbody>
									</table>
								</div> : null }
						</div>	
					}
					

                </div>
				{selectedDeduction && <div className="row">
					<div className="table-responsive  ded-table">
						<table id="deductionTable" className="table-bordered ">
							<thead style={{
								position: "sticky",
								top: 0
							}}>
								<tr>
									<th style={{width: "250px"}}>Emploee Code</th>
									<th>Dept Code</th>
									<th>Reference Number</th>
									<th>Deduction Amount</th>
									<th>Installment Amount</th>
									<th>Interest %</th>
									<th></th> 
								</tr>
							</thead>
							<tbody>
							{rows.map((row, index) => (
								<tr key={index} style={{height: '30px'}}>
									<td style={{width: "250px; textAlign:center"}}>
										<AsyncSelect
											cacheOptions
											defaultOptions
											loadOptions={fetchEmployeeList}
											onChange={(selectedOption) => handleEmpCodeChange(index, selectedOption)}
											placeholder="Emp code"
											className="tbl"
											value={
												employees && employees.length > 0
													? employees
															.map(emp => ({
																label: `${emp.pno} (${emp.name})`,
																value: emp.pno
															}))
															.find(option => option.value === row.emp_code) || null
													: null
											}
										/>
									</td>
									<td>
										<input 
											type="text" 
											name="dept_code" 
											value={row.dept_code} 
											onChange={(e) => handleRowChange(index, e)} 
											className="form-control tbl" 
											onKeyDown={(e) => onKeyPress(e)}
										/>
									</td>
									<td>
										<input 
											type="text" 
											name="ref_number" 
											value={row.ref_number} 
											onChange={(e) => handleRowChange(index, e)} 
											className="form-control tbl" 
											onKeyDown={(e) => onKeyPress(e)}
										/>
									</td>
									<td>
										<input 
											type="number" 
											name="amount" 
											value={row.amount} 
											onChange={(e) => handleRowChange(index, e)} 
											className="form-control tbl" 
											onKeyDown={(e) => onKeyPress(e)}
										/>
									</td>
									<td>
										<input 
											type="number" 
											name="installment" 
											value={row.installment} 
											onChange={(e) => handleRowChange(index, e)} 
											className="form-control tbl" 
											onKeyDown={(e) => onKeyPress(e)}
										/>
									</td>
									<td>
										<input 
											type="number" 
											name="interest" 
											value={row.interest} 
											onChange={(e) => handleRowChange(index, e)} 
											className="form-control tbl" 
											onKeyDown={(e) => onKeyPress(e)}
										/>
									</td>
									<td>
										<button disabled={index === 0 ? true : false}  type="button" className="action-button" onClick={() => handleRemoveRow(index)}>
											<i className="bx bx-trash" style={index === 0 ? {color: 'lightgrey'} : {color: 'red'}}></i>
										</button>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				</div>}
				
				</form>
				<Modal.Footer>
					
					{/* <Button variant="secondary" className="mt-3" onClick={handleAddRow} disabled={loading ? true : false}>
						Add Row
					</Button> */}
					{selectedDeduction ? 
						<div className="d-flex justify-content-between align-items-center w-100">
							<small style={{ color: "blue" }}>Press enter to add new row</small>
					<Button variant="primary" type="submit" className="mt-3" disabled={loading ? true : false} onClick={handleSubmit}>
						Submit
					</Button>
						</div>: 
						<div class="alert alert-info" role="alert" style={{width: "100%"}}>
							Please Select a deduction
						</div>
					}
					
				</Modal.Footer>
			</Modal.Body>
		</Modal>
	);
};

export default MasterDeductionModal;