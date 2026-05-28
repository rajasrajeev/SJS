import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import BackendTable from '../../../components/table/BackendTable';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import { deleteShopDa, fetchDaConstants, fetchDaPoints, fetchShopDa, fetchFabDa, fetchIDa } from '../../../features/daSlice';
import { fetchBranches } from '../../../features/branchSlice';
import ShopDaModal from './ShopDaModal';
import FabDaModal from './FabDaModal';
import IDaModal from './IDaModal';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import CustomRadioButtonGroup from '../../../components/form/CustomRadioButton';


const Da = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { daPoints, shopDaMaster, fabDaMaster, shopDas, fabDas, iDas, loading, error, daSuccess } = useSelector((store) => store.da);
  const { branches } = useSelector((store) => store.branch);

  const columns = [
    { name: 'SlNo', selector: (row, index) => index + 1, width: '100px', },
    { name: 'Salary Month', selector: row => row.salary_month, sortable: true },
    { name: 'Effective Date', selector: row => row.effective_date, sortable: true },
    { name: 'DA RS', selector: row => row.da_rs, sortable: true },
  ];

  const [selectedType, setSelectedType] = useState("SHOP"); // Default to "SHOP"
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFab, setIsModalOpenFab] = useState(false);
  const [isModalOpenIda, setIsModalOpenIda] = useState(false);


  // useEffect(() => {
  //   dispatch(fetchBranches());
  //   dispatch(fetchDaPoints());
  //   dispatch(fetchDaConstants());

  //   dispatch(fetchShopDa({
  //     page: page,
  //     perPage: perPage
  //   }));
  // }, []);

  useEffect(() => {
    if (selectedType === "SHOP") {
      dispatch(fetchShopDa());
    } else if (selectedType === "FAB") {
      dispatch(fetchFabDa());
    } else if (selectedType === "IDA") {
      // Dispatch the action to fetch IDA data (if available)
      dispatch(fetchIDa());
    }
  }, [selectedType, dispatch]);

  // useEffect(() => {
  //   // Set default da_type in local storage on component mount
  //   localStorage.setItem("da_type", "SHOP");
  // }, []);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    //  localStorage.setItem("da_type", type); // Update da_type in local storage
  };

  const handleEdit = (row) => {
    // Need a modal
  };

  const handleDelete = row => {
    setIsDialogOpen(true);
    setSelectedItem(row.id);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteShopDa(selectedItem));
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
    dispatch(fetchShopDa({
      page: 1,
      perPage: perPage,
      search: e.target.value
    }));
  };

  const handlePageChange = newPage => {
    setPage(newPage);
    dispatch(fetchShopDa({
      page: newPage,
      perPage: perPage,
      search: search
    }));
  }

  const handlePerRowsChange = async (newPerPage, newPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
    dispatch(fetchShopDa({
      page: newPage,
      perPage: newPerPage,
      search: search
    }));
  };

  const handleAddModal = () => {
    // const storedDaType = localStorage.getItem("da_type")?.trim().replace(/\u200B/g, "").toUpperCase();// For local storage
    const storedDaType = selectedType.trim().replace(/\u200B/g, "").toUpperCase();//to use selectedType directly
    console.log("Fetched DA Type:", storedDaType);

    if (storedDaType.includes("SHOP")) {
      console.log("✅ Using includes(), SHOP detected");
      setIsModalOpen(true);
    } else if (storedDaType.includes("FAB")) {
      console.log("✅ Using includes(), FAB detected");
      setIsModalOpenFab(true);
    } else {
      console.log("🚨 No match using includes()");
      setIsModalOpenIda(true);
    }

  };


  const filters = () => {
    return (<>
      <div className="filter-box-item">
        <CustomDropdown
          label=""
          label2="Branch"
          name="month"
          options={[]}
          value="{month}"
          onChange={handleCancel}
        />

      </div>
    </>)
  }



  return (
    <>
      <div className='mt-4 '>
        <div className='d-flex justify-content-between'>
          <PageTitle
            title="DA"
            iname="bx bx-cog"
          />
          {/* Custom Radio Button Group */}
          <CustomRadioButtonGroup
            label="Select DA Type"
            name="daType"
            options={[
              { value: "SHOP", label: "Shop" },
              { value: "FAB", label: "Fab" },
              { value: "IDA", label: "IDA" },
            ]}
            value={selectedType}
            onChange={handleTypeChange}
          />
        </div>

        <BackendTable
          columns={columns}
          data={
            selectedType === "SHOP"
              ? Array.isArray(shopDas) ? shopDas : []
              : selectedType === "FAB"
                ? Array.isArray(fabDas) ? fabDas : []
                : Array.isArray(iDas) ? iDas : []
          }
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
          loading={loading}
          handlePageChange={handlePageChange}
          handlePerRowsChange={handlePerRowsChange}
          handleSearch={handleSearch}
          search={search}
          total={fabDas?.meta && fabDas?.meta.total}
          importExcel={{
            show: true,
            //onClick: () => setIsModalOpen(true),
            // onClick: () => navigate('/firm-dashboard/employee-master'),
          }}
          exportExcel={{
            show: true,
            //onClick: () => setIsModalOpenFab(true),
            // onClick: () => navigate('/firm-dashboard/employee-master'),
          }}
          print={{
            show: true,
            //onClick: () => setIsModalOpenIda(true),
            // onClick: () => navigate('/firm-dashboard/employee-master'),
          }}
          addButton={{
            show: true,
            text: "Add DA",
            // onClick: () => setIsModalOpen(true),
            onClick: handleAddModal,
          }}
          filters={filters}
        />
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Are you sure?"
        message="This action cannot be undone"
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
      />
      <ShopDaModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={selectedItem}
      />
      <FabDaModal
        show={isModalOpenFab}
        handleClose={() => setIsModalOpenFab(false)}
        data={selectedItem}
      />
      <IDaModal
        show={isModalOpenIda}
        handleClose={() => setIsModalOpenIda(false)}
        data={selectedItem}
      />
    </>
  );
};

export default Da;
