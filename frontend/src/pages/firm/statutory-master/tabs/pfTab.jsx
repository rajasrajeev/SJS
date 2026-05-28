import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createPfData, fetchPfData, updatePfData } from '../../../../features/pfSlice';
import TextInput from '../../../../components/form/TextInput';
import './pfTab.scss'; //  sCSS file for styling
const PfTab = () => {
    const dispatch = useDispatch();
    const { pfData: pfDataList, loading, error } = useSelector((state) => state.pf);
  // If you expect only one PF record, use the first one
    const pfData = Array.isArray(pfDataList) && pfDataList.length > 0 ? pfDataList[0] : null;

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

    //const [pfData, setPfData] = useState(null); // Stores a single record

        // Prefill form if pfData exists
    useEffect(() => {
        dispatch(fetchPfData());
    }, [dispatch]);

    useEffect(() => {
        if (pfData) {
            // Split establishment_pf_code into parts for the form
            let pf_code1 = '', pf_code2 = '', pf_code3 = '';
            if (pfData.establishment_pf_code) {
                [pf_code1, pf_code2, pf_code3] = pfData.establishment_pf_code.split('-');
            }
            setFormData({
                pf_total_percentage: pfData.pf_total_percentage || '',
                employee_percentage: pfData.employee_percentage || '',
                pension_percentage: pfData.pension_percentage || '',
                diff_percentage: pfData.diff_percentage || '',
                pf_code1,
                pf_code2,
                pf_code3,
                pf_celling_amt: pfData.pf_celling_amt || '',
                edli_wages: pfData.edli_wages || '',
            });
        }
    }, [pfData]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Combine pf_code1, pf_code2, and pf_code3 into establishment_pf_code
        const establishment_pf_code = `${formData.pf_code1}-${formData.pf_code2}-${formData.pf_code3}`;
    
        // Create the payload
        const payload = {
          ...formData,
           pf_total_percentage: parseFloat(formData.pf_total_percentage) || 0,
        employee_percentage: parseFloat(formData.employee_percentage) || 0,
        pension_percentage: parseFloat(formData.pension_percentage) || 0,
        diff_percentage: parseFloat(formData.diff_percentage) || 0,
        pf_celling_amt: parseFloat(formData.pf_celling_amt) || 0,
        edli_wages: parseFloat(formData.edli_wages) || 0,
          establishment_pf_code, // Add the combined code
        };
    
        // Remove individual pf_code fields from the payload
        delete payload.pf_code1;
        delete payload.pf_code2;
        delete payload.pf_code3;
    
        console.log("Payload:", payload);
                if (pfData) {
            dispatch(updatePfData({ id: pfData.id, pfData: payload }));
        } else {
            dispatch(createPfData(payload));
        }
      };

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
                            {pfData ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Summary View */}
            {pfData && (
    <div className="pf-summary-card mt-4">
        <h5 className="summary-header">Provident Fund Details</h5>
        <div className="summary-table">
            <div className="row">
                 <span><strong>PF Total %:</strong> {pfData.pf_total_percentage}</span></div>
            <div className="row">
                 <span><strong>Employee %:</strong>{pfData.employee_percentage}</span></div>
            <div className="row"><span><strong>Pension %:</strong>  {pfData.pension_percentage}</span></div>
            <div className="row">
                <span><strong>Diff %:</strong> {pfData.diff_percentage}</span></div>
            <div className="row">
               <span>  <strong>PF Ceiling Amount:</strong>
                {pfData.pf_celling_amt}</span></div>
            <div className="row"><span><strong>EDLI Wages:</strong> 
                {pfData.edli_wages}</span></div>
            <div className="row">
                 <span><strong>PF Code:</strong>
                    {pfData.establishment_pf_code}</span></div>
        </div>
    </div>
)}


        </div>
    );
};

export default PfTab;
