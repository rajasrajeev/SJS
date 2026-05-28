import React, { useState, useEffect } from 'react';
import TextInput from '../../../../components/form/TextInput';
import './esiTab.scss'; // Ensure you import the SCSS file
import { useDispatch, useSelector } from 'react-redux';
import { createEsiData, fetchEsiData, updateEsiData } from '../../../../features/esiSlice';

const EsiTab = () => {
    const dispatch = useDispatch();
    const { esiData: esiDataList, loading, error } = useSelector((state) => state.esi);
    // If you expect only one ESIC record, use the first one
    const esiData = Array.isArray(esiDataList) && esiDataList.length > 0 ? esiDataList[0] : null;
    const [formData, setFormData] = useState({
        esic_total_percentage: '',
        employee_percentage: '',
        employer_percentage: '',
        establishment_code: '',
        esic_celling_amt: '',
    });

    // Fetch ESIC data on mount
    useEffect(() => {
        dispatch(fetchEsiData());
    }, [dispatch]);

    // Prefill form if esiData exists
    useEffect(() => {
        if (esiData) {
            setFormData({
                esic_total_percentage: esiData.esic_total_percentage || '',
                employee_percentage: esiData.employee_percentage || '',
                employer_percentage: esiData.employer_percentage || '',
                establishment_code: esiData.establishment_code || '',
                esic_celling_amt: esiData.esic_celling_amt || '',
            });
        }
    }, [esiData]);

    // Handle form input changes
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert number fields to float
        const payload = {
            ...formData,
            esic_total_percentage: parseFloat(formData.esic_total_percentage) || 0,
            employee_percentage: parseFloat(formData.employee_percentage) || 0,
            employer_percentage: parseFloat(formData.employer_percentage) || 0,
            esic_celling_amt: parseFloat(formData.esic_celling_amt) || 0,
        };

        if (esiData && esiData.id) {
            dispatch(updateEsiData({ id: esiData.id, esiData: payload }));
        } else {
            dispatch(createEsiData(payload));
        }
    };

    return (
        <div className="esi-tab mt-4">
            <form onSubmit={handleSubmit}>
                <div className='row mb-4'>
                    <div className='col-md-6 col-lg-3 col-xl-2'>
                        <TextInput
                            label="ESIC Total %"
                            name="esic_total_percentage"
                            value={formData.esic_total_percentage}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-2'>
                        <TextInput
                            label="Employee %"
                            name="employee_percentage"
                            value={formData.employee_percentage}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}

                        />
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-2'>
                        <TextInput
                            label="Employer %"
                            name="employer_percentage"
                            value={formData.employer_percentage}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-3'>
                        <TextInput
                            label="Establishment Code"
                            name="establishment_code"
                            value={formData.establishment_code}
                            onChange={onChange}
                            required
                            type='text'
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-2'>
                        <TextInput
                            label="ESIC Ceiling Amount"
                            name="esic_celling_amt"
                            value={formData.esic_celling_amt}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}
                        />
                    </div>
                    <div className="col-lg-1 align-self-end mb-1">
                        <button type="submit" className="submit-button">
                            {esiData ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </form>

            {esiData && (
                <div className="esi-summary-card mt-4">
                    <div className="summary-header">ESIC Summary</div>
                    <div className="summary-table">
                        <div className="row">
                            <span> <strong>ESIC Total %</strong> {esiData.esic_total_percentage}%</span>
                        </div>
                        <div className="row">
                            <span> <strong>Employee Contribution %</strong> {esiData.employee_percentage}%</span>
                        </div>
                        <div className="row">
                            <span> <strong>Employer Contribution %</strong>{esiData.employer_percentage}%</span>
                        </div>
                        <div className="row">
                            <span>   <strong>Establishment Code</strong>{esiData.establishment_code}</span>
                        </div>
                        <div className="row">
                            <span> <strong>ESIC Ceiling Amount</strong>₹{esiData.esic_celling_amt}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EsiTab;
