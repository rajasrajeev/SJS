import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/dashboard/PageTitle';
import BackendTable from '../../../components/table/BackendTable';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import MasterEarningModal from './MasterEarningModal';
import {
  deleteEarning,
  fetchEarnings,
} from '../../../features/earningSlice';

const MasterEarnings = () => {
  const dispatch = useDispatch();
  const { earnings, loading } = useSelector((store) => store.earning || {});

  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEarnings());
  }, [dispatch]);

  const filteredData = Array.isArray(earnings)
    ? earnings.filter((e) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
          String(e.name || '').toLowerCase().includes(s) ||
          String(e.code || '').toLowerCase().includes(s) ||
          String(e.acc_code || '').toLowerCase().includes(s) ||
          String(e.type || '').toLowerCase().includes(s)
        );
      })
    : [];

  const columns = [
    {
      name: 'SlNo',
      selector: (row, index) => index + 1,
      width: '100px',
    },
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Code', selector: (row) => row.code, sortable: true },
    { name: 'Account Code', selector: (row) => row.acc_code, sortable: true },
    { name: 'Type', selector: (row) => row.type, sortable: true },
    {
      name: 'Effect PF',
      selector: (row) => row.effect_pf ? 'Yes' : 'No',
      sortable: true,
    },
    {
      name: 'Effect CSI',
      selector: (row) => row.effect_csi ? 'Yes' : 'No',
      sortable: true,
    },
  ];

  const handleDelete = (row) => {
    setSelectedItem(row.id);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteEarning(selectedItem));
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="mt-4">
        <PageTitle title="Master Earning" iname="bx bx-cog" />

        <BackendTable
          columns={columns}
          data={filteredData}
          onEdit={() => {}}
          onDelete={handleDelete}
          showActions={true}
          loading={loading}
          handleSearch={(e) => setSearch(e.target.value)}
          search={search}
          addButton={{
            show: true,
            text: 'add',
            onClick: () => setIsModalOpen(true),
          }}
          filters={() => null}
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

