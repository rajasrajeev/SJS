import React, { useEffect, useState } from 'react';
import TextInput from '../../../components/form/TextInput';
import CustomTable from '../../../components/table/CustomTable';
import PageTitle from '../../../components/dashboard/PageTitle';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearDeduction,
  createDeduction,
  deleteDeduction,
  fetchMasterDeductions,
} from '../../../features/deductionMasterSlice';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import UpdateModal from './UpdateModal';
import MultiSelectDropdown from '../../../components/form/MultiSelectDropdown';
import {
  fetchDeductionCategories,
  fetchDeductionTypes,
  fetchMonths,
} from '../../../features/optionsSlice';

const DeductionMaster = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    code: '',
    acc_code: '',
    name: '',
    type: '',
    amount: '',
    installment_amt: '',
    interest: '',
    month: [],
    category: '',
  });

  const { deductions, loading, error, deductionSuccess } = useSelector((store) => store.deduction);
  const { deductionTypes, deductionCategories, months: monthOptions } = useSelector((store) => store.options || {});

  const [selected, setSelected] = useState(null);
  const [monthlySelected, setMonthlySelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchMasterDeductions());
    dispatch(fetchDeductionTypes());
    dispatch(fetchDeductionCategories());
    dispatch(fetchMonths());

    return () => {
      dispatch(clearDeduction());
    };
  }, [dispatch]);

  useEffect(() => {
    setFormData({
      code: '',
      acc_code: '',
      name: '',
      type: '',
      amount: '',
      installment_amt: '',
      interest: '',
      month: [],
      category: '',
    });
  }, [deductions]);

  useEffect(() => {
    const deductionList = Array.isArray(deductions) ? deductions : deductions?.data || [];

    if (deductionList.length > 0) {
      if (search.trim() === '') {
        setFilteredData(deductionList);
      } else {
        const filtered = deductionList.filter(
          (item) =>
            item.amount?.toString().includes(search) ||
            item.installment_amt?.toString().includes(search) ||
            item.interest?.toString().includes(search) ||
            item.acc_code?.toString().includes(search) ||
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.basic?.toString().includes(search) ||
            item.code?.toLowerCase().includes(search.toLowerCase()) ||
            item.effective_date?.toString().includes(search),
        );
        setFilteredData(filtered);
      }
    } else {
      setFilteredData([]);
    }
  }, [search, deductions]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'type' && value === 'Monthly') setMonthlySelected(true);
    if (name === 'type' && (value === 'Master' || value === 'Advance')) setMonthlySelected(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.code.trim() === '' ||
      formData.name.trim() === '' ||
      formData.acc_code.trim() === '' ||
      formData.type === '' ||
      formData.amount === ''
    )
      return;

    dispatch(createDeduction(formData));
  };

  const handleEdit = (row) => {
    dispatch(clearDeduction());
    setSelected(row);
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setSelected(row);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteDeduction(selected.id));
    setIsDialogOpen(false);
    setSelected(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelected(null);
  };

  const columns = [
    {
      name: 'Sl No',
      selector: (row, index) => index + 1,
      width: '100px',
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: 'Account Code',
      selector: (row) => row.acc_code,
      sortable: true,
    },
    {
      name: 'Deduction Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Deduction Amount',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Installment Amount',
      selector: (row) => row.installment_amt,
      sortable: true,
    },
    {
      name: 'Interest Percentage',
      selector: (row) => row.interest,
      sortable: true,
    },
  ];

  const deductionTypeOptions = deductionTypes || [];
  const categories = deductionCategories || [];
  const months = monthOptions || [];

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');




  const handleToggleMonth = (month) => {
    const updatedSelectedMonth = selectedMonths.some((b) => b.id === month.id)
      ? selectedMonths.filter((b) => b.id !== month.id)
      : [...selectedMonths, month];

    setSelectedMonths(updatedSelectedMonth);
    setFormData({
      ...formData,
      month: updatedSelectedMonth.map((b) => b.id),
    });
  };

  return (
    <>
      <div className="add-deduction mt-4">
        <PageTitle title="Deduction Master" iname="bi bi-person-badge-fill" />

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <TextInput label="Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="col-md-4 col-lg-3 col-xl-2">
              <TextInput label="Code" type="text" name="code" value={formData.code} onChange={handleChange} required />
            </div>

            <div className="col-md-4 col-lg-3 col-xl-2">
              <TextInput
                label="Acc Code"
                type="text"
                name="acc_code"
                value={formData.acc_code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 col-lg-3 col-xl-2">
              <CustomDropdown
                label="Deduction Type"
                name="type"
                options={deductionTypeOptions}
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 col-lg-3 col-xl-2">
              <CustomDropdown
                label="Category Type"
                name="category"
                options={categories}
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            {
              formData.category === 'FULLWITHOUTUNRECOVER' ||
              formData.category === 'POSSIBLEWITHUNRECOVER' ||
              formData.category === 'FULLWITHUNRECOVER' ||
              formData.category === 'CHARTWITHINTEREST' ||
              formData.category === 'CHARTWITHOUTINTEREST' ||
              formData.category === 'MONTHLYSETTINGWITHOUTUNRECOVER' ? (
                <div className="col-md-4 col-lg-3 col-xl-2">
                  <TextInput
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    allowDecimal={true}
                    disabled={monthlySelected}
                  />
                </div>
              ) : null
            }

            {formData.category === 'CHARTWITHINTEREST' ||
            formData.category === 'CHARTWITHOUTINTEREST' ||
            formData.category === 'FULLWITHOUTUNRECOVER' ? (
              <div className="col-md-4 col-lg-3 col-xl-2">
                <TextInput
                  label="Interest Percentage"
                  type="number"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  allowDecimal={true}
                  disabled={monthlySelected}
                />
              </div>
            ) : null}

            {formData.category === 'MONTHLYSETTINGWITHOUTUNRECOVER' ? (
              <div className="col-md-4 col-lg-3 col-xl-2">
                <MultiSelectDropdown
                  label="Months"
                  options={months}
                  selectedOptions={selectedMonths}
                  onToggle={handleToggleMonth}
                />
              </div>
            ) : null}

            {formData.category === 'CHARTWITHINTEREST' ||
            formData.category === 'FULLWITHOUTUNRECOVER' ||
            formData.category === 'CHARTWITHOUTINTEREST' ? (
              <div className="col-md-4 col-lg-3 col-xl-2">
                <TextInput
                  label="Installment Amount"
                  type="number"
                  name="installment_amt"
                  value={formData.installment_amt}
                  onChange={handleChange}
                  allowDecimal={true}
                  disabled={monthlySelected}
                />
              </div>
            ) : null}

            <div className="col-md-4 col-lg-3 col-xl-2" style={{ marginTop: '20px' }}>
              <button type="submit">Submit</button>
            </div>
          </div>

          <div className="row"></div>

          {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
          {deductionSuccess ? (
            <DismissableAlert variant="success" title="success" msg="Save completed succesfully" />
          ) : null}
        </form>

        <br />

        <CustomTable
          columns={columns}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
          showSearchBar={true}
          addButton={{ show: false }}
          handleSearch={handleSearch}
          onView={() => alert('Will implement soon')}
        />
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Are you sure?"
        message="This action cannot be undone"
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
      />

      <UpdateModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={selected}
        types={deductionTypeOptions}
        categories={categories}
        months={months}
      />
    </>
  );
};

export default DeductionMaster;

