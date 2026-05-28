import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import BackendTable from '../../../components/table/BackendTable';
import { deleteDeduction, fetchMasterDeductions } from '../../../features/deductionMasterSlice';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import CustomDropdown from '../../../components/form/CustomDropdown ';
import { fetchDeductions } from '../../../features/deductionSlice';
import MasterEarningModal from './MasterEarningModal';


const MasterEarnings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deductionsMain, loading, error, deductionSuccess } = useSelector((store) => store.deductionMain);
    const { deductions } = useSelector((store) => store.deduction);

    const columns = [
        {name: 'SlNo', selector: (row, index) => index + 1, width: '100px',},
        { name: 'Dept Code', selector: row => row.department.code, sortable: true },
        { name: 'Emp Id', selector: row => row.emp_id, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Ded Name', selector: row => row.department.name, sortable: true },
        { name: 'Preference No', selector: row => row.pref_no, sortable: true },
        { name: 'Deduction Amount', selector: row => row.deduction_amount, sortable: true },
        { name: 'Installment', selector: row => row.installment, sortable: true },
        { name: 'Balance', selector: row => row.balance, sortable: true },
        { name: 'unrec amount', selector: row => row.unrec_amount, sortable: true },
        { name: 'unrec amount int%', selector: row => row.unrec_amount_int, sortable: true },
        { name: 'interest', selector: row => row.interest, sortable: true },
        { 
          name: "Active", 
          selector: (row) => row.active, 
          cell: (row) => (row.active ?
             <i class="bi bi-check-circle-fill" style={{color: "green"}}></i> : 
             <i class="bi bi-x-circle-fill" style={{color: "red"}}></i>) },

    ];


    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      // For Drop down , fetching from firm masters
      dispatch(fetchDeductions());

      // for table 
      dispatch(fetchMasterDeductions({
        page: page,
        perPage: perPage
      }));
    }, []);

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
    dispatch(deleteDeduction(selectedItem));
    setIsDialogOpen(false); 
    setSelectedItem(null);
  };

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
    dispatch(fetchMasterDeductions({
      page: 1,
      perPage: perPage,
      search: e.target.value
    }));
  };

  const handlePageChange = newPage => {
    setPage(newPage);
    dispatch(fetchMasterDeductions({
      page: newPage,
      perPage: perPage,
      search: search
    }));
  }

  const handlePerRowsChange = async (newPerPage, newPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
    dispatch(fetchMasterDeductions({
      page: newPage,
      perPage: newPerPage,
      search: search
    }));
  };

  const filters = () => {
    return (<>
      <div className="filter-box-item">
        <CustomDropdown
          label=""
          label2="Employee Code"
          name="deduction"
          options={deductions}
          onChange={handleCancel}
        />
      </div>
    </>)
  }

    return (
      <>
        <div className='mt-4'>
            <PageTitle
                title="Master Earning"
                iname="bx bx-cog"
            />

            <BackendTable
                columns={columns}
                data={deductionsMain.data}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
                loading={loading}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
                handleSearch={handleSearch}
                search={search}
                total={deductionsMain?.meta && deductionsMain?.meta.total}
                addButton={{
                  show: true,
                  text: "add",
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