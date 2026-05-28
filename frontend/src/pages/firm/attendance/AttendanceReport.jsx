import React, { useState, useEffect } from 'react';
import BackendTable from '../../../components/table/BackendTable';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'; 
import CustomDropdown from '../../../components/form/CustomDropdown ';
import PageTitle from '../../../components/dashboard/PageTitle';

const AttendanceReport = () => {
    const months = [
        { id: "January", name: "January", days: 31 },
        { id: "February", name: "February", days: 28 },
        { id: "March", name: "March", days: 31 },
        { id: "April", name: "April", days: 30 },
        { id: "May", name: "May", days: 31 },
        { id: "June", name: "June", days: 30 },
        { id: "July", name: "July", days: 31 },
        { id: "August", name: "August", days: 31 },
        { id: "September", name: "September", days: 30 },
        { id: "October", name: "October", days: 31 },
        { id: "November", name: "November", days: 30 },
        { id: "December", name: "December", days: 31 },
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const [month, setMonth] = useState('January');
    const [daysInMonth, setDaysInMonth] = useState(31);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const selectedMonth = months.find(m => m.id === month);
        let days = selectedMonth.days;
        if (month === "February" && isLeapYear(currentYear)) {
            days = 29;
        }
        setDaysInMonth(days);
        generateSampleData(days);
    }, [month, currentYear]);

    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    const generateSampleData = (days) => {
        const sampleData = Array.from({ length: 10 }, (_, i) => ({
            name: `Employee ${i + 1}`,
            adharNumber: `1234-5678-90${i}`,
            fathersHusbandName: `Parent ${i + 1}`,
            sex: i % 2 === 0 ? 'Male' : 'Female',
            natureOfWork: 'Work Type',
            dateOfEntry: `2020-01-${(i + 1).toString().padStart(2, '0')}`,
            days: Array.from({ length: days }, () => {
                const status = ['P', 'A', 'W', 'CL', 'EL', 'HOL', 'H'];
                return status[Math.floor(Math.random() * status.length)];
            })
        }));
        setData(sampleData);
        setTotal(sampleData.length);
    };

    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        // { name: 'Adhar Number', selector: row => row.adharNumber, sortable: true },
        { name: 'Fathers/Husband Name', selector: row => row.fathersHusbandName, sortable: true },
        { name: 'Sex', selector: row => row.sex, sortable: true },
        { name: 'Nature of Work', selector: row => row.natureOfWork, sortable: true },
        { name: 'Date of Entry into Service', selector: row => row.dateOfEntry, sortable: true },
        ...Array.from({ length: daysInMonth }, (_, i) => ({
            name: `${i + 1}`,
            selector: row => row.days[i],
            sortable: false,
            width: '60px',
            center: true,
        })),
    ];

    const handleSearch = (e) => {
        setSearch(e.target.value);
        // Implement search functionality here
    };

    const handlePageChange = (page) => {
        // Implement page change functionality here
    };

    const handlePerRowsChange = (newPerPage, page) => {
        // Implement rows per page change functionality here
    };

    const onEdit = (row) => {
        // Implement edit functionality here
    };

    const onDelete = (row) => {
        // Implement delete functionality here
    };

    const onMonthChange = (e) => {
        setMonth(e.target.value);
        // Implement month change functionality here
    };

    const printPDF = () => {
        // Dynamically use A3 if there are many columns, else A4
        const format = daysInMonth > 25 ? 'a3' : 'a4';
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format });
    
        const tableColumn = [
            "Name",
            // "Adhar Number",
            "Fathers/Husband Name",
            "Sex",
            "Nature of Work",
            "Date of Entry into Service",
            ...Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`)
        ];
    
        const tableRows = data.map(emp => [
            emp.name,
            // emp.adharNumber,
            emp.fathersHusbandName,
            emp.sex,
            emp.natureOfWork,
            emp.dateOfEntry,
            ...emp.days
        ]);
    
        doc.setFontSize(14);
        doc.text(`Attendance Report - ${month} ${currentYear}`, 14, 15);
    
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            //startY: (doc.internal.pageSize.getHeight() - 20) / 2, // Center vertically
            styles: {
                fontSize: 7,
                overflow: 'linebreak',
                cellPadding: 0.5,
            },
            headStyles: {
                fillColor: [220, 220, 220],
                fontSize: 8,
            },
            columnStyles: {
                0: { cellWidth: 30 },//Name
               // 1: { cellWidth: 25 },//Adhar
                1: { cellWidth: 40 },//Father/ Husband Name
                2: { cellWidth: 15 },//gender
                3: { cellWidth: 40 },//Nature of Work
                4: { cellWidth: 20 },//Date of Entry
                ...Array.from({ length: daysInMonth }, (_, i) => ({
                    [5 + i]: { cellWidth: 7 } // Reduced for better fitting
                })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
            },
            margin: { top: 20, left: 30, right: 10, bottom: 20 },
            //tableWidth: 'auto',
            tableWidth: 'wrap', // Ensures the table is centered horizontally
            didDrawPage: (data) => {
                // Footer with page number
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(8);
                doc.text(`Page ${data.pageNumber} of ${pageCount}`, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 10);
            }
        });
    
        doc.save(`attendance_report_${month}_${currentYear}.pdf`);
    };
    
    
    

    return (
        <div className="mt-4">
         <PageTitle title="Muster Roll" iname="bi bi-table" />
            <BackendTable
                columns={columns}
                data={data}
                //onEdit={onEdit}
               // onDelete={onDelete}
                handleSearch={handleSearch}
                loading={loading}
                total={total}
                search={search}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
                showActions={false}
                addButton={{ show: false }}
                searchDropdowns={false}
                month={month}
                onMonthChange={onMonthChange}
                months={months}
                showMonthDropdown={true}
                currentYear={currentYear}
                importExcel={null}
                exportExcel={null}
                print={null}
                filters={null}
            />
             <button type="submit" className="submit-button" onClick={printPDF}>Print as PDF</button>
        </div>
    );
};

export default AttendanceReport;