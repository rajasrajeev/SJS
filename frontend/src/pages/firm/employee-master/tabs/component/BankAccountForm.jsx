import React from 'react';
import TextInput from '../../../../../components/form/TextInput';

const BankAccountForm = ({ bankId, bankData, onInputChange, onPrimaryChange,onDelete,showDeleteButton   }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(bankId, name, value);
  };

  const handleRadioChange = () => {
    onPrimaryChange(bankId, true);
  };

  const handleDelete = () => {
    onDelete(bankId);
  };

  return (
    <div className="bank-account-form">
      <div className='row gy-4'>
        <div className='col-md-12'>
          <TextInput
            label="Bank Name"
            name="bank_name"
            value={bankData.bank_name}
            onChange={handleChange}
            required
           // leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="Branch Name"
            name="branch_name"
            value={bankData.branch_name}
            onChange={handleChange}
            required
            //leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="IFSC Code"
            name="ifsc"
            value={bankData.ifsc}
            onChange={handleChange}
            required
           // leftLabel={true}
          />
        </div>
        <div className='col-md-12'>
          <TextInput
            label="A/C No"
            name="account_no"
            value={bankData.account_no}
            onChange={handleChange}
            required
            type='number'
           // leftLabel={true}
          />
        </div>
        <div className='col-md-10 mt-4'>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="primary_account"
              id={`primaryBank${bankId}`}
              checked={bankData.is_primary}
              onChange={handleRadioChange}
            />
            <label className="form-check-label" htmlFor={`primaryBank${bankId}`}>
              Primary Bank Account
            </label>
          </div>
        </div>
        {showDeleteButton && (
        <div className='col-md-2 d-flex justify-content-end mb-4'>
          <button
            type="button"
             className="btn btn-danger btn-sm ms-3 mt-0"
            onClick={handleDelete}
            // style={{
            //   backgroundColor: '#ff4d4d',
            //   color: '#fff',
            //   borderRadius: '5px',
            //   padding: '7px 15px',
            //   border: 'none',
            //   cursor: 'pointer',
            // // marginTop: '25px'
            // }}
          >
            Delete
          </button>
        </div>)}
      </div>
    </div>
  );
};

export default BankAccountForm;