import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import BackendTable from '../../components/table/BackendTable';
import { fetchAdvanceDeductions, deleteAdvanceDeduction } from '../../features/advanceDeductionSlice';
import ConfirmationDialog from '../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import CustomDropdown from '../../components/form/CustomDropdown ';
import { fetchMasterDeductions } from '../../features/deductionMasterSlice';
import AdvanceDeductionModal from './AdvanceDeductionModal';


const AdvanceDeduction = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: deductionMain, loading, error, success: deductionSuccess } = useSelector((store) => store.advanceDeduction);
    const { deduction: deductions } = useSelector((store) => store.deduction);

    const columns = [
      {name: 'SlNo', selector: (row, index) => index + 1, width: '100px',},
      { name: 'Dept', selector: row => row.dept, sortable: true },
      { name: 'Emp Id', selector: row => row.emp_id, sortable: true },
      { name: 'Name', selector: row => row.name, sortable: true },
      { name: 'Ded Name', selector: row => row.department.name, sortable: true },
      { name: 'Preference No', selector: row => row.pref_no, sortable: true },
      { name: 'Deduction Amount', selector: row => row.deduction_amount, sortable: true },
    ];


    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      // For Drop down , fetching from firm masters
      dispatch(fetchMasterDeductions());

      // for table 
      dispatch(fetchAdvanceDeductions({
        page: page,
        perPage: perPage
      }));
    }, [dispatch, page, perPage]);

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
    dispatch(deleteAdvanceDeduction(selectedItem));
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

  const [selectedDeductionFilter, setSelectedDeductionFilter] = useState(null);
  const [selectedBranchFilter, setSelectedBranchFilter] = useState(null);
  const [unwantedFilter, setUnwantedFilter] = useState(false);
  const [unrecoverFilter, setUnrecoverFilter] = useState(false);

  const filters = () => (
    <>
      <div className="form-check filter-box-item">
        <input
          className="form-check-input"
          type="checkbox"
          checked={unwantedFilter}
          onChange={(e) => setUnwantedFilter(e.target.checked)}
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Unwanted
        </label>
      </div>
      <div className="form-check filter-box-item">
        <input
          className="form-check-input"
          type="checkbox"
          checked={unrecoverFilter}
          onChange={(e) => setUnrecoverFilter(e.target.checked)}
          id="flexCheckDefault2"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault2">
          Unrecover
        </label>
      </div>
      <div className="filter-box-item">
        <CustomDropdown
          label=""
          label2="Deduction"
          name="deduction"
          options={deductions}
          value={selectedDeductionFilter}
          onChange={(e) => {
            const selected = deductions.find(d => d.id === e.target.value || d.id === Number(e.target.value));
            setSelectedDeductionFilter(selected || null);
          }}
        />
      </div>
      <div className="filter-box-item">
        <CustomDropdown
          label=""
          label2="Branch"
          name="branch_id"
          options={[]} // TODO: fetch branches for dropdown
          value={selectedBranchFilter}
          onChange={(e) => {
            // TODO: update selectedBranchFilter state
          }}
        />
      </div>
    </>
  );

    return (
      <>
        <div className='mt-4'>
            <PageTitle
                title="Advance Deduction"
                iname="bx bx-cog"
            />

            <BackendTable
                columns={columns}
                data={deductionMain?.data || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
                loading={loading}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
                handleSearch={handleSearch}
                search={search}
                total={deductionMain?.meta?.total || 0}
                importExcel={{
                  show: true,
                  onClick: () => navigate('/firm-dashboard/deduction/advance-deduction'),
                }}
                exportExcel={{
                  show: true,
                  onClick: () => navigate('/firm-dashboard/deduction/advance-deduction'),
                }}
                print={{
                  show: true,
                  onClick: () => navigate('/firm-dashboard/deduction/advance-deduction'),
                }}
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
        <AdvanceDeductionModal
          show={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          data={selectedItem}
          types={[]}
        />
      </>
    );
};

export default AdvanceDeduction;