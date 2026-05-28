import React from 'react';
import BankAccountForm from './component/BankAccountForm';

const BankTab = ({ formData, onChange }) => {
  const handleBankChange = (bankId, name, value) => {
    const updatedAccounts = formData.employeeBank.map((account, index) =>
      index === bankId ? { ...account, [name]: value } : account
    );
    onChange({ target: { name: 'employeeBank', value: updatedAccounts } });
  };

  const handlePrimaryChange = (bankId) => {
    const updatedAccounts = formData.employeeBank.map((account, index) =>
      index === bankId ? { ...account, is_primary: true } : { ...account, is_primary: false }
    );
    onChange({ target: { name: 'employeeBank', value: updatedAccounts } });
  };

  const handleAddBankAccount = () => {
    if (formData.employeeBank.length < 4) {
      const updatedAccounts = [
        ...formData.employeeBank,
        { bank_name: '', account_no: '', ifsc: '', branch_name: '', is_primary: false },
      ];
      onChange({ target: { name: 'employeeBank', value: updatedAccounts } });
    } else {
      alert('You can only add up to 4 bank accounts.');
    }
  };

  const handleDeleteBankAccount = (bankId) => {
    if (formData.employeeBank.length > 1) {
      const updatedAccounts = formData.employeeBank.filter((_, index) => index !== bankId);
      onChange({ target: { name: 'employeeBank', value: updatedAccounts } });
    } else {
      alert('At least one bank account is required.');
    }
  };

  return (
    <div className="bank-tab">
      <div className='row'>
        {formData.employeeBank.map((bankData, index) => (
          <div className='col-md-6 col-lg-4' key={index}>
            <BankAccountForm
              bankId={index}
              bankData={bankData}
              onInputChange={handleBankChange}
              onPrimaryChange={handlePrimaryChange}
              onDelete={handleDeleteBankAccount}
              showDeleteButton={formData.employeeBank.length > 1 && index !== 0} // Only show delete for accounts after the first one
            />
            {formData.employeeBank.length > 1 && formData.employeeBank.length !== index+1}
          </div>
        ))}
        
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <button type="button" onClick={handleAddBankAccount} className="button mt-3">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankTab;