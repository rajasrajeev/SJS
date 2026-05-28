import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TextInput from "../../../components/form/TextInput";
import RichTextField from "../../../components/form/RichTextField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  fetchStates,
  fetchDistricts,
  clearStates,
  clearDistricts,
} from "../../../features/locationSlice";
import CustomDropdown from "../../../components/form/CustomDropdown ";
import DismissableAlert from "../../../components/dashboard/miscellaneous/DismissableAlert";
import { clearBranch } from "../../../features/branchSlice";


const UpdateBranchModal = ({ isOpen, onRequestClose, branchData, onSave }) => {
  const dispatch = useDispatch();
  const { countries, states, districts } = useSelector((store) => store.location);
  const { loading, error } = useSelector((store) => store.branch);

  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    email_id: "",
    address: "",
    country: "",
    state: "",
    district: "",
  });

  useEffect(() => {
    dispatch(fetchCountries());
    
    return () => {
      dispatch(clearStates());
      dispatch(clearDistricts());
      dispatch(clearBranch())
    };
  }, [dispatch]);

  // Pre-fill formData and fetch state/district when branchData changes
  useEffect(() => {
    if (branchData) {
      setFormData({
        ...branchData,
        country: branchData.country_id,
        state: branchData.state_id,
        district: branchData.district_id,
      });

      if (branchData.country_id) dispatch(fetchStates(branchData.country_id));
      if (branchData.state_id) dispatch(fetchDistricts(branchData.state_id));
    }
  }, [branchData, dispatch]);

  useEffect(() => {
    dispatch(fetchCountries());

    return () => {
      dispatch(clearStates());
      dispatch(clearDistricts());
    };
  }, [dispatch]);

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, state: "", district: "" }));
    dispatch(fetchStates(value));
    dispatch(clearDistricts());
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, district: "" }));
    dispatch(fetchDistricts(value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: branchData.id,
      name: formData.name,
      address: formData.address,
      contact_no: formData.contact_no,
      email_id: formData.email_id,
      country: parseInt(formData.country, 10),
      state: parseInt(formData.state, 10),
      district: parseInt(formData.district, 10),
    });
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Branch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error ? <DismissableAlert variant="danger" title="Error" msg={error ? error.message : "Something went wrong"}/> : null}
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <TextInput
                label="Branch Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Contact Number"
                name="contact_no"
                type="tel"
                value={formData.contact_no}
                onChange={handleChange}
                required
              />
              <TextInput
                label="Email ID"
                name="email_id"
                type="email"
                value={formData.email_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <CustomDropdown
                label="Country"
                name="country"
                options={Array.isArray(countries) ? countries.map((c) => ({ id: c.id, name: c.name })): []}
                value={formData.country}
                onChange={handleCountryChange}
                required
              />
              <CustomDropdown
                label="State"
                name="state"
                options={Array.isArray(states) ? states.map((s) => ({ id: s.id, name: s.name })): []}
                value={formData.state}
                onChange={handleStateChange}
                required
              />
              <CustomDropdown
                label="District"
                name="district"
                options={Array.isArray(districts) ? districts.map((d) => ({ id: d.id, name: d.name })): []}
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12">
              <RichTextField
                className="rich-text-field-address"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button disabled={loading ? true : false} variant="primary" type="submit" className="mx-2">
            Save
          </Button>
          <Button variant="secondary" onClick={onRequestClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateBranchModal;
