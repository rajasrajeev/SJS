import React, { useEffect, useState } from 'react'
import TextInput from '../../../components/form/TextInput';
import PageTitle from '../../../components/dashboard/PageTitle';

import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../components/table/CustomTable';


const Statutory = () => {
  const [formData, setFormData] = useState({
    employeeStatutory: {
      pf_total_percentage: '',
      employee_percentage: '',
      pension_percentage: '',
      diff_percentage: '',
      pf_code1: '',
      pf_code2: '',
      pf_code3: '',
      uan_no: '',
      pf_no: '',
      pf_celling_amt: '',
      eer: '',
      eer_value: '',
      ee: '',
      ee_value: '',
      edli_wages: '',
      edli_percent: '',
      edli_percent_value: '',
      esic_total_percentage: '',
      esic_employee_percentage: '',
      esic_percent: '',
      esic_percent_value: '',
      esic_employeer_percentage: '',
      esic_er: '',
      esic_er_value: '',
      esic_ee: '',
      esic_ee_value: '',
      esic_establishment_code: '',
      esic_no: '',
      esic_celling_amt: '',
    },
    employeeLic: [],
  });

  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 2) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [keys[0]]: {
          ...prevFormData[keys[0]],
          [keys[1]]: value,
        },
      }));
    }
  };

  useEffect(() => {

  }, [search]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    { name: 'SlNo', selector: (row, index) => index + 1, sortable: true, width: '100px' },
    { name: "Name", selector: row => row.name, sortable: true },

  ];

  const handleChange = (e) => setFormData(e.target.value);

  const handleEdit = row => {
    setIsModalOpen(true);
  }

  const handleDeleteConfirm = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  }

  const handleDelete = (row) => {
    setSelectedItem(row.id);
    setIsDialogOpen(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <div className="statutory-tab mt-4">
              <PageTitle
        title="Statutory Settings"
        iname="bx bx-building-house"
      />
      {/* PF Section */}
      <div className='row'>
        <div className='col-md-12'>
          <section className='mt-4 mb-4'>
            <h5 style={{ fontWeight: 800 }}>PF</h5>
            <div className='row gy-3'>
              <div className="col-md-6 col-lg-3 col-xl-2">
                    <TextInput
                      label="PF Total %"
                      name="employeeStatutory.pf_total_percentage"
                      value={formData.employeeStatutory.pf_total_percentage}
                      onChange={onChange}
                      required
                      type='number'
                      allowDecimal={true}
                      leftLabel={true}
                    />
                  </div>
              <div className="col-md-6 col-lg-3 col-xl-2">
                    <TextInput
                      label="Employee %"
                      name="employeeStatutory.employee_percentage"
                      value={formData.employeeStatutory.employee_percentage}
                      onChange={onChange}
                      required
                      type='number'
                      allowDecimal={true}
                      leftLabel={true}
                    />
                  </div>
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="Pension %"
                  name="employeeStatutory.pension_percentage"
                  value={formData.employeeStatutory.pension_percentage}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  leftLabel={true}
                />
              </div>
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="Diff %"
                  name="employeeStatutory.diff_percentage"
                  value={formData.employeeStatutory.diff_percentage}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  leftLabel={true}
                />
              </div>
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="PF Celling Amount"
                  name="employeeStatutory.pf_celling_amt"
                  value={formData.employeeStatutory.pf_celling_amt}
                  onChange={onChange}
                  required
                  type='number'
                  leftLabel={true}
                />
              </div>
              
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="EDLI Wages"
                  name="employeeStatutory.edli_wages"
                  value={formData.employeeStatutory.edli_wages}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  leftLabel={true}
                />
               
              </div>
            </div>
            
            {/* <div className='row mt-4'>
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="PF Celling Amount"
                  name="employeeStatutory.pf_celling_amt"
                  value={formData.employeeStatutory.pf_celling_amt}
                  onChange={onChange}
                  required
                  type='number'
                  leftLabel={true}
                />
              </div>
              
              <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="EDLI Wages"
                  name="employeeStatutory.edli_wages"
                  value={formData.employeeStatutory.edli_wages}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  leftLabel={true}
                />
               
              </div>
            </div> */}
            <div className='row mt-4'>
              <div className='col-md-12 col-lg-6 col-xl-4 d-flex'>
                <h6
                  style={{ fontSize: '14px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                  Establishment PF Code<span style={{ color: '#d9534f', marginLeft: '2px', fontSize: '10px' }}>*</span>
                </h6>
                <TextInput
                  label=""
                  name="employeeStatutory.pf_code1"
                  value={formData.employeeStatutory.pf_code1}
                  onChange={onChange}
                  type='text'
                  width="80px"
                  leftLabel={true}
                />
                <TextInput
                  label=""
                  name="employeeStatutory.pf_code2"
                  value={formData.employeeStatutory.pf_code2}
                  onChange={onChange}
                  type='text'
                  width="150px"
                  leftLabel={true}
                />
                <TextInput
                  label=""
                  name="employeeStatutory.pf_code3"
                  value={formData.employeeStatutory.pf_code3}
                  onChange={onChange}
                  type='text'
                  width="100%"
                  leftLabel={true}
                />
              </div>
              {/* <div className='col-md-6 col-lg-4 col-xl-3'>
                <TextInput
                  label="UAN NO"
                  name="employeeStatutory.uan_no"
                  value={formData.employeeStatutory.uan_no}
                  onChange={onChange}
                  required
                  type='text'
                  leftLabel={true}
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
                  leftLabel={true}
                />
              </div> */}
            </div>
          </section>
        </div>

        <div className='col-md-12'>
          {/* ESIC Section */}
          <section className='mt-4 mb-4'>
            <h5 style={{ fontWeight: 800 }}>ESIC</h5>
            <div className='row'>
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="ESIC Total %"
                  name="employeeStatutory.esic_total_percentage"
                  value={formData.employeeStatutory.esic_total_percentage}
                  onChange={onChange}
                  required
                  type='number'
                  leftLabel={true}
                />
              </div>
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="Employee %"
                  name="employeeStatutory.esic_employee_percentage"
                  value={formData.employeeStatutory.esic_employee_percentage}
                  onChange={onChange}
                  required
                  type='number'
                  leftLabel={true}
                />
              </div>
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="Employer %"
                  name="employeeStatutory.esic_employeer_percentage"
                  value={formData.employeeStatutory.esic_employeer_percentage}
                  onChange={onChange}
                  required
                  type='number'
                  leftLabel={true}
                />
              </div>

              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="Establishment Code"
                  name="employeeStatutory.esic_establishment_code"
                  value={formData.employeeStatutory.esic_establishment_code}
                  onChange={onChange}
                  required
                  type='text'
                  leftLabel={true}
                />
              </div>
              <div className='col-md-6 col-lg-3 col-xl-2'>
                <TextInput
                  label="ESIC Celling Amount"
                  name="employeeStatutory.esic_celling_amt"
                  value={formData.employeeStatutory.esic_celling_amt}
                  onChange={onChange}
                  required
                  type='number'
                  allowDecimal={true}
                  leftLabel={true}
                />
              </div>
            </div>
          </section>
          <div className="col-md-2 align-self-end mb-2">
              <button type="submit" className="submit-button">
                Add 
              </button>
            </div>
        </div>
      </div>
      <div className='row'>
          <div className='col-md-12'>
            <CustomTable
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
              data={filteredData}
              showActions={true}
              showSearchBar={true}
              handleSearch={handleSearch}
              onView={() => alert("Will implement soon")}
            />
          </div>
          <div className='col-md-3'></div>
        </div>
    </div>
  );
};

export default Statutory;