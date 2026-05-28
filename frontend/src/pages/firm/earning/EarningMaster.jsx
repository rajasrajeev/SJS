import React, { useState, useEffect } from 'react';
import TextInput from "../../../components/form/TextInput";
import CustomTable from "../../../components/table/CustomTable";
import PageTitle from "../../../components/dashboard/PageTitle";
import CustomDropdown from "../../../components/form/CustomDropdown ";
import { useDispatch, useSelector } from 'react-redux';
import { clearEarning, createEarning, deleteEarning, fetchEarnings } from "../../../features/earningSlice";
import CheckBox from '../../../components/form/CheckBox';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import UpdateModal from './UpdateModal';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';


const EarningMaster = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    code: "",
    acc_code: "",
    name: "",
    type: "",
    effect_pf: false,
    effect_csi: false,
  });

  const earningTypes = [
    { id: "Master", name: "Master" },
  ];

  const { earnings, loading, error, earningSuccess } = useSelector((store) => store.earning);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchEarnings());

    return () => {
      dispatch(clearEarning());
    }
  }, []);

  useEffect(() => {
    setFormData({
      code: "",
      acc_code: "",
      name: "",
      type: "",
      effect_pf: false,
      effect_csi: false,
    });
  }, [earnings]);

  useEffect(() => {
    setFilteredData(
      earnings.filter(
        (item) =>
          item.type?.toLowerCase().includes(search) ||
          item.acc_code?.toString().includes(search) ||
          item.name?.toLowerCase().includes(search) ||
          item.code?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, earnings]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxToggle = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [value]: !prevFormData[value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.code.trim() === '' ||
      formData.name.trim() === '' ||
      formData.acc_code.trim() === '' ||
      formData.type === ''
    ) return;

    console.log(formData);
    dispatch(createEarning(formData));
  };

  const handleEdit = (row) => {
    dispatch(clearEarning());
    console.log(row);
    setSelected(row);
    setIsModalOpen(true);
  }

  const handleDelete = (row) => {
    setSelected(row);
    setIsDialogOpen(true);
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteEarning(selected.id));
    setIsDialogOpen(false);
    setSelected(null);
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelected(null);
  }

  const columns = [
    { name: 'Sl No', selector: (row, index) => index + 1, width: '100px' },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Acc Code", selector: (row) => row.acc_code, sortable: true },
    { name: "Select Type", selector: (row) => row.type, sortable: true },
    {
      name: "Effect ESI",
      selector: (row) => row.effectESI,
      cell: (row) => (row.effect_csi ?
        <i class="bi bi-check-circle-fill" style={{ color: "green" }}></i> :
        <i class="bi bi-x-circle-fill" style={{ color: "red" }}></i>)
    },
    {
      name: "Effect PF",
      selector: (row) => row.effectPF,
      cell: (row) => (row.effect_pf ?
        <i class="bi bi-check-circle-fill" style={{ color: "green" }}></i> :
        <i class="bi bi-x-circle-fill" style={{ color: "red" }}></i>)
    },

  ];

  return (
    <div className="add-earning mt-4">
      <PageTitle title="Earning Master" iname="bi bi-graph-up" />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 col-lg-2 col-xl-2">
            <TextInput
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 col-lg-2 col-xl-2">
            <TextInput
              label="Acc Code"
              name="acc_code"
              value={formData.acc_code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 col-lg-3 col-xl-2">
            <CustomDropdown
              label="Select Type"
              name="type"
              options={earningTypes}
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 col-lg-2 col-xl-2 mt-3" style={{ display: "flex", alignItems: "center", maxWidth: "180px" }}>
            <CheckBox
              label="PF"
              id="pf"
              name="effect_pf"
              value={formData.effect_pf}
              onToggle={(checked) =>
                setFormData((prevState) => ({ ...prevState, effect_pf: checked }))
              }
            />
            &nbsp;&nbsp;&nbsp;
            <CheckBox
              label="ESI"
              id="csi"
              name="effect_csi"
              value={formData.effect_csi}
              onToggle={(checked) =>
                setFormData((prevState) => ({ ...prevState, effect_csi: checked }))
              }
            />
          </div>
          <div className="col-md-4 col-lg-1 col-xl-1" style={{ marginTop: '20px' }}>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </div>
        {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
        {earningSuccess ? <DismissableAlert
          variant='success'
          title="success"
          msg="Save completed succesfully" />
          : null}
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
        onView={() => alert("Will implement soon")}
      />
      <UpdateModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={selected}
        types={earningTypes}
      />
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Are you sure?"
        message="This action cannot be undone"
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EarningMaster;