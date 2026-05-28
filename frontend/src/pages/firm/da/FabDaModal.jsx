import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import { createFabDa, fetchFabDaMaster } from '../../../features/daSlice';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import TextInput from '../../../components/form/TextInput';

const FabDaModal = ({ show, handleClose, data }) => {
    const [formData, setFormData] = useState({
        da_constant: "",
        da_point: "",
        da_rs: "",
        id: null
    });
    const [manual, setManual] = useState(false);
    const [fixed, setFixed] = useState("");
    const [rate, setRate] = useState("");
    const [deduction, setDeduction] = useState("");
    const dispatch = useDispatch();
    const { loading, daSuccess, error, fabDaMaster } = useSelector((store) => store.da);

    // Fetch fab DA master data on mount
    useEffect(() => {
        if (fabDaMaster.length === 0) {
            dispatch(fetchFabDaMaster());
        }
    }, [dispatch, fabDaMaster.length]);

    // Transform fabDaMaster data to match component format
    const transformedDaConstants = React.useMemo(() => {
        return fabDaMaster.length > 0 ? fabDaMaster.map(item => ({
            id: item.id.toString(),
            name: `${item.name} (${item.fixed} & ${item.deduction} & ${item.rate})`,
            fixed: parseFloat(item.fixed),
            deduction: parseFloat(item.deduction),
            rate: parseFloat(item.rate)
        })) : [];
    }, [fabDaMaster]);

    // Prefill on edit
    useEffect(() => {
        if (data) {
            const constantId = data.fab_da_id ? data.fab_da_id.toString() : "";
            const found = transformedDaConstants.find(dc => dc.id === constantId);
            setFormData({
                da_constant: constantId,
                da_point: data.da_point || "",
                da_rate: data.da_rate || "",
                da_rs: data.amount || "",
                id: data.id
            });
            setFixed(found ? found.fixed : "");
            setRate(found ? found.rate : "");
            setDeduction(found ? found.deduction : "");
        } else {
            setFormData({
                da_constant: "",
                da_point: "",
                da_rs: "",
                id: null
            });
            setFixed("");
            setRate("");
            setDeduction("");
        }
        setManual(false);
    }, [data, show, transformedDaConstants]);

    // Update fixed/rate/deduction when constant changes
    useEffect(() => {
        const found = transformedDaConstants.find(dc => dc.id === formData.da_constant);
        setFixed(found ? found.fixed : "");
        setRate(found ? found.rate : "");
        setDeduction(found ? found.deduction : "");
    }, [formData.da_constant, transformedDaConstants]);

    // Calculate DA amount if not manual
    //(DA Point × Rate/Da) + Fixed Rate − Deduction
    useEffect(() => {
        if (!manual && formData.da_point && rate !== "" && fixed !== "" && deduction !== "") {
            const calc = (parseFloat(formData.da_point) * parseFloat(rate)) + parseFloat(fixed) - parseFloat(deduction);
            setFormData(fd => ({ ...fd, da_rs: isNaN(calc) ? "" : calc.toFixed(2) }));
        }
        if (!manual && (!formData.da_point || rate === "" || fixed === "" || deduction === "")) {
            setFormData(fd => ({ ...fd, da_rs: "" }));
        }
    }, [formData.da_point, rate, fixed, deduction, manual]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleManualToggle = () => {
        setManual(m => !m);
        // If turning off manual, recalculate amount
        if (manual && formData.da_point && rate !== "" && fixed !== "" && deduction !== "") {
            const calc = (parseFloat(formData.da_point) * parseFloat(rate)) + parseFloat(fixed) - parseFloat(deduction);
            setFormData(fd => ({ ...fd, da_rs: isNaN(calc) ? "" : calc.toFixed(2) }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createFabDa(formData));
    };

    useEffect(() => {
        if (daSuccess) handleClose();
    }, [daSuccess, handleClose]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Fab DA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                <Form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-md-6">
                            <CustomDropdown
                                label="Constants and rates"
                                name="da_constant"
                                options={transformedDaConstants}
                                value={formData.da_constant}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <TextInput
                                label="Fixed Rate"
                                type="number"
                                name="fixed"
                                value={fixed}
                                onChange={() => { }}
                                required
                                allowDecimal={true}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <TextInput
                                label="Rate/Da"
                                type="number"
                                name="rate"
                                value={rate}
                                onChange={() => { }}
                                required
                                allowDecimal={true}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <TextInput
                                label="Deduction"
                                type="number"
                                name="deduction"
                                value={deduction}
                                onChange={() => { }}
                                required
                                allowDecimal={true}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <TextInput
                                label="DA Point"
                                type="number"
                                name="da_point"
                                value={formData.da_point}
                                onChange={handleChange}
                                required
                                allowDecimal={true}
                                disabled={manual}
                            />
                        </div>
                        <div className="col-md-6 d-flex align-items-end">
                            <input
                                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                                className="form-check-input"
                                type="checkbox"
                                checked={manual}
                                onChange={handleManualToggle}
                                id="calc"
                            />
                            <label htmlFor="calc" style={{ marginBottom: 0, fontWeight: 500 }}>Override (Manual Amount Entry)</label>
                        </div>
                        <div className="col-md-6">
                            <TextInput
                                label="Amount"
                                type="number"
                                name="da_rs"
                                value={formData.da_rs}
                                onChange={manual ? handleChange : () => { }}
                                required
                                allowDecimal={true}
                                disabled={!manual}
                            />
                        </div>
                    </div>
                    <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default FabDaModal;
