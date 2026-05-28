import React, { useEffect, useState } from 'react'
import CustomTable from '../../../components/table/CustomTable';
import TextInput from '../../../components/form/TextInput';
import PageTitle from '../../../components/dashboard/PageTitle';
import { clearLeave, createLeave, deleteLeave, fetchLeaves } from '../../../features/leaveSlice';
import { useDispatch, useSelector } from 'react-redux';
import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import UpdateModal from './UpdateModal';
import ConfirmationDialog from '../../../components/dashboard/miscellaneous/AlertDialogs/ConfirmationDialog';
import CustomRadioButtonGroup from '../../../components/form/CustomRadioButton';
import { capitalizeWord } from '../../../utils/textFormat';


const LeaveMaster = () => {
    const dispatch = useDispatch();
    const [leaveName, setLeaveName] = useState('');
    const [leaveCode, setLeaveCode] = useState('');
    const [status, setStatus] = useState('');
    const { leaves, loading, error, leaveSuccess } = useSelector((store) => store.leave);
    const [selected, setSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const salaryStatusOptions = [
        { label: 'Paid', value: 'PAID' },
        { label: 'Unpaid', value: 'UNPAID' },
    ];

    useEffect(() => {
        dispatch(fetchLeaves());

        return () => {
            dispatch(clearLeave());
        }
    }, []);

    useEffect(() => {
        setLeaveName('');
        setLeaveCode('');
        setStatus('');
    }, [leaves]);

    useEffect(() => {
        setFilteredData(
            leaves.filter(
                (item) =>
                    item.name?.toLowerCase().includes(search) ||
                    item.code?.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, leaves]);



    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleAddLeave = (e) => {
        e.preventDefault();

        if (leaveName.trim() === '' || leaveCode.trim() === '') {
            return;
        }

        dispatch(createLeave({
            name: leaveName,
            code: leaveCode,
            status: status
        }));
    };

    const handleEditLeave = (leave) => {
        dispatch(clearLeave());
        setSelected(leave);
        setIsModalOpen(true);
    };

    const handleDeleteLeave = (leave) => {
        setSelected(leave);
        setIsDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteLeave(selected.id));
        setIsDialogOpen(false);
        setSelected(null);
    }

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSelected(null);
    }

    const columns = [
        { name: 'SlNo', selector: (row, index) => index + 1, width: '100px' },
        {
            name: 'Leave Name',
            selector: (row) => row.name,
            sortable: true,
            width: '300px',
        },
        {
            name: 'Leave Code',
            selector: (row) => row.code,
            sortable: true,
            width: '300px',
        },
        {
            name: 'Sallary Status',
            selector: (row) => capitalizeWord(row.status),
            sortable: true,
            width: '300px',
        },
    ];

    const handleSalaryStatusChange = (e) => {
        //console.log('Selected value:', e.target.value);
        setStatus(e.target.value);
    };

    return (
        <>
            <div className="add-department mt-4">
                <PageTitle
                    title="Leave Master"
                    iname="bi bi-person-dash"
                />
                <form action="">
                    <div className='row mb-4'>
                        <div className='col-md-3'>
                            <TextInput
                                label="Leave Name"
                                name="leaveName"
                                value={leaveName}
                                onChange={(e) => setLeaveName(e.target.value)}
                                required
                                type='text'
                            />
                        </div>
                        <div className='col-md-3'>
                            <TextInput
                                label="Leave Code"
                                name="leaveCode"
                                value={leaveCode}
                                onChange={(e) => setLeaveCode(e.target.value)}
                                required
                                type='text'

                            />
                        </div>
                        <div className='col-md-3' style={{width: "180px"}}>
                            <CustomRadioButtonGroup
                                label="Status"
                                name="status"
                                options={salaryStatusOptions}
                                value={status}
                                onChange={handleSalaryStatusChange}
                            />
                        </div>
                        <div className='col-md-3' style={{ marginTop: '20px' }}>
                            <button disabled={loading ? true : false} className="add-department-button" onClick={handleAddLeave}>
                                {loading ? "Loading" : "Submit"}
                            </button>
                        </div>
                    </div>
                    {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}
                    {leaveSuccess ? <DismissableAlert
                        variant='success'
                        title="success"
                        msg="Save completed succesfully" />
                        : null}
                </form>
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    onEdit={handleEditLeave}
                    onDelete={handleDeleteLeave}
                    showActions={true}
                    showSearchBar={true}
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
            <UpdateModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selected}
                salaryStatusOptions={salaryStatusOptions}
            />
        </>
    );
};

export default LeaveMaster;