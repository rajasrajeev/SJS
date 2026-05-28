import React, { useEffect, useState } from 'react'
import CustomTable from '../../../components/table/CustomTable';
import TextInput from '../../../components/form/TextInput';
import PageTitle from '../../../components/dashboard/PageTitle';
import { clearShift, fetchShifts, createShift, deleteShift } from '../../../features/shiftSlice';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import UpdateModal from './UpdateModal';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import { time, days } from '../../../utils/timeAndDays';
import CustomDropdown from '../../../components/form/CustomDropdown ';

const ShiftMaster = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    start: "",
    end: "",
    start_day: ""
  });
  const { shifts, loading, error, shiftSuccess } = useSelector((store) => store.shift);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchShifts());

    return () => {
      dispatch(clearShift());
    }
  }, []);

  useEffect(() => {
    setFormData({
      name: "",
      code: "",
      start: "",
      end: "",
      start_day: ""
    })
  }, [shifts]);

  useEffect(() => {
    setFilteredData(
      shifts.filter(
        (item) =>
          item.name?.toLowerCase().includes(search) ||
          item.code?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, shifts]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddShift = (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.name.trim() === '' ||
      formData.code.trim() === '' ||
      formData.start.trim() === '' ||
      formData.end.trim() === '') {
      return;
    }

    dispatch(createShift(formData));
  };

  const handleEditShift = (shift) => {
    dispatch(clearShift());
    setSelected(shift);
    setIsModalOpen(true);
  };

  const handleDeleteShift = (shift) => {
    setSelected(shift);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteShift(selected.id));
    setIsDialogOpen(false);
    setSelected(null);
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelected(null);
  }

  const columns = [
    { name: 'SlNo', selector: (row, index) => index + 1, width: '100px' },
    {
      name: 'Shift Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Shift Code',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: 'Start time',
      selector: (row) => row.start,
      sortable: true,
    },
    {
      name: 'End Time',
      selector: (row) => row.end,
      sortable: true,
    },
    {
      name: 'Start Day',
      selector: (row) => row.start_day,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="add-department mt-4">
        <PageTitle
          title="Shift Master"
          iname="bi bi-calendar-event"
        />
        <form action="">
          <div className='row mb-4'>
            <div className='col-md-3 col-lg-3'>
              <TextInput
                label="Shift Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                type='text'
              />
            </div>
            <div className='col-md-3 col-lg-2 '>
              <TextInput
                label="Code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                type='text'
              />
            </div>
            <div className="col-md-3  col-lg-2">
              <CustomDropdown
                label="Start Time"
                name="start"
                options={time}
                value={formData.start}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3  col-lg-2">
              <CustomDropdown
                label="End Time"
                name="end"
                options={time}
                value={formData.end}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3  col-lg-2">
              <CustomDropdown
                label="Start Day"
                name="start_day"
                options={days}
                value={formData.start_day}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-1' style={{ marginTop: '20px' }}>
              <button className="add-department-button" onClick={handleAddShift}>
                Submit
              </button>
            </div>
          </div>
          {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
          {shiftSuccess ? <DismissableAlert
            variant='success'
            title="success"
            msg="Save completed succesfully" />
            : null}
        </form>
        <CustomTable
          columns={columns}
          data={filteredData}
          onEdit={handleEditShift}
          onDelete={handleDeleteShift}
          showActions={true}
          showSearchBar={true}
          handleSearch={handleSearch}
          onView={() => alert("Will implement soon")}
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
      />
    </>
  );
};

export default ShiftMaster;