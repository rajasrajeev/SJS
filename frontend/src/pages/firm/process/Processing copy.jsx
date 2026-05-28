import React, { useState, useEffect } from 'react';
import BackendTable from '../../../components/table/BackendTable';
import PageTitle from '../../../components/dashboard/PageTitle';
import DatePicker from '../../../components/form/DatePicker';
import { datePickerFormats } from '../../../utils/dateFormat';

const Processing = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [processedData, setProcessedData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Simulate fetching data
            // const promotionWagesData = await fetchPromotionWages(startDate, endDate);
            // const overTimeWagesData = await fetchOverTimeWages(startDate, endDate);
            // const nightAllowanceData = await fetchNightAllowance(startDate, endDate);
            // const salaryAdvanceData = await fetchSalaryAdvance(startDate, endDate);

            // Sample data
            const promotionWagesData = [
                { empId: '1', empName: 'John Doe', amount: 1000 },
                { empId: '2', empName: 'Jane Smith', amount: 1200 },
            ];
            const overTimeWagesData = [
                { empId: '1', empName: 'John Doe', amount: 300 },
                { empId: '2', empName: 'Jane Smith', amount: 400 },
            ];
            const nightAllowanceData = [
                { empId: '1', empName: 'John Doe', amount: 200 },
                { empId: '2', empName: 'Jane Smith', amount: 250 },
            ];
            const salaryAdvanceData = [
                { empId: '1', empName: 'John Doe', amount: 500 },
                { empId: '2', empName: 'Jane Smith', amount: 600 },
            ];
            const monthlySalaryData = [
                { empId: '1', empName: 'John Doe', amount: 3000 },
                { empId: '2', empName: 'Jane Smith', amount: 3500 },
            ];

            // Process data
            const combinedData = processEmployeeData(promotionWagesData, overTimeWagesData, nightAllowanceData, salaryAdvanceData, monthlySalaryData);

            setProcessedData(combinedData);
            setLoading(false);
        };

        fetchData();
    }, [startDate, endDate]);

    const processEmployeeData = (promotionWages, overTimeWages, nightAllowance, salaryAdvance, monthlySalary) => {
        const employeeData = {};

        // Combine and process data
        promotionWages.forEach(item => {
            if (!employeeData[item.empId]) {
                employeeData[item.empId] = { empId: item.empId, empName: item.empName, totalSalary: 0, promotionWages: 0, overTimeWages: 0, nightAllowance: 0, salaryAdvance: 0, monthlySalary: 0 };
            }
            employeeData[item.empId].promotionWages += item.amount;
        });

        overTimeWages.forEach(item => {
            if (!employeeData[item.empId]) {
                employeeData[item.empId] = { empId: item.empId, empName: item.empName, totalSalary: 0, promotionWages: 0, overTimeWages: 0, nightAllowance: 0, salaryAdvance: 0, monthlySalary: 0 };
            }
            employeeData[item.empId].overTimeWages += item.amount;
        });

        nightAllowance.forEach(item => {
            if (!employeeData[item.empId]) {
                employeeData[item.empId] = { empId: item.empId, empName: item.empName, totalSalary: 0, promotionWages: 0, overTimeWages: 0, nightAllowance: 0, salaryAdvance: 0, monthlySalary: 0 };
            }
            employeeData[item.empId].nightAllowance += item.amount;
        });

        salaryAdvance.forEach(item => {
            if (!employeeData[item.empId]) {
                employeeData[item.empId] = { empId: item.empId, empName: item.empName, totalSalary: 0, promotionWages: 0, overTimeWages: 0, nightAllowance: 0, salaryAdvance: 0, monthlySalary: 0 };
            }
            employeeData[item.empId].salaryAdvance += item.amount;
        });

        monthlySalary.forEach(item => {
            if (!employeeData[item.empId]) {
                employeeData[item.empId] = { empId: item.empId, empName: item.empName, totalSalary: 0, promotionWages: 0, overTimeWages: 0, nightAllowance: 0, salaryAdvance: 0, monthlySalary: 0 };
            }
            employeeData[item.empId].monthlySalary = item.amount;
        });

        // Calculate total salary
        Object.values(employeeData).forEach(employee => {
            employee.totalSalary = employee.monthlySalary + employee.promotionWages + employee.overTimeWages + employee.nightAllowance - employee.salaryAdvance;
        });

        return Object.values(employeeData);
    };

    const columns = [
        { name: 'Employee ID', selector: (row) => row.empId, sortable: true },
        { name: 'Employee Name', selector: (row) => row.empName, sortable: true },
        { name: 'Monthly Salary', selector: (row) => row.monthlySalary, sortable: true },
        { name: 'Promotion Wages', selector: (row) => row.promotionWages, sortable: true },
        { name: 'OverTime Wages', selector: (row) => row.overTimeWages, sortable: true },
        { name: 'Night Allowance', selector: (row) => row.nightAllowance, sortable: true },
        { name: 'Salary Advance', selector: (row) => row.salaryAdvance, sortable: true },
        { name: 'Total Salary', selector: (row) => row.totalSalary, sortable: true },
    ];

    return (
        <div className="processing">
            <PageTitle title="Processing" iname="bi bi-graph-up" />
            <div className="row">
                <div className="col-md-3">
                    <DatePicker
                        label="Start Date"
                        name="startDate"
                        value={datePickerFormats(startDate)}
                        onChange={e => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-3">
                    <DatePicker
                        label="End Date"
                        name="endDate"
                        value={datePickerFormats(endDate)}
                        onChange={e => setEndDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <BackendTable
                columns={columns}
                data={processedData}
                loading={loading}
                total={processedData.length}
                showActions={false}
            />
        </div>
    );
};

export default Processing;