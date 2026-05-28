import React, { useState, useEffect } from "react";
import CustomTable from '../../../components/table/CustomTable';
import { useNavigate } from 'react-router-dom';
import PageTitle from "../../../components/dashboard/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { clearBranch, deleteBranch, fetchBranches, updateBranch } from "../../../features/branchSlice";
import ConfirmationDialog from "../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog";
import DismissableAlert from "../../../components/dashboard/miscellaneous/DismissableAlert";


const BranchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentBranch, setCurrentBranch] = useState(null);
  const { loading, error, success, branches } = useSelector((store) => store.branch);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchBranches());

    return () => {
      dispatch(clearBranch());
    }
  }, []);

  useEffect(() => {
    setFilteredData(
      branches.filter(
        (item) =>
          item.name?.toLowerCase().includes(search) ||
          item.address?.toLowerCase().includes(search) ||
          item.contact_no?.toLowerCase().includes(search.toLowerCase()) ||
          item.email_id?.toString().includes(search)
      )
    );
  }, [search, branches]);
  
  
    const handleSearch = (e) => {
      setSearch(e.target.value);
    };
  

  const columns = [
    { name: 'SlNo', selector: (row, index) => index + 1, sortable: true, width: '100px', },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Address", selector: row => row.address, sortable: true },
    { name: "Contact Number", selector: row => row.contact_no, sortable: true },
    { name: "Email", selector: row => row.email_id, sortable: true },
  ];

  const handleEdit = (branch) => {
    setCurrentBranch(branch);
    navigate(`/firm-dashboard/edit-branch/${branch.id}`, { state: { branch } });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteBranch(currentBranch.id));
    setIsDialogOpen(false); 
    setCurrentBranch(null);
  }
  
  const handleCancel = () => {
    setIsDialogOpen(false);
    setCurrentBranch(null);
  }
  
  const handleDelete = (branch) => {
    setCurrentBranch(branch);
    setIsDialogOpen(true); 
  }
  
  return (
    <>
    <div className="mt-4 ">
      <PageTitle
        title="Branch Management"
        iname="bx bx-cog"
      />
       {error ? <DismissableAlert variant="danger" title="Error" msg={error ? error.message : "Something went wrong"}/> : null}
       {success ? <DismissableAlert 
        variant='success' 
        title="success" 
        msg="Branch updated succesfully"/>
           : null}

      <CustomTable
        columns={columns}
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
        showSearchBar={true}
        loading={loading}
        addButton={{
          show: true,
          text: 'Branch',
          onClick: () => navigate('/firm-dashboard/add-branch'),
        }}
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
    </>
  );
};

export default BranchList;
