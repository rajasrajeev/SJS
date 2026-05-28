import React, { useEffect, useState } from "react";
import CustomDropdown from "../../../components/form/CustomDropdown ";
import TextInput from "../../../components/form/TextInput";
import CustomTable from "../../../components/table/CustomTable";
import PageTitle from "../../../components/dashboard/PageTitle";
import DatePicker from "../../../components/form/DatePicker";
import { datePickerFormats } from "../../../utils/dateFormat";
import jsPDF from 'jspdf';

const SalaryAdvance = () => {
    const [formData, setFormData] = useState({
        empId: "",
        empName: "",
        designation: "",
        salaryAdvance: "",
        salaryAdvanceDate: "",
        amount: ""
    });

    const [salaryAdvanceData, setSalaryAdvanceData] = useState([]);
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
            salaryAdvanceData.filter(
                (item) =>
                    item.empId?.toString().includes(search) ||
                    item.empName?.toLowerCase().includes(search) ||
                    item.designation?.toLowerCase().includes(search) ||
                    item.salaryAdvance?.toString().includes(search.toLowerCase()) ||
                    item.salaryAdvanceDate?.toString().includes(search.toLowerCase())
            )
        );
    }, [search, salaryAdvanceData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        if (name === "empId") {
            const selectedEmp = employeeOptions.find((emp) => emp.id === value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                empName: selectedEmp ? selectedEmp.name : ""
            }));
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            empId: formData.empId,
            empName: formData.empName,
            designation: formData.designation,
            salaryAdvance: formData.salaryAdvance,
            salaryAdvanceDate: formData.salaryAdvanceDate,
            amount: formData.amount
        };
        setSalaryAdvanceData([...salaryAdvanceData, newEntry]);
        // Clear form fields
        setFormData({
            empId: "",
            empName: "",
            designation: "",
            salaryAdvance: "",
            salaryAdvanceDate: "",
            amount: ""
        });
    };

    const handleEdit = (row) => {
        console.log(row);
    };

    const handleDelete = (row) => {
        // Implement delete functionality
    };

    const columns = [
        { name: 'Sl No', selector: (row, index) => index + 1, width: '100px' },
        { name: "Employee ID", selector: (row) => row.empId, sortable: true },
        { name: "Employee Name", selector: (row) => row.empName, sortable: true },
        { name: "Designation", selector: (row) => row.designation, sortable: true },
        { name: "Salary Advance Date", selector: (row) => row.salaryAdvanceDate, sortable: true },
        { name: "Salary Advance", selector: (row) => row.salaryAdvance, sortable: true },

    ];
    const onView = (row) => {
     
            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        
            // Header Section
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Company Name', 105, 15, { align: 'center' });
        
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Address Line 1, Address Line 2, City, State, ZIP', 105, 22, { align: 'center' });
            doc.text('Phone: +1 234 567 890 | Email: info@company.com', 105, 28, { align: 'center' });
        
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.line(10, 32, 200, 32); // Horizontal line
        
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('SALARY ADVANCE SLIP', 105, 40, { align: 'center' });
        
            // Extracting values from the row
            const { empId, empName, designation, salaryAdvanceDate, salaryAdvance } = row;
        
            // Employee Details Section
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Employee Details:', 14, 50);
        
            doc.setFont('helvetica', 'normal');
            doc.text(`Employee ID: ${empId}`, 14, 58);
            doc.text(`Employee Name: ${empName}`, 14, 65);
            doc.text(`Designation: ${designation}`, 14, 72);
        
            // Salary Advance Details Section
            doc.setFont('helvetica', 'bold');
            doc.text('Salary Advance Details:', 14, 85);
        
            doc.setFont('helvetica', 'normal');
            doc.text(`Salary Advance Date: ${salaryAdvanceDate}`, 14, 93);
            doc.text(`Salary Advance Amount: Rs. ${salaryAdvance}`, 14, 100);
        
            // Footer Section
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.line(10, 110, 200, 110); // Horizontal line
        
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Authorized Signature', 190, 120, { align: 'right' });
        
            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.text('This is a system-generated document and does not require a signature.', 105, 130, { align: 'center' });
        
            // Save PDF
            doc.save(`${empName}_Salary_Advance_Slip.pdf`);
        
    };
    return (
        <div className="salary-advance">
            <PageTitle title="Salary Advance" iname="bi bi-graph-up" />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <CustomDropdown
                            label="Employee ID"
                            name="empId"
                            options={employeeOptions}
                            value={formData.empId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-3">
                        <TextInput
                            label="Employee Name"
                            name="empName"
                            value={formData.empName}
                            onChange={() => { }}
                            disabled
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <CustomDropdown
                            label="Designation"
                            name="designation"
                            options={designationOptions}
                            value={formData.designation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4 col-lg-3">
                        <DatePicker
                            label="Salary Advance Date"
                            name="salaryAdvanceDate"
                            value={datePickerFormats(formData.salaryAdvanceDate)}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2">
                        <TextInput
                            label="Salary Advance"
                            name="salaryAdvance"
                            type="number"
                            value={formData.salaryAdvance}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-2 mb-4" style={{ marginTop: '20px' }}>
                        <button type="submit" className="submit-button">Submit</button>
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
                //onView={() => alert("Will implement soon")}
                onView={onView} // Pass the onView method here
            />
        </div>
    );
};

export default SalaryAdvance;