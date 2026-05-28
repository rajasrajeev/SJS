import React, { useState, useEffect } from "react";
import TextInput from '../../../components/form/TextInput';
import DatePicker from '../../../components/form/DatePicker';
import PageTitle from '../../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchStates, fetchDistricts, clearDistricts } from '../../../features/locationSlice';
import "../firm-profile/FirmProfileUpdate.scss"
import CustomDropdown from "../../../components/form/CustomDropdown ";
import DismissableAlert from "../../../components/dashboard/miscellaneous/DismissableAlert";
import RichTextField from "../../../components/form/RichTextField";
import { createBranch, updateBranch } from "../../../features/branchSlice";
import { useLocation } from 'react-router-dom';
import { datePickerFormat } from "../../../utils/dateFormat";


const AddBranch = () => {
    const location = useLocation();
    const [branchData, setBranchData] = useState(location.state?.branch);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact_no: '',
        contact_no_2: '',
        email_id: '',
        web: '',
        fdb_no: '',
        branch_status: '',
        incorporation_no: '',
        gst_no: '',
        other_license: '',
        state: '',
        district: '',
        country: '',
        start_date: '',
        trade_lic_no: '',
        pin: "",
        land_phone: '',
        reg_no: ''
    });

    const firmStatusOptions = [
        { name: "Proprietor", id: "PROPRIETOR" },
        { name: "Partnership", id: "PARTNERSHIP" },
        { name: "Company", id: "COMPANY" },
        { name: "Others", id: "OTHER" },
    ];

    const { countries, states, districts } = useSelector((store) => store.location);
    const { loading, error, success } = useSelector((store) => store.branch);

    useEffect(() => {
        dispatch(fetchCountries());
    }, []);

    useEffect(() => {
        if (location.pathname === '/firm-dashboard/add-branch') {
            setBranchData(null);
            setFormData({
                name: '',
                address: '',
                contact_no: '',
                contact_no_2: '',
                email_id: '',
                web: '',
                fdb_no: '',
                branch_status: '',
                incorporation_no: '',
                gst_no: '',
                other_license: '',
                state: '',
                district: '',
                country: '',
                start_date: '',
                trade_lic_no: '',
                pin: "",
                land_phone: '',
                reg_no: ''
            });
        }
    }, [location]);

    useEffect(() => {
        if (location.pathname !== '/firm-dashboard/add-branch' && branchData) {
            setFormData({
                ...branchData,
                country: branchData.country_id,
                state: branchData.state_id,
                district: branchData.district_id,
                name: branchData.name,
                address: branchData.address,
                contact_no: branchData.contact_no,
                contact_no_2: branchData.contact_no_2,
                email_id: branchData.email_id,
                web: branchData.web,
                fdb_no: branchData.fdb_no,
                branch_status: branchData.branch_status,
                incorporation_no: branchData.incorporation_no,
                gst_no: branchData.gst_no,
                other_license: branchData.other_license,
                start_date: branchData.start_date ? datePickerFormat(new Date(branchData.start_date)) : '',
                trade_lic_no: branchData.trade_lic_no,
                pin: branchData.pin,
                land_phone: branchData.land_phone,
                reg_no: branchData.reg_no
            });

            if (branchData.country_id) dispatch(fetchStates(branchData.country_id));
            if (branchData.state_id) dispatch(fetchDistricts(branchData.state_id));
        }
    }, [branchData]);

    const handleCountryChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        dispatch(fetchStates(value));
        dispatch(clearDistricts());
    };

    const handleStateChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        dispatch(fetchDistricts(value));
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                "logo": e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(branchData && branchData.id) {
            dispatch(updateBranch({
                ...formData,
                id: parseInt(branchData.id, 10),
                country: parseInt(formData.country, 10),
                state: parseInt(formData.state, 10),
                district: parseInt(formData.district, 10),
            }));
        } else {
            dispatch(createBranch({
                ...formData,
                country: parseInt(formData.country, 10),
                state: parseInt(formData.state, 10),
                district: parseInt(formData.district, 10),
            }));
        }

    };

    return (
        <div className="mt-4">
            <PageTitle
                title={branchData && branchData.id ? "Edit Branch detail" : "Add New Branch"}
                iname="bi bi-person-fill"
            />
            {error ? <DismissableAlert variant="danger" title="Error" msg={error}/> : null}
            {success ? <DismissableAlert 
                        variant='success'           
                        title="success" 
                        msg={'Branch Saved successfully'}/>
            : null} 
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-xl-8">
                            <div className="firm-name">
                                <p>{formData.name}</p>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-xl-6"> 
                                  <TextInput
                                    label="Branch Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    leftLabel={true}
                                  />
                                    <RichTextField
                                        className="rich-text-field"
                                        label="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        height={5}
                                        leftLabel={true}
                                    />
                                </div>
                                <div className="col-md-12 col-lg-12 col-xl-6">
                                    <CustomDropdown
                                        label="Country"
                                        name="country"
                                        options={countries || []}
                                        value={formData.country}
                                        onChange={handleCountryChange}
                                        required
                                        leftLabel={true}
                                    />
                                    <CustomDropdown
                                        label="State"
                                        name="state"
                                        options={states || []}
                                        value={formData.state}
                                        onChange={handleStateChange}
                                        required
                                        leftLabel={true}
                                    />
                                    <CustomDropdown
                                        label="District"
                                        name="district"
                                        options={districts || []}
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                        leftLabel={true}
                                    />
                                    <TextInput label="PIN Code"
                                      name="pin"
                                      value={formData.pin}
                                      onChange={handleChange}
                                      leftLabel={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <TextInput
                                label="Land Phone"
                                name="land_phone"
                                value={formData.land_phone}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                             <TextInput
                                label="Mobile"
                                name="contact_no"
                                value={formData.contact_no}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                            <TextInput
                                label="Mobile"
                                name="contact_no_2"
                                value={formData.contact_no_2}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-4">
                            <CustomDropdown
                                label="Branch Status"
                                name="branch_status"
                                options={firmStatusOptions}
                                value={formData.branch_status}
                                onChange={handleChange}
                                required
                                leftLabel={true}
                            />
                            <DatePicker
                                label="Start Date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                            <TextInput
                                label="Web"
                                name="web"
                                value={formData.web}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <TextInput
                                label="Email"
                                name="email_id"
                                value={formData.email_id}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-4">
                          <TextInput
                              label="Incorporation No:"
                              name="incorporation_no"
                              value={formData.incorporation_no}
                              onChange={handleChange}
                              leftLabel={true}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <TextInput
                                label="Register Number"
                                name="reg_no"
                                value={formData.reg_no}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-4">
                          <TextInput
                              label="GST Number"
                              name="gst_no"
                              value={formData.gst_no}
                              onChange={handleChange}
                              leftLabel={true}
                          />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-4">
                            <TextInput
                                label="Trade LIC No"
                                name="trade_lic_no"
                                value={formData.trade_lic_no}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                label="FDB"
                                name="fdb_no"
                                value={formData.fdb_no}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                            <TextInput
                                label="Others"
                                name="other_license"
                                value={formData.other_license}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                    </div>
                    <button
                     disabled={loading ? true : false}
                        type="submit"
                        className="submit-button-firm sticky-buttons"
                    >{loading ? "Loading..." : "Submit"}</button>
                </form>
            </div>

        </div>
    );
};

export default AddBranch;