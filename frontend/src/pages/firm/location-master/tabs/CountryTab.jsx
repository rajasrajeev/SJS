import React, { useEffect, useState } from 'react'
import RichTextField from '../../../../components/form/RichTextField'
import CustomTable from '../../../../components/table/CustomTable';
import { createCountries, fetchCountries, deleteCountry, clearLocation } from '../../../../features/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../../../../utils/dateFormat';
import DismissableAlert from '../../../../components/dashboard/miscellaneous/DismissableAlert';
import ConfirmationDialog from '../../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import UpdateModal from './UpdateModal';


const CountryTab = () => {
  const [formData, setFormData] = useState("");
  const dispatch = useDispatch();
  const { countries, loading,
    error, locationSuccess,
    created, skipped } = useSelector((store) => store.location);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchCountries());
    console.log("country" + countries);

    return () => {
      dispatch(clearLocation());
    }
  }, []);

  useEffect(() => {
    setFilteredData(
      countries.filter(
        (item) =>
          item.name?.toLowerCase().includes(search)

      )
    );
  }, [search, countries]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    { name: 'SlNo', selector: (row, index) => index + 1, sortable: true, width: '100px' },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Created At", selector: row => dateFormat(row.created_at), sortable: true },
  ];

  const handleChange = (e) => setFormData(e.target.value);

  const handleEdit = row => {
    dispatch(clearLocation());
    setCurrentCountry(row);
    setIsModalOpen(true);
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteCountry(selectedItem));
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

    const trimmedData = formData.trim();

    if (!trimmedData) {
      // add ui validation message
      return;
    }

    const countryNames = formData.split(',').map((name) => ({ name: name.trim() }));
    dispatch(createCountries(countryNames));
    setFormData('');
  }

  return (
    <>
      <section className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3">
              <RichTextField
                label="Countries"
                placeholder="Countries with comma separation (eg: India, USA, Russia)"
                name="country"
                value={formData}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 align-self-end mb-2">
              <button type="submit" className="submit-button">
                Add Countries
              </button>
            </div>
          </div>
          {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
          {locationSuccess ? <DismissableAlert
            variant='success'
            title="success"
            msg={created ? `Created: ${created}, Skipped due to duplication: ${skipped}` : 'Country updated successfully'} />
            : null}
        </form>

        <div className='row'>
          <div className='col-md-6'>
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

      </section>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Are you sure?"
        message="This action cannot be undone"
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
      />
      <UpdateModal
        label="Country"
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        location={currentCountry}
        method="country"
      />
    </>
  )
}

export default CountryTab