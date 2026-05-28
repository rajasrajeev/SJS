import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TextInput from '../../../components/form/TextInput';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import CheckBox from '../../../components/form/CheckBox';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import '../style.scss';

const MonthlyEarningsModal = ({ show, handleClose, data, earnings }) => {
    const [formData, setFormData] = useState({
        department: "",
        employeeCode: "",
        employeeName: "",
        earningName: "",
        earningAmount: "",
    });

    const [rows, setRows] = useState([
        { dept_code: "", emp_code: "", earning_code: "", amount: "" },
    ]);

    const [isNegativeAmount, setIsNegativeAmount] = useState(false);
    const [allowMultipleEntries, setAllowMultipleEntries] = useState(false);
    const [multiplyWithChecked, setMultiplyWithChecked] = useState(false);
    const [multiplyValue, setMultiplyValue] = useState("");

    useEffect(() => {
        if (data) {
            setFormData({
                department: data.department,
                employeeCode: data.employeeCode,
                employeeName: data.employeeName,
                earningName: data.earningName,
                earningAmount: data.earningAmount,
            });
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRowChange = (index, e) => {
        const updatedRows = [...rows];
        updatedRows[index][e.target.name] = e.target.value;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { dept_code: "", emp_code: "", earning_code: "", amount: "" }]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalPayload = {
            ...formData,
            rows,
            isNegativeAmount,
            allowMultipleEntries,
            multiplyWithChecked,
            multiplyValue,
        };
        console.log("Submitting Payload: ", finalPayload);
        handleClose();
    };

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Monthly Earnings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row border-box'>
                    <div className='col-lg-4'>
                        <CustomDropdown
                            label="Earning"
                            name="earningName"
                            options={earnings}
                            value={formData.earningName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-lg-4'>
                        <TextInput
                            label="Department"
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>
                    {/* <div className="col-lg-4 d-flex align-items-end mb-2">
                        <CheckBox
                            id="negAmount"
                            name="negAmount"
                            label="-Ve Amt"
                            value={isNegativeAmount}
                            onToggle={(checked) => setIsNegativeAmount(checked)}
                        />
                    </div> */}
                </div>

                <div className="row mt-3">
                    <div className="table-responsive ded-table">
                        <table id="deductionTable" className="table-bordered">
                            <thead>
                                <tr>
                                    <th>Dept Code</th>
                                    <th>Employee Code</th>
                                    <th>Earning Code</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}  style={{height: '30px'}}>
                                        <td><input type="text" name="dept_code" value={row.dept_code} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
                                        <td><input type="text" name="emp_code" value={row.emp_code} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
                                        <td><input type="text" name="earning_code" value={row.earning_code} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
                                        <td><input type="number" name="amount" value={row.amount} onChange={(e) => handleRowChange(index, e)} className="form-control tbl" /></td>
                                        <td>
                                            <button disabled={index === 0} className="action-button" onClick={() => handleRemoveRow(index)}>
                                                <i className="bx bx-trash" style={index === 0 ? { color: '#fff' } : { color: 'red' }}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <div className="row mt-4"> */}
                    
                    {/* <div className="col-lg-4">
                        <CheckBox
                            id="allowMultiple"
                            name="allowMultiple"
                            label="Allow multiple entries in same Earning"
                            value={allowMultipleEntries}
                            onToggle={(checked) => setAllowMultipleEntries(checked)}
                        />
                    </div> */}
                    {/* <div className="row  m-2">
                        <div className="col-md-3">
                            <CheckBox
                                id="multiplyWith"
                                name="multiplyWith"
                                label="Multiply With"
                                value={multiplyWithChecked}
                                onToggle={(checked) => setMultiplyWithChecked(checked)}
                            />
                        </div>
                        <div className='col-md-4'>
                            {multiplyWithChecked && (
                                <input
                                    type="number"
                                    className="form-control ms-2"
                                    placeholder="Enter value"
                                    value={multiplyValue}
                                    onChange={(e) => setMultiplyValue(e.target.value)}
                                />
                            )}
                        </div>
                    </div> */}
                    
                {/* </div> */}
                
                {/* <CheckBox
                    id="allowMultiple"
                    name="allowMultiple"
                    label="Allow multiple entries in same Earning"
                    value={allowMultipleEntries}
                    onToggle={(checked) => setAllowMultipleEntries(checked)}
                /> */}
                <Button variant="secondary" onClick={handleAddRow}>
                    Add Row
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                    </Button>
            </Modal.Body>
        </Modal>
    );
};

export default MonthlyEarningsModal;
