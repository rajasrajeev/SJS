import React, { useEffect, useState } from 'react';
import BackendTable from '../../components/table/BackendTable';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStaff, fetchStaffList } from '../../features/staffSliceLocal';
import ConfirmationDialog from '../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';


const StaffListView = () => {
  const dispatch = useDispatch();
  const { staffList, loading } = useSelector((store) => store.staffLocal);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    dispatch(fetchStaffList({
      page: page,
      perPage: perPage
    }));
  }, []);

  const handleEdit = row => {
    navigate('/firm-dashboard/add-staff', { state: { selectedId: row.id } });
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
    dispatch(deleteStaff(selectedItem));
    setIsDialogOpen(false); 
    setSelectedItem(null);
  };

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
    dispatch(fetchStaffList({
      page: 1,
      perPage: perPage,
      search: e.target.value
    }));
  }

  const handlePageChange = newPage => {
    setPage(newPage);
    dispatch(fetchStaffList({
      page: newPage,
      perPage: perPage,
      search: search
    }));
  }

  const handlePerRowsChange = async (newPerPage, newPage) => {
    setPage(newPage);
    setPerPage(newPerPage)
    dispatch(fetchStaffList({
      page: newPage,
      perPage: newPerPage,
      search: search
    }));
  }

  const columns = [
    {
      name: 'SlNo',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.user.email,
      sortable: true
    },
    {
      name: 'Mobile',
      selector: row => row.mobile,
      sortable: true
    },
    {
      name: 'Branch',
      selector: row => row.branches.map(branch => `${branch.name} - ${branch.address}`).join(', '),
      sortable: true, width: '30%'
    },
  ];

  return (
    <>
    <div className="mt-4">
      <PageTitle
        title="Staff List"
        iname="bx bx-group"
      />

      <BackendTable
        columns={columns}
        data={staffList.data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
        loading={loading}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        handleSearch={handleSearch}
        search={search}
        total={staffList?.meta && staffList?.meta.total}
        addButton={{
          show: true,
          text: 'Add Staff',
          onClick: () => navigate('/firm-dashboard/add-staff'),
        }}
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

export default StaffListView;
