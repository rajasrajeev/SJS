import React, { useEffect, useState,useMemo } from "react";
import TextInput from "../../../../components/form/TextInput";

import ImageUpload from "../../../../components/form/ImageUpload";
import DefaultLogo from "../../../../assets/100.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, fetchStates } from "../../../../features/locationSlice";
import CustomDropdown from "../../../../components/form/CustomDropdown ";

const AddressTab = ({ formData, onChange }) => {
  const dispatch = useDispatch();
  const { countries, states } = useSelector((store) => store.location);

  const [copyAddress, setCopyAddress] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState({
    house_no: "",
    house_name: "",
    street_name: "",
    place: "",
    pincode: "",
    country_id: "",
    state_id: "",
    district_id: "",
    is_permanent: true,
  });
  const [temporaryAddress, setTemporaryAddress] = useState({
    house_no: "",
    house_name: "",
    street_name: "",
    place: "",
    pincode: "",
    country_id: "",
    state_id: "",
    district_id: "",
    is_permanent: false,
  });

  const [mobNoCountryCode, setMobNoCountryCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [altMobNoCountryCode, setAltMobNoCountryCode] = useState("");
  const [altMobileNo, setAltMobileNo] = useState("");
const MEDIA_URL = process.env.REACT_APP_MEDIA_URL;
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (formData.employeeAddress && Array.isArray(formData.employeeAddress)) {
      const permanent = formData.employeeAddress.find((addr) => addr.is_permanent) || {};
      const temporary = formData.employeeAddress.find((addr) => !addr.is_permanent) || {};

      setPermanentAddress(permanent);
      setTemporaryAddress(temporary);
    }
  }, [formData.employeeAddress]);

  useEffect(() => {
    if (formData.mobile_no) {
      const [countryCode, mobileNumber] = formData.mobile_no.split(" ");
      setMobNoCountryCode(countryCode || "");
      setMobileNo(mobileNumber || "");
    }

    if (formData.alt_mobile_no) {
      const [altCountryCode, altMobileNumber] = formData.alt_mobile_no.split(" ");
      setAltMobNoCountryCode(altCountryCode || "");
      setAltMobileNo(altMobileNumber || "");
    }
  }, [formData.mobile_no, formData.alt_mobile_no]);



    // Memoize the image URL to avoid unnecessary object URL creation
const imageUrl = useMemo(() => {
  if (!formData.photo) return DefaultLogo;
  if (typeof formData.photo === "string") {
    if (formData.photo.startsWith("http")) {
      return formData.photo;
    }
    // Remove trailing slash from MEDIA_URL and leading slash from photo path
    const base = MEDIA_URL?.replace(/\/$/, "") || "";
    const path = formData.photo.replace(/^\//, "");
    return `${base}/${path}`;
  }
  return URL.createObjectURL(formData.photo);
}, [formData.photo, MEDIA_URL]);

  const handlePrimaryMobileChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobNoCountryCode") {
      setMobNoCountryCode(value);
    } else if (name === "mobileNo") {
      setMobileNo(value);
    }

    const combinedMobile = `${name === "mobNoCountryCode" ? value : mobNoCountryCode} ${
      name === "mobileNo" ? value : mobileNo
    }`.trim();
    onChange({ target: { name: "mobile_no", value: combinedMobile } });
  };

  const handleAlternateMobileChange = (e) => {
    const { name, value } = e.target;

    if (name === "altMobNoCountryCode") {
      setAltMobNoCountryCode(value);
    } else if (name === "altMobileNo") {
      setAltMobileNo(value);
    }

    const combinedAltMobile = `${name === "altMobNoCountryCode" ? value : altMobNoCountryCode} ${
      name === "altMobileNo" ? value : altMobileNo
    }`.trim();
    onChange({ target: { name: "alt_mobile_no", value: combinedAltMobile } });
  };

  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "permanent") {
      const updatedAddress = { ...permanentAddress, [name]: value };
      setPermanentAddress(updatedAddress);
      updateParentState(updatedAddress, temporaryAddress);
    } else {
      const updatedAddress = { ...temporaryAddress, [name]: value };
      setTemporaryAddress(updatedAddress);
      updateParentState(permanentAddress, updatedAddress);
    }
  };

  const handleCountryChange = (e, type) => {
    const { value } = e.target;

    if (type === "permanent") {
      const updatedAddress = { ...permanentAddress, country_id: value };
      setPermanentAddress(updatedAddress);
      updateParentState(updatedAddress, temporaryAddress);
      dispatch(fetchStates(value));
    } else {
      const updatedAddress = { ...temporaryAddress, country_id: value };
      setTemporaryAddress(updatedAddress);
      updateParentState(permanentAddress, updatedAddress);
      dispatch(fetchStates(value));
    }
  };

  const handleStateChange = (e, type) => {
    const { value } = e.target;

    if (type === "permanent") {
      const updatedAddress = { ...permanentAddress, state_id: value };
      setPermanentAddress(updatedAddress);
      updateParentState(updatedAddress, temporaryAddress);
    } else {
      const updatedAddress = { ...temporaryAddress, state_id: value };
      setTemporaryAddress(updatedAddress);
      updateParentState(permanentAddress, updatedAddress);
    }
  };

  const handleCopyAddressChange = (e) => {
    const isChecked = e.target.checked;
    setCopyAddress(isChecked);

    if (isChecked) {
      const copiedAddress = { ...permanentAddress, is_permanent: false };
      setTemporaryAddress(copiedAddress);
      updateParentState(permanentAddress, copiedAddress);
    } else {
      const clearedAddress = {
        house_no: "",
        house_name: "",
        street_name: "",
        place: "",
        pincode: "",
        country_id: "",
        state_id: "",
        district_id: "",
        is_permanent: false,
      };
      setTemporaryAddress(clearedAddress);
      updateParentState(permanentAddress, clearedAddress);
    }
  };

  const updateParentState = (permanent, temporary) => {
    const updatedEmployeeAddress = [
        { ...permanent, is_permanent: true }, // Permanent address
        { ...temporary, is_permanent: false } // Temporary address
    ];

    onChange({
        target: {
            name: "employeeAddress",
            value: updatedEmployeeAddress,
        },
    });
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name: "photo", value: file } });
    }
  };

  return (
    <div className="address-tab">
      <div className="row">
        {/* Permanent Address */}
        <div className="col-md-6 col-lg-6 col-xl-4">
          <div className="address-card">
            <h6>Permanent Address</h6>
            <TextInput
              label="House No"
              name="house_no"
              value={permanentAddress.house_no}
              onChange={(e) => handleAddressChange(e, "permanent")}
            />
            <TextInput
              label="House Name"
              name="house_name"
              value={permanentAddress.house_name}
              onChange={(e) => handleAddressChange(e, "permanent")}
            />
            <TextInput
              label="Street Name"
              name="street_name"
              value={permanentAddress.street_name}
              onChange={(e) => handleAddressChange(e, "permanent")}
            />
            <TextInput
              label="Place"
              name="place"
              value={permanentAddress.place}
              onChange={(e) => handleAddressChange(e, "permanent")}
            />
            <TextInput
              label="Pincode"
              name="pincode"
              value={permanentAddress.pincode}
              onChange={(e) => handleAddressChange(e, "permanent")}
            />
            <CustomDropdown
              label="Country"
              name="country_id"
              options={countries || []}
              value={permanentAddress.country_id}
              onChange={(e) => handleCountryChange(e, "permanent")}
            />
            <CustomDropdown
              label="State"
              name="state_id"
              options={states || []}
              value={permanentAddress.state_id}
              onChange={(e) => handleStateChange(e, "permanent")}
            />
          </div>
        </div>

        {/* Temporary Address */}
        <div className="col-md-6 col-lg-6 col-xl-4">
          <div className="address-card">
            <div className="d-flex justify-content-between align-items-center">
              <h6>Temporary Address</h6>
              <label>
                <input
                  type="checkbox"
                  checked={copyAddress}
                  onChange={handleCopyAddressChange}
                />
                Same as Permanent Address
              </label>
            </div>
            <TextInput
              label="House No"
              name="house_no"
              value={temporaryAddress.house_no}
              onChange={(e) => handleAddressChange(e, "temporary")}
            />
            <TextInput
              label="House Name"
              name="house_name"
              value={temporaryAddress.house_name}
              onChange={(e) => handleAddressChange(e, "temporary")}
            />
            <TextInput
              label="Street Name"
              name="street_name"
              value={temporaryAddress.street_name}
              onChange={(e) => handleAddressChange(e, "temporary")}
            />
            <TextInput
              label="Place"
              name="place"
              value={temporaryAddress.place}
              onChange={(e) => handleAddressChange(e, "temporary")}
            />
            <TextInput
              label="Pincode"
              name="pincode"
              value={temporaryAddress.pincode}
              onChange={(e) => handleAddressChange(e, "temporary")}
            />
            <CustomDropdown
              label="Country"
              name="country_id"
              options={countries || []}
              value={temporaryAddress.country_id}
              onChange={(e) => handleCountryChange(e, "temporary")}
            />
            <CustomDropdown
              label="State"
              name="state_id"
              options={states || []}
              value={temporaryAddress.state_id}
              onChange={(e) => handleStateChange(e, "temporary")}
            />
          </div>
        </div>

        {/* Image Upload and Contact Details */}
        <div className="col-md-12 col-lg-4 col-xl-4">
          <div className="address-tab-container">
            <ImageUpload
              label="Photo"
              name="photo"
              //defaultImage={formData.photo ? (typeof formData.photo === "string" ? formData.photo : URL.createObjectURL(formData.photo)) : DefaultLogo}
               defaultImage={imageUrl}
              handleChange={handleImageChange}
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="Mobile"
              name="mobNoCountryCode"
              value={mobNoCountryCode}
              onChange={handlePrimaryMobileChange}
              width="20%"
            />
            <TextInput
              label="Number"
              name="mobileNo"
              type="mobile"
              value={mobileNo}
              onChange={handlePrimaryMobileChange}
              width="80%"
            />
          </div>
          <div className="d-flex gap-1">
            <TextInput
              label="Alternate"
              name="altMobNoCountryCode"
              value={altMobNoCountryCode}
              onChange={handleAlternateMobileChange}
              width="20%"
            />
            <TextInput
              label="Number"
              name="altMobileNo"
              type="mobile"
              value={altMobileNo}
              onChange={handleAlternateMobileChange}
              width="80%"
            />
          </div>
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressTab;