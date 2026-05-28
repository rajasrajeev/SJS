import React, { useState, useEffect } from "react";
import TextInput from '../../../components/form/TextInput';
import ImageUpload from '../../../components/form/ImageUpload';
import DatePicker from '../../../components/form/DatePicker';
import PageTitle from '../../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchStates, fetchDistricts, clearDistricts } from '../../../features/locationSlice';
import "./FirmProfileUpdate.scss"
import CustomDropdown from "../../../components/form/CustomDropdown ";
import DefaultLogo from '../../../assets/100.png';
import { clearFirm, fetchFirm, updateFirm } from "../../../features/firmSlice";
import { datePickerFormat } from "../../../utils/dateFormat";
import DismissableAlert from "../../../components/dashboard/miscellaneous/DismissableAlert";
import RichTextField from "../../../components/form/RichTextField";

const FirmProfileUpdate = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact_no: '',
        contact_no_2: '',
        email_id: '',
        web: '',
        fdb_no: '',
        firm_status: '',
        incorporation_no: '',
        gst_no: '',
        other_license: '',
        state: '',
        district: '',
        country: '',
        start_date: '',
        business_type: '',
        trade_lic_no: '',
        pin: "",
        land_phone: '',
        reg_no: '',
        logo: null,
        firm_type: 'SHOP'
    });

    const firmStatusOptions = [
        { name: "Proprietor", id: "PROPRIETOR" },
        { name: "Partnership", id: "PARTNERSHIP" },
        { name: "Company", id: "COMPANY" },
        { name: "Others", id: "OTHER" },
    ];

    const { countries, states, districts } = useSelector((store) => store.location);
    const { loading, error, firm, firmSuccess } = useSelector((store) => store.firm);

    useEffect(() => {
        dispatch(fetchFirm());
        dispatch(fetchCountries());

        return () => {
            dispatch(clearFirm());
        }
    }, []);

    useEffect(() => {
        if (firm !== null) {
            if (firm.country_id) dispatch(fetchStates(firm.country_id));
            if (firm.state_id) dispatch(fetchDistricts(firm.state_id));

            setFormData({
                name: firm.name,
                address: firm.address,
                contact_no: firm.contact_no,
                contact_no_2: firm.contact_no_2,
                email_id: firm.email_id,
                web: firm.web,
                fdb_no: firm.fdb_no,
                firm_status: firm.firm_status,
                incorporation_no: firm.incorporation_no,
                gst_no: firm.gst_no,
                other_license: firm.other_license,
                state: firm.state_id,
                district: firm.district_id,
                country: firm.country_id,
                start_date: firm.start_date ? datePickerFormat(new Date(firm.start_date)) : '', // Validate date
                business_type: firm.business_type,
                trade_lic_no: firm.trade_lic_no,
                logo: firm.logo,
                land_phone: firm.land_phone,
                reg_no: firm.reg_no,
                pin: firm.pin,
                firm_type: firm.firm_type
            })
        }
    }, [firm]);

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
        const blobData = new FormData();
        blobData.append("address", formData.address);
        blobData.append("contact_no", formData.contact_no);
        blobData.append("contact_no_2", formData.contact_no_2);
        blobData.append("email_id", formData.email_id);
        blobData.append("web", formData.web);
        blobData.append("fdb_no", formData.fdb_no);
        blobData.append("firm_status", formData.firm_status);
        blobData.append("firm_type", formData.firm_type);
        blobData.append("incorporation_no", formData.incorporation_no);
        blobData.append("gst_no", formData.gst_no);
        blobData.append("other_license", formData.other_license);
        blobData.append("country_id", formData.country);
        blobData.append("state_id", formData.state);
        blobData.append("district_id", formData.district);
        blobData.append("start_date", formData.start_date);
        blobData.append("business_type", formData.business_type);
        blobData.append("trade_lic_no", formData.trade_lic_no);
        blobData.append("pin", formData.pin);
        blobData.append("land_phone", formData.land_phone);
        blobData.append("reg_no", formData.reg_no);

        if (formData.logo !== null && formData.logo !== 'assets/default-user.jpg') blobData.append("logo", formData.logo);

        dispatch(updateFirm({
            id: firm.id,
            formData: blobData
        }))
    };

    return (
        <div className="mt-4">
            <PageTitle
                title="Firm Profile"
                iname="bi bi-person-fill"
            />
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                        {firmSuccess ? <DismissableAlert
                            variant='success'
                            title="success"
                            msg={'Profile Updated successfully'} />
                            : null}
                        <div className="col-md-3 mb-4">

                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-xl-8">
                            <div className="firm-name">
                                <p>{formData.name}</p>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-xl-6"> 
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
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <ImageUpload
                                className=""
                                label="Logo"
                                name="logo"
                                defaultImage={firm ? `${process.env.REACT_APP_MEDIA_URL}${firm.logo}` : DefaultLogo}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <TextInput label="PIN Code"
                                name="pin"
                                value={formData.pin}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                label="Type of Business"
                                name="business_type"
                                value={formData.business_type}
                                onChange={handleChange}
                                leftLabel={true}
                            />
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
                        </div>
                        <div className="col-md-4">
                            <CustomDropdown
                                label="Firm Status"
                                name="firm_status"
                                options={firmStatusOptions}
                                value={formData.firm_status}
                                onChange={handleChange}
                                required
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-3">
                            <DatePicker
                                label="Firm Start Date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <TextInput
                                label="Mobile"
                                name="contact_no"
                                value={formData.contact_no}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                label="Mobile"
                                name="contact_no_2"
                                value={formData.contact_no_2}
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
                            <div id="da"> 
                                {/* <label>Firm Type </label>
                                <div className="radio-group">
                                    <input 
                                        type="radio" 
                                        name="firm_type" 
                                        value="SHOP"  
                                        checked={formData.firm_type === 'SHOP'}
                                        onChange={handleChange}
                                    />Shop
                                    <input 
                                        type="radio" 
                                        name="firm_type" 
                                        value="FAB"
                                        checked={formData.firm_type === 'FAB'}
                                        onChange={handleChange}
                                    />Fab
                                    <input 
                                        type="radio" 
                                        name="firm_type" 
                                        value="OTHER"
                                        checked={formData.firm_type === 'OTHER'}
                                        onChange={handleChange}
                                    />Others
                                </div> */}
                            </div>
                            <TextInput
                                label="Register Number"
                                name="reg_no"
                                value={formData.reg_no}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                        <div className="col-md-4">
                            <br/>
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
                                label="GST Number"
                                name="gst_no"
                                value={formData.gst_no}
                                onChange={handleChange}
                                leftLabel={true}
                            />
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
                                label="Others"
                                name="other_license"
                                value={formData.other_license}
                                onChange={handleChange}
                                leftLabel={true}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="submit-button-firm sticky-buttons"
                        disabled={loading ? true : false}
                    >{loading ? "Loading..." : "Update"}</button>
                </form>
            </div>

        </div>
    );
};

export default FirmProfileUpdate;