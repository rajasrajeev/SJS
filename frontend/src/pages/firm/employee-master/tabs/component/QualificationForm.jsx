import React from 'react';
import TextInput from '../../../../../components/form/TextInput';


const QualificationForm = ({ qualificationId, qualificationData, onInputChange, onDelete, showDeleteButton }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(qualificationId, name, value);
  };

  const handleDelete = () => {
    onDelete(qualificationId);
  };

  return (
    <div className="qualification-form">
      <div className='row gy-4'>
        <div className='col-md-12'>
          <TextInput
            label="Qualification"
            name="qualification"
            value={qualificationData.qualification}
            onChange={handleChange}
            //required
            //leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="Year"
            name="year"
            value={qualificationData.year}
            onChange={handleChange}
           // required
            //leftLabel={true}
          />

        </div>
        <div className='col-md-12'>
          <TextInput
            label="% Mark"
            name="percentage"
            value={qualificationData.percentage}
            onChange={handleChange}
            //required
            //leftLabel={true}
          />
        </div>
        
        <div className='col-md-12'>
          <TextInput
            label="University"
            name="university"
            value={qualificationData.university}
            onChange={handleChange}
            //required
            //leftLabel={true}
          />
        </div>
        {showDeleteButton && (
          <div className='col-md-12 d-flex justify-content-end'>
            <button type="button" onClick={handleDelete} 
             className="btn btn-danger btn-sm ms-3 mt-0"
              // style={{
              //   backgroundColor: '#ff4d4d',
              //   color: '#fff',
              //   borderRadius: '5px',
              //   padding: '3px 15px',
              //   border: 'none',
              //   cursor: 'pointer',
              //   marginTop: '0px',
              //   height: '30px'
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

export default QualificationForm;