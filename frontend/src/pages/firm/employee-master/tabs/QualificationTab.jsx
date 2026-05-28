import React from 'react';
import QualificationForm from './component/QualificationForm';

const QualificationTab = ({ formData, onChange }) => {
  const handleQualificationChange = (qualificationId, name, value) => {
    const updatedQualifications = formData.employeeQualification.map((qualification, index) =>
      index === qualificationId ? { ...qualification, [name]: value } : qualification
    );
    onChange({ target: { name: 'employeeQualification', value: updatedQualifications } });
  };

  const handleAddQualification = () => {
    const newQualification = {
      qualification: '',
      percentage: '',
      year: '',
      university: ''
    };
    onChange({
      target: {
        name: 'employeeQualification',
        value: [...formData.employeeQualification, newQualification]
      }
    });
  };

  const handleDeleteQualification = (qualificationId) => {
    if (formData.employeeQualification.length > 1) {
      const updatedQualifications = formData.employeeQualification.filter((_, index) => index !== qualificationId);
      onChange({ target: { name: 'employeeQualification', value: updatedQualifications } });
    } else {
      alert('At least one qualification entry is required.');
    }
  };

  return (
    <div className="qualification-tab">
      {/* <h2>Qualification</h2> */}
      <div className='row'>
        {formData.employeeQualification.map((qualificationData, index) => (
          <div className='col-md-6 col-lg-4' key={index}>
            <QualificationForm
              qualificationId={index}
              qualificationData={qualificationData}
              onInputChange={handleQualificationChange}
              onDelete={handleDeleteQualification}
              showDeleteButton={formData.employeeQualification.length > 1}
            />
          </div>
        ))}
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <button type="button" onClick={handleAddQualification} className="button mt-3">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualificationTab;