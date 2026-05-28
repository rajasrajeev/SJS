import React from 'react';
import ExperienceForm from './component/ExperienceForm';

const ExperienceTab = ({ formData, onChange }) => {
  const handleExperienceChange = (experienceId, name, value) => {
    const updatedExperiences = formData.employeeExperience.map((experience, index) =>
      index === experienceId ? { ...experience, [name]: value } : experience
    );
    onChange({ target: { name: 'employeeExperience', value: updatedExperiences } });
  };

  const handleAddExperience = () => {
    const newExperience = {
      firm_name: '',
      place: '',
      joining_date: '',
      resigning_date: '',
      designation: ''
    };
    onChange({
      target: {
        name: 'employeeExperience',
        value: [...formData.employeeExperience, newExperience]
      }
    });
  };

  const handleDeleteExperience = (experienceId) => {
    if (formData.employeeExperience.length > 1) {
      const updatedExperiences = formData.employeeExperience.filter((_, index) => index !== experienceId);
      onChange({ target: { name: 'employeeExperience', value: updatedExperiences } });
    } else {
      alert('At least one experience entry is required.');
    }
  };

  return (
    <div className="experience-tab">
      {/* <h2>Experience</h2> */}
      <div className='row'>
        {formData.employeeExperience.map((experienceData, index) => (
          <div className='col-md-6 col-lg-4' key={index}>
            <ExperienceForm
              experienceId={index}
              experienceData={experienceData}
              onInputChange={handleExperienceChange}
              onDelete={handleDeleteExperience}
              showDeleteButton={formData.employeeExperience.length > 1}
            />
          </div>
        ))}
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <button type="button" onClick={handleAddExperience} className="button mt-3">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTab;