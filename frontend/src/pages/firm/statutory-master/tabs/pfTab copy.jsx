import React, { useState } from 'react';
import TextInput from '../../../../components/form/TextInput';
import CustomTable from '../../../../components/table/CustomTable';

const PfTab = () => {
    const [formData, setFormData] = useState({
        pf_total_percentage: '',
        employee_percentage: '',
        pension_percentage: '',
        diff_percentage: '',
        pf_code1: '',
        pf_code2: '',
        pf_code3: '',
        pf_celling_amt: '',
        edli_wages: '',
    });

    const [pfData, setPfData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pfData.length === 0) {
            // If no data exists, add a new entry
            setPfData([formData]);
            setFilteredData([formData]);
        } else {
            // Update existing data
            handleUpdate();
        }
    };

    const handleUpdate = () => {
        setPfData([formData]); // Replace the existing entry
        setFilteredData([formData]);
    };

    const columns = [
        { name: 'SlNo', selector: (_, index) => index + 1, sortable: true, width: '100px' },
        { name: 'PF Total %', selector: row => row.pf_total_percentage, sortable: true },
        { name: 'Employee %', selector: row => row.employee_percentage, sortable: true },
        { name: 'Pension %', selector: row => row.pension_percentage, sortable: true },
        { name: 'Diff %', selector: row => row.diff_percentage, sortable: true },
        { name: 'PF Code', selector: row => `${row.pf_code1}-${row.pf_code2}-${row.pf_code3}`, sortable: true },
        { name: 'PF Celling Amount', selector: row => row.pf_celling_amt, sortable: true },
        { name: 'EDLI Wages', selector: row => row.edli_wages, sortable: true },
    ];

    return (
        <div className="pf-tab mt-4">
            <form onSubmit={handleSubmit}>
                <div className='row gy-3'>
                    <div className="col-md-6 col-lg-3 col-xl-2">
                        <TextInput
                            label="PF Total %"
                            name="pf_total_percentage"
                            value={formData.pf_total_percentage}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}
                        />
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-2">
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
                            label="Pension %"
                            name="pension_percentage"
                            value={formData.pension_percentage}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-2'>
                        <TextInput
                            label="Diff %"
                            name="diff_percentage"
                            value={formData.diff_percentage}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-2'>
                        <TextInput
                            label="PF Celling Amount"
                            name="pf_celling_amt"
                            value={formData.pf_celling_amt}
                            onChange={onChange}
                            required
                            type='number'
                        />
                    </div>
                    <div className='col-md-6 col-lg-3 col-xl-2'>
                        <TextInput
                            label="EDLI Wages"
                            name="edli_wages"
                            value={formData.edli_wages}
                            onChange={onChange}
                            required
                            type='number'
                            allowDecimal={true}
                        />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-md-12 col-lg-6 col-xl-4'>
                        <h6 style={{ fontSize: '14px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                            Establishment PF Code<span style={{ color: '#d9534f', marginLeft: '2px', fontSize: '10px' }}>*</span>
                        </h6>
                        <div className='d-flex'>
                            <TextInput
                                label=""
                                name="pf_code1"
                                value={formData.pf_code1}
                                onChange={onChange}
                                type='text'
                                width="80px"
                            />
                            <TextInput
                                label=""
                                name="pf_code2"
                                value={formData.pf_code2}
                                onChange={onChange}
                                type='text'
                                width="150px"
                            />
                            <TextInput
                                label=""
                                name="pf_code3"
                                value={formData.pf_code3}
                                onChange={onChange}
                                type='text'
                                width="100%"
                            />
                        </div>
                    </div>
                    <div className="col-md-2 align-self-end mt-3 mb-2">
                        <button type="submit" className="submit-button">
                            {pfData.length === 0 ? "Add" : "Update"}
                        </button>
                    </div>
                </div>
            </form>
            <div className='row'>
                <div className='col-md-12'>
                    <CustomTable
                        columns={columns}
                        data={pfData} // Always show only one record
                        showActions={false}
                        showSearchBar={false} // No need for search since there is only one record
                        pagination={false} // Disabled pagination since there's only one record
                    />
                </div>
            </div>
        </div>
    );
};

export default PfTab;
