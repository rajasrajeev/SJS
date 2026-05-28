import React from 'react';
import TextInput from '../../../../../components/form/TextInput';
import { datePickerFormats } from '../../../../../utils/dateFormat';

const ExperienceForm = ({ experienceId, experienceData, onInputChange, onDelete, showDeleteButton }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(experienceId, name, value);
  };

  const handleDelete = () => {
    onDelete(experienceId);
  };

  return (
    <div className="experience-form">
      <div className='row gy-4'>
        <div className='col-md-12'>
          <TextInput
            label="Firm Name"
            name="firm_name"
            value={experienceData.firm_name}
            onChange={handleChange}
            //required
            // leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="Place"
            name="place"
            value={experienceData.place}
            onChange={handleChange}
            //required
           // leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="Joining Date"
            type="date"
            name="joining_date"
            value={datePickerFormats(experienceData.joining_date)}
            onChange={handleChange}
            //required
           // leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="Resigning Date"
            type="date"
            name="resigning_date"
            value={datePickerFormats(experienceData.resigning_date)}
            onChange={handleChange}
            //required
           // leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="Designation"
            name="designation"
            value={experienceData.designation}
            onChange={handleChange}
            //required
           // leftLabel={true}
          />
        </div>
        {showDeleteButton && (
          <div className='col-md-12 d-flex justify-content-end'>
            <button type="button" onClick={handleDelete} 
             className="btn btn-danger btn-sm ms-3 mt-0"
            //  style={{
            //   backgroundColor: '#ff4d4d',
            //   color: '#fff',
            //   borderRadius: '5px',
            //   padding: '3px 15px',
            //   border: 'none',
            //   cursor: 'pointer',
            //   marginTop: '0px'
            // }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {/* <hr></hr> */}
    </div>
  );
};

export default ExperienceForm;