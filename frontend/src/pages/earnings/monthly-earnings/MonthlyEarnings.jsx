import React, { useState, useEffect } from 'react';
import BackendTable from '../../../components/table/BackendTable';
import PageTitle from '../../../components/dashboard/PageTitle';
import MonthlyEarningsModal from './MonthlyEarningsModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyEarnings } from '../../../features/earningsMonthlySlice';


const MonthlyEarnings = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { earnings } = useSelector((store) => store.earning || {});
    const earningOptions = (earnings || []).map((e) => ({
                                id: e.id,
                                name: e.name
                            }));

    const columns = [
        { name: 'Department', selector: row => row.department, sortable: true },
        { name: 'Employee Code', selector: row => row.employeeCode, sortable: true },
        { name: 'Employee Name', selector: row => row.employeeName, sortable: true },
        { name: 'Earning Name', selector: row => row.earningName, sortable: true },
        { name: 'Earning Amount', selector: row => row.earningAmount, sortable: true },
    ];

    const dispatch = useDispatch();
    const { monthlyEarnings } = useSelector((store) => store.earningsMonthly || {});


    useEffect(() => {
        dispatch(
            fetchMonthlyEarnings({
                page,
                perPage,
                search,
            })
        );
    }, [dispatch, page, perPage, search]);

    useEffect(() => {
        // Build table rows from monthly processed data
        const rows = (monthlyEarnings?.data || []).map((m) => ({
            id: m.id,
            department: m.department?.name,
            employeeCode: m.employees?.[0]?.employee?.emp_id,
            employeeName: m.employees?.[0]?.employee?.name,
            earningName: m.earning?.name,
            earningAmount: m.employees?.[0]?.earning_amt,
        }));
        setData(rows);
        setFilteredData(rows);
        setTotal(monthlyEarnings?.meta?.total || 0);
    }, [monthlyEarnings]);


    const handleSearch = () => {
        if (search) {
            const filtered = data.filter(item =>
                item.department.toLowerCase().includes(search.toLowerCase()) ||
                item.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
                item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
                item.earningName.toLowerCase().includes(search.toLowerCase()) ||
                item.earningAmount.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(filtered);
            setTotal(filtered.length);
        } else {
            setFilteredData(data);
            setTotal(data.length);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handlePerRowsChange = (newPerPage) => {
        setPerPage(newPerPage);
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (row) => {
        setSelectedItem(row);
        setIsModalOpen(true);
    };

    const handleDelete = (row) => {
        // Handle delete logic here
    };

    return (
        <div className="mt-4">
            <PageTitle title="Monthly Earnings" iname="bi bi-table" />
            <BackendTable
                columns={columns}
                data={filteredData}
                loading={loading}
                total={total}
                search={search}
                handleSearch={handleSearchInputChange}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
                addButton={{
                    show: true,
                    text: "Add",
                    onClick: handleAdd,
                }}
            />
            <MonthlyEarningsModal
                show={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                data={selectedItem}
            />
        </div>
    );
};

export default MonthlyEarnings;