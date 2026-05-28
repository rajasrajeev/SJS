import React, { useState } from 'react';
import TextInput from '../../../../components/form/TextInput';
import CheckBox from '../../../../components/form/CheckBox';

const StatutoryTab = ({ formData, onChange }) => {
  const [checkdata, setCheckdata] = useState({
    effect_pf: false,
    effect_esic: false,
  });

  const handleLicChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLicData = formData.employeeLic.map((lic, i) =>
      i === index ? { ...lic, [name]: value } : lic
    );
    onChange({ target: { name: 'employeeLic', value: updatedLicData } });
  };

  const addLicEntry = () => {
    if (formData.employeeLic.length < 6) {
      const updatedLicData = [...formData.employeeLic, { lic_no: '', lic_amount: '', is_primary: false }];
      onChange({ target: { name: 'employeeLic', value: updatedLicData } });
    } else {
      alert('You can only add up to 6 LIC entries.');
    }
  };


  const deleteLicEntry = (index) => {
    const updatedLicData = formData.employeeLic.filter((_, i) => i !== index);
    onChange({ target: { name: 'employeeLic', value: updatedLicData } });
  };

  // const handleCheckboxChange = (name, checked) => {
  //   setCheckdata((prevState) => ({ ...prevState, [name]: checked }));
  // };
  const handleCheckboxChange = (name, checked) => {
    onChange({
      target: {
        name,
        value: checked,
      },
    });
  };

  return (
    <div className="statutory-tab">
      {/* PF Section */}
      <div className='row'>
        <div className='col-md-12'>
          <section className='mt-4 mb-4'>
            <div className='d-flex gap-3 align-items-center'>
              <h5 style={{ fontWeight: 800 }} className='mt-3'>PF</h5>
              <CheckBox
                label=""
                id="pf"
                name="employeeStatutory.is_pf"
                value={formData.employeeStatutory.is_pf}
                onToggle={(checked) => handleCheckboxChange('employeeStatutory.is_pf', checked)}
              />
            </div>

            <div className='row gy-3'>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="UAN NO"
                  name="employeeStatutory.uan_no"
                  value={formData.employeeStatutory.uan_no}
                  onChange={onChange}
                  required
                  type='text'
                  disabled={!formData.employeeStatutory.is_pf}
                />
              </div>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="PF NO"
                  name="employeeStatutory.pf_no"
                  value={formData.employeeStatutory.pf_no}
                  onChange={onChange}
                  required
                  type='text'
                  disabled={!formData.employeeStatutory.is_pf}
                />
              </div>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="PF Amount"
                  name="employeeStatutory.pf_amount"
                  value={formData.employeeStatutory.pf_amount}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  disabled={!formData.employeeStatutory.is_pf}
                />
              </div>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="VPF %"
                  name="employeeStatutory.vpf_percentage"
                  value={formData.employeeStatutory.vpf_percentage}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  disabled={!formData.employeeStatutory.is_pf}
                />
              </div>
            </div>
          </section>
        </div>

        <div className='col-md-12'>
          {/* ESIC Section */}
          <section className='mt-4 mb-4'>
            <div className='d-flex gap-3 align-items-center'>
              <h5 style={{ fontWeight: 800 }} className='mt-3'>ESIC</h5>
              <CheckBox
                label=""
                id="esic"
                name="employeeStatutory.is_esic"
                value={formData.employeeStatutory.is_esic}
                onToggle={(checked) => handleCheckboxChange('employeeStatutory.is_esic', checked)}
              />
            </div>

            <div className='row'>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="ESIC NO"
                  name="employeeStatutory.esic_no"
                  value={formData.employeeStatutory.esic_no}
                  onChange={onChange}
                  required
                  type='text'
                  disabled={!formData.employeeStatutory.is_esic}
                />
              </div>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="LWF"
                  name="employeeStatutory.lwf"
                  value={formData.employeeStatutory.lwf}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  disabled={!formData.employeeStatutory.is_esic}
                />
              </div>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="Other"
                  name="employeeStatutory.other"
                  value={formData.employeeStatutory.other}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  disabled={!formData.employeeStatutory.is_esic}
                />
              </div>
            </div>
          </section>
        </div>

        <div className='col-md-12'>
          {/* LIC Section */}
          <section className='mt-4 mb-4'>
            <h5 style={{ fontWeight: 800 }}>LIC</h5>
            <div className='row'>
              {formData.employeeLic.map((lic, index) => (
                <div className='col-md-12' key={index}>
                  <div className="lic-entry">
                    <div className='row'>
                      <div className='col-md-3'>
                        <TextInput
                          label="LIC Number"
                          name="lic_no"
                          value={lic.lic_no}
                          onChange={(e) => handleLicChange(index, e)}
                          type='number'
                          //leftLabel={true}
                        />
                      </div>
                      <div className='col-md-3'>
                        <TextInput
                          label="LIC Amount"
                          name="lic_amount"
                          value={lic.lic_amount}
                          onChange={(e) => handleLicChange(index, e)}
                          type='number'
                          allowDecimal={true}
                          //leftLabel={true}
                        />
                      </div>
                      <div className='col-md-3 d-flex align-items-end mb-1'>
                        {formData.employeeLic.length > 1 && (
                          <button
                            type="button"
                            className='button-danger'
                            onClick={() => deleteLicEntry(index)}
                            style={{
                              backgroundColor: '#ff4d4d',
                              color: '#fff',
                              borderRadius: '5px',
                              padding: '5px 10px',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className='button-primary' onClick={addLicEntry}
              style={{
                backgroundColor: '#181c2e',
                color: '#f8f8f8',
                borderRadius: '5px',
                padding: '5px',
                height: "37px"
              }}
            >
              Add
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StatutoryTab;