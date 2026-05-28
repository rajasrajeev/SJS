import React, { useState, useEffect } from 'react';
import RichTextField from '../../../../components/form/RichTextField';
import CustomTable from '../../../../components/table/CustomTable';
import CustomDropdown from '../../../../components/form/CustomDropdown ';
import { dateFormat } from '../../../../utils/dateFormat';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearLocation, fetchDistricts,
  fetchStates, createDistricts, deleteDistrict
} from '../../../../features/locationSlice';
import DismissableAlert from '../../../../components/dashboard/miscellaneous/DismissableAlert';
import ConfirmationDialog from '../../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import UpdateModal from './UpdateModal';

const DistrictTab = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const { countries, loading, districts, states,
    error, locationSuccess,
    created, skipped } = useSelector((store) => store.location);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (e) => setFormData(e.target.value);

  const columns = [
    { name: 'SlNo', selector: (row, index) => index + 1, sortable: true, width: '100px', },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Created At", selector: row => dateFormat(row.created_at), sortable: true },
  ];

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
    if (states.length > 0)
      setState(states[0].id);
  }, [states]);

  useEffect(() => {
    if (state !== null)
      dispatch(fetchDistricts(state));
  }, [state]);

  useEffect(() => {
    setFilteredData(
      districts.filter(
        (item) =>
          item.name?.toLowerCase().includes(search)

      )
    );
  }, [search, districts]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = row => {
    console.log('Edit:', row);
    dispatch(clearLocation());
    setIsModalOpen(true);
    setSelectedItem(row);
  };

  const handleDelete = (row) => {
    setSelectedItem(row.id);
    setIsDialogOpen(true);
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteDistrict(selectedItem));
    setIsDialogOpen(false);
    setSelectedItem(null);
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  }

  const handleStateDropdown = (e) => {
    setState(e.target.value);
    setFormData("");
  }

  const handleCountryDropdown = (e) => {
    setCountry(e.target.value)
    setFormData("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedData = formData.trim();

    if (!trimmedData) {
      // add ui validation message
      return;
    }

    const districtNames = formData.split(',').map((name) => (name.trim()));
    console.log(state, districtNames)
    dispatch(createDistricts({
      state_id: state,
      districts: districtNames
    }));
    setFormData('');
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
                onChange={handleCountryDropdown}
                required
              />
              <CustomDropdown
                label="State"
                name="stateForDistrict"
                options={states}
                value={state}
                onChange={handleStateDropdown}
                required
              />
            </div>
            <div className="col-md-3">
              <RichTextField
                label="Districts"
                placeholder="Districts with comma separation (eg: TVPM, EKM)"
                name="country"
                value={formData}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 align-self-end mb-2">
              <button type="submit" className="submit-button mb-4">
                Add Districts
              </button>
            </div>
          </div>
          {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
          {locationSuccess ? <DismissableAlert
            variant='success'
            title="success"
            msg={created ? `Created: ${created}, Skipped due to duplication: ${skipped}` : "District updated successfully"} />
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
        label="District"
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        location={
          {
            'id': selectedItem && selectedItem.state_id,
            'name': selectedItem && selectedItem.name,
            'selectedId': selectedItem && selectedItem.id
          }
        }
        method="district"
      />
    </>
  )
}

export default DistrictTab