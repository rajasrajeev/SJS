import React, { useEffect, useState } from "react";
import CustomDropdown from "../../../components/form/CustomDropdown ";
import TextInput from "../../../components/form/TextInput";
import CustomTable from "../../../components/table/CustomTable";
import PageTitle from "../../../components/dashboard/PageTitle";


const PromotionWages = () => {
    const [empId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const [designation, setDesignation] = useState("");
    const [daysWorked, setDaysWorked] = useState("");
    const [ratePerDay, setRatePerDay] = useState("");
    const [amount, setAmount] = useState("");
    const [promotionWagesData, setPromotionWagesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');

    const employeeOptions = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
        // Add more employee options here
    ];

    const designationOptions = [
        { id: "salesman", name: "Salesman" },
        { id: "sales_executive", name: "Sales Executive" },
        // Add more designation options here
    ];

    useEffect(() => {
        setFilteredData(
            promotionWagesData.filter(
                (item) =>
                    item.empId?.toString().includes(search) ||
                    item.empName?.toLowerCase().includes(search) ||
                    item.designation?.toLowerCase().includes(search) ||
                    item.daysWorked?.toString().includes(search.toLowerCase()) ||
                    item.ratePerDay?.toString().includes(search.toLowerCase()) ||
                    item.amount?.toString().includes(search.toLowerCase())

            )
        );
    }, [search, promotionWagesData]);

    const handleEmpIdChange = (e) => {
        const selectedEmpId = e.target.value;
        setEmpId(selectedEmpId);
        const selectedEmp = employeeOptions.find((emp) => emp.id === selectedEmpId);
        setEmpName(selectedEmp ? selectedEmp.name : "");
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleDesignationChange = (e) => {
        setDesignation(e.target.value);
    };

    const handleDaysWorkedChange = (e) => {
        setDaysWorked(e.target.value);
        calculateAmount(e.target.value, ratePerDay);
    };

    const handleRatePerDayChange = (e) => {
        setRatePerDay(e.target.value);
        calculateAmount(daysWorked, e.target.value);
    };

    const calculateAmount = (days, rate) => {
        const calculatedAmount = days && rate ? days * rate : 0;
        setAmount(calculatedAmount);
    };

    const handleSubmit = () => {
        const newEntry = {
            empId,
            empName,
            designation,
            daysWorked,
            ratePerDay,
            amount,
        };
        setPromotionWagesData([...promotionWagesData, newEntry]);
        // Clear form fields
        setEmpId("");
        setEmpName("");
        setDesignation("");
        setDaysWorked("");
        setRatePerDay("");
        setAmount("");
    };
    const handleEdit = (row) => {

        console.log(row);


    }

    const handleDelete = (row) => {


    }
    const columns = [
        { name: 'Sl No', selector: (row, index) => index + 1, width: '100px' },
        { name: "Employee ID", selector: (row) => row.empId, sortable: true },
        { name: "Employee Name", selector: (row) => row.empName, sortable: true },
        { name: "Designation", selector: (row) => row.designation, sortable: true },
        { name: "Days Worked", selector: (row) => row.daysWorked, sortable: true },
        { name: "Rate Per Day", selector: (row) => row.ratePerDay, sortable: true },
        { name: "Amount", selector: (row) => row.amount, sortable: true },
    ];

    return (
        <div className="promotion-wages">
            <PageTitle title="Promotion Wages" iname="bi bi-graph-up" />
            <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-4 col-lg-3 col-xl-2">
                    <CustomDropdown
                        label="Employee ID"
                        name="empId"
                        options={employeeOptions}
                        value={empId}
                        onChange={handleEmpIdChange}
                        required
                    />
                </div>
                <div className="col-md-6 col-lg-3">
                    <TextInput
                        label="Employee Name"
                        name="empName"
                        value={empName}
                        onChange={() => { }}
                        disabled
                    />
                </div>
                <div className="col-md-4 col-lg-3 col-xl-2">
                    <CustomDropdown
                        label="Current Designation"
                        name="designation"
                        options={designationOptions}
                        value={designation}
                        onChange={handleDesignationChange}
                        required
                    />
                </div>
                <div className="col-md-4 col-lg-3 col-xl-2">
                    <CustomDropdown
                        label="Designation Worked On"
                        name="designation"
                        options={designationOptions}
                        value={designation}
                        onChange={handleDesignationChange}
                        required
                    />
                </div>
                <div className="col-md-4 col-lg-3 col-xl-2">
                    <TextInput
                        label="Days Worked"
                        name="daysWorked"
                        type="number"
                        value={daysWorked}
                        onChange={handleDaysWorkedChange}
                        required
                    />
                </div>
                {/* <div className="col-md-4 col-lg-3 col-xl-2">
                    <TextInput
                        label="Rate Per Day"
                        name="ratePerDay"
                        type="number"
                        value={ratePerDay}
                        onChange={handleRatePerDayChange}
                        required
                    />
                </div> */}
                <div className="col-md-4 col-lg-3 col-xl-2">
                    <TextInput
                        label="Amount"
                        name="amount"
                        type="number"
                        value={amount}
                        onChange={() => { }}
                        disabled
                    />
                </div>
                <div className="col-md-4 col-lg-3 col-xl-2" style={{ marginTop: '20px' }}>
                    <button type="submit"  className="submit-button">Submit</button>
                </div>
            </div>
            </form>

            <CustomTable
                columns={columns}
                data={filteredData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
                showSearchBar={true}
                addButton={{ show: false }}
                handleSearch={handleSearch}
                onView={() => alert("Will implement soon")}
            />
        </div>
    );
};

export default PromotionWages;