import React, { useEffect, useState } from 'react'
import RichTextField from '../../../../components/form/RichTextField';
import CustomTable from '../../../../components/table/CustomTable';
import CustomDropdown from '../../../../components/form/CustomDropdown ';
import { clearLocation, createStates, deleteState, fetchStates } from '../../../../features/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../../../../utils/dateFormat';
import DismissableAlert from '../../../../components/dashboard/miscellaneous/DismissableAlert';
import ConfirmationDialog from '../../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import UpdateModal from './UpdateModal';


const StateTab = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");
  const [country, setCountry] = useState(null);
  const { countries, loading, states,
    error, locationSuccess,
    created, skipped } = useSelector((store) => store.location);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { name: 'SlNo', selector: (row, index) => index + 1, sortable: true, width: '100px', },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Created At", selector: row => dateFormat(row.created_at), sortable: true },
  ];
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (countries.length > 0)
      setCountry(countries[0].id);

    return () => {
      dispatch(clearLocation());
    }
  }, []);

  useEffect(() => {
    if (country !== null)
      dispatch(fetchStates(country));
  }, [country]);

  useEffect(() => {
    setFilteredData(
      states.filter(
        (item) =>
          item.name?.toLowerCase().includes(search)

      )
    );
  }, [search, states]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = row => {
    dispatch(clearLocation());
    setIsModalOpen(true);
    setSelectedItem(row);
  }

  const handleDelete = (row) => {
    setSelectedItem(row.id);
    setIsDialogOpen(true);
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteState(selectedItem));
    setIsDialogOpen(false);
    setSelectedItem(null);
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedData = formData.trim();

    if (!trimmedData) {
      // add ui validation message
      return;
    }

    const stateNames = formData.split(',').map((name) => (name.trim()));
    dispatch(createStates({
      country_id: country,
      states: stateNames
    }));
    setFormData('');
  }

  const handleDropDown = (e) => {
    setCountry(e.target.value);
    setFormData("");
  }


  return (
    <>
      <section className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3">
              <CustomDropdown
                label="Country"
                name="countryForState"
                options={countries}
                value={country}
                onChange={handleDropDown}
                required
              />

            </div>
            <div className='col-md-3'>
              <RichTextField
                label="States"
                placeholder="States with comma separation (eg: Kerala, TN)"
                name="state"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2 align-self-end mb-2">
              <button type="submit" className="submit-button">
                Add States
              </button>
            </div>
          </div>
          {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
          {locationSuccess ? <DismissableAlert
            variant='success'
            title="success"
            msg={created ? `Created: ${created}, Skipped due to duplication: ${skipped}` : "State updated successfully"} />
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
        label="State"
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        location={
          {
            'id': selectedItem && selectedItem.country_id,
            'name': selectedItem && selectedItem.name,
            'selectedId': selectedItem && selectedItem.id
          }
        }
        method="state"
      />
    </>
  )
}

export default StateTab