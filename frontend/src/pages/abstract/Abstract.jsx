import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/dashboard/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import BackendTable from '../../components/table/BackendTable';
import { deleteDeduction, fetchMasterDeductions } from '../../features/deductionMasterSlice';
import ConfirmationDialog from '../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import CustomDropdown from '../../components/form/CustomDropdown ';
import { fetchDeductions } from '../../features/deductionSlice';
import DatePicker from '../../components/form/DatePicker';


const Abstract = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deductionsMain, loading, error, deductionSuccess } = useSelector((store) => store.deductionMain);
    const { deductions } = useSelector((store) => store.deduction);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const columns = [
        {name: 'SlNo', selector: (row, index) => index + 1, width: '100px',},
        { name: 'Earning Name', selector: row => row.department.code, sortable: true },
        { name: 'Acc Code', selector: row => row.emp_id, sortable: true },
        { name: 'Amount', selector: row => row.name, sortable: true },
        { name: '', 
            width: "5px",
            cell: (row) => (
                <div style={{borderLeft: "1px solid #ddd", height: "30px"}}></div>
            ) 
        }, // Separator for seperate two section according to old app
        { name: 'Deduction Name', selector: row => row.deduction_amount, sortable: true },
        { name: 'Acc Code', selector: row => row.installment, sortable: true },
        { name: 'Amount', selector: row => row.balance, sortable: true },
    ];


    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState({
      unwanted: false,
      unrecover: false,
      deduction: false
    });

    useEffect(() => {
      // For Drop down , fetching from firm masters
      dispatch(fetchMasterDeductions());

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
        <DatePicker
            name="effective_date"
            value=""
            onChange={(e) => console.log(e)}
        />
      </div>
      <div className="filter-box-item">
        <p style={{marginTop: "3px"}}>To</p>
      </div>
      <div className="filter-box-item">
        <DatePicker
            name="effective_date"
            value=""
            onChange={(e) => console.log(e)}
        />
      </div>
    </>)
  }

    return (
      <>
        <div className='mt-4'>
            <PageTitle
                title={selectedMonth ? `Abstract for ${selectedMonth}` : "Abstract"}
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
                exportExcel={{
                  show: true,
                  onClick: () => navigate('/firm-dashboard/employee-master'),
                }}
                print={{
                  show: true,
                  onClick: () => navigate('/firm-dashboard/employee-master'),
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
      </>
    );
};

export default Abstract;