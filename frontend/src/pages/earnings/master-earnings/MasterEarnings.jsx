import React, { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import BackendTable from '../../../components/table/BackendTable';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';

import CustomDropdown from '../../../components/form/CustomDropdown ';
import MasterEarningModal from './MasterEarningModal';

import { deleteMonthlyEarningMaster, fetchMonthlyEarningMasters } from '../../../features/earningsMonthlySlice';

const MasterEarnings = () => {
  const dispatch = useDispatch();
  const { monthlyEarningMasters, loading } = useSelector((store) => store.earningsMonthly || {});

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchMonthlyEarningMasters({
        page,
        perPage,
        search,
      })
    );
  }, [dispatch, page, perPage, search]);

  const columns = useMemo(
    () => [
      { name: 'SlNo', selector: (row, index) => index + 1, width: '100px' },
      { name: 'Dept Code', selector: (row) => row.department?.code, sortable: true },
      { name: 'Emp Id', selector: (row) => row.emp_id, sortable: true },
      { name: 'Name', selector: (row) => row.name, sortable: true },
      {
        name: 'Earning Name',
        selector: (row) => row.earning?.name || row.department?.name,
        sortable: true,
      },
      { name: 'Preference No', selector: (row) => row.pref_no, sortable: true },
      { name: 'Earning Amount', selector: (row) => row.earning_amt, sortable: true },
      {
        name: 'Active',
        selector: (row) => row.active,
        cell: (row) =>
          row.active ? (
            <i className="bi bi-check-circle-fill" style={{ color: 'green' }}></i>
          ) : (
            <i className="bi bi-x-circle-fill" style={{ color: 'red' }}></i>
          ),
      },
    ],
    []
  );

  const handleDelete = (row) => {
    setIsDialogOpen(true);
    setSelectedItem(row.id);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteMonthlyEarningMaster(selectedItem));
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    // edit modal not wired for monthly masters in this page
  };

  const filters = () => (
    <div className="filter-box-item">
      <CustomDropdown label="" label2="Employee Code" name="emp_code" options={[]} onChange={() => {}} />
    </div>
  );

  return (
    <>
      <div className='mt-4'>
        <PageTitle title="Monthly Earning" iname="bx bx-cog" />

        <BackendTable
          columns={columns}
          data={monthlyEarningMasters?.data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
          loading={loading}
          handlePageChange={(newPage) => setPage(newPage)}
          handlePerRowsChange={(newPerPage, newPage) => {
            setPage(newPage);
            setPerPage(newPerPage);
          }}
          handleSearch={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          search={search}
          total={monthlyEarningMasters?.meta?.total || 0}
          addButton={{
            show: true,
            text: 'add',
            onClick: () => setIsModalOpen(true),
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

      <MasterEarningModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={selectedItem}
        types={[]}
      />
    </>
  );
};

export default MasterEarnings;

