import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "../../../features/leaveSlice";
import { fetchEmployees } from "../../../features/employeeSlice";
import PageTitle from "../../../components/dashboard/PageTitle";
import CustomAttendanceTable from "../../../components/table/CustomAttendanceTable";

import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../../components/form/CustomDropdown ";

const AttendanceTableFNAN = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { leaves, loading: leaveLoading } = useSelector((state) => state.leave);
    const { employees, loading: employeeLoading } = useSelector((state) => state.employee);

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

    const [presentMarkingOptions, setPresentMarkingOptions] = useState([]);
    const [presentMarking, setPresentMarking] = useState("P");
    const [selectedMonth, setSelectedMonth] = useState("January");
    const [daysInMonth, setDaysInMonth] = useState(31);
    const currentYear = new Date().getFullYear();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const dummyEmployees = [
        { tno: "001", name: "John Doe" },
        { tno: "002", name: "Jane Smith" },
        { tno: "003", name: "Alice Johnson" },
    ];

    useEffect(() => {
        // Fetch leave options from the backend
        dispatch(fetchLeaves());
    }, [dispatch]);

    useEffect(() => {
        // Set default present marking options remove when API is available
        setPresentMarkingOptions([   
            { "id": 1, "code": "P", "name": "Present" },
            { "id": 2, "code": "A", "name": "Absent" },
             { "id": 3, "code": "W", "name": "Weekly Off" },
            { "id": 4, "code": "CL", "name": "Casual Leave" },
            { "id": 5, "code": "EL", "name": "Earned Leave" },
            { "id": 6, "code": "HOL", "name": "Holiday" },
            { "id": 7, "code": "H", "name": "Half Day" }]);
        // Append "Present" and "Absent" to the fetched leave options
        if (!leaveLoading && leaves.length > 0) {
            const updatedOptions = [
                { id: 1, code: "P", name: "Present" },
                { id: 2, code: "A", name: "Absent" },
                ...leaves.map((leave) => ({
                    id: leave.id,
                    code: leave.code,
                    name: leave.name,
                })),
            ];
            setPresentMarkingOptions(updatedOptions);
        }
    }, [leaves, leaveLoading]);

    useEffect(() => {
        // Fetch employee data from the backend
        dispatch(fetchEmployees());
    }, [dispatch]);

    useEffect(() => {
        // Use fetched employees or fallback to dummy data
        const employeeData = employees?.data?.length > 0 ? employees.data : dummyEmployees;

        // Initialize attendance data with employee names and TNOs
        const initialData = generateInitialData(employeeData, daysInMonth);
        setData(initialData);
    }, [employees, daysInMonth]);

    useEffect(() => {
        setDaysInMonth(months.find((m) => m.id === selectedMonth).days);
        if (selectedMonth === "February" && isLeapYear(currentYear)) {
            setDaysInMonth(29);
        }
    }, [selectedMonth]);

    useEffect(() => {
        setFilteredData(
            data.filter(
                (item) =>
                    item.tno?.toString().includes(search) ||
                    item.name?.toLowerCase().includes(search)
            )
        );
    }, [search, data]);

    const isLeapYear = (year) =>
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    const handleMonthChange = (e) => {
        const month = e.target.value;
        let days = months.find((m) => m.id === month).days;
        if (month === "February" && isLeapYear(currentYear)) {
            days = 29;
        }
        setSelectedMonth(month);
        setDaysInMonth(days);
    };

    const generateInitialData = (employees, days) =>
        employees.map((employee) => ({
            tno: employee.tno,
            name: employee.name,
            days: Array.from({ length: days }, () => ({ FN: "P", AN: "P" })),
            totalDays: days,
            attendance: 0,
            woff: 0,
            cl: 0,
            el: 0,
            hol: 0,
            totalAttendance: 0,
        }));

    const getStatusColor = (status) => {
        const statusColors = {
            P: "#28a745", // Green
            A: "#dc3545", // Red
            W: "#007bff", // Blue
            CL: "#ffc107", // Yellow
            EL: "#fd7e14", // Orange
            HOL: "#6f42c1", // Purple
            H: "#17a2b8", // Teal
        };
        return statusColors[status] || "white";
    };

    const updateAttendance = (rowIndex, dayIndex, period, status) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[rowIndex].days[dayIndex][period] = status;
            return calculateAttendance(newData); // Recalculate for accurate totals
        });
    };

    const calculateAttendance = (data) => {
        return data.map((emp) => {
            let attendance = 0;
            let cl = 0;
            let woff = 0;
            let el = 0;
            let hol = 0;

            emp.days.forEach((day) => {
                ["FN", "AN"].forEach((period) => {
                    switch (day[period]) {
                        case "P":
                            attendance += 0.5;
                            break;
                        case "A":
                            break;
                        case "CL":
                            cl += 0.5;
                            break;
                        case "W":
                            woff += 0.5;
                            break;
                        case "EL":
                            el += 0.5;
                            break;
                        case "HOL":
                            hol += 0.5;
                            break;
                        default:
                            break;
                    }
                });
            });

            return {
                ...emp,
                attendance,
                cl,
                woff,
                el,
                hol,
                totalAttendance: attendance + cl + el + hol,
            };
        });
    };

    const columns = [
        { name: "TNO", selector: (row) => row.tno, sortable: true, width: "100px" },
        { name: "Name", selector: (row) => row.name, sortable: true, width: "150px" },
        ...Array.from({ length: daysInMonth }, (_, i) => ({
            name: `${i + 1}`,
            width: "120px",
            cell: (row, rowIndex) => (
                <div className="attendance-dropdown" style={{ display: "inline-flex", textAlign: "center" }}>
                    <CustomDropdown
                        name={`attendance-${rowIndex}-${i}-FN`}
                        options={presentMarkingOptions.map((option) => ({
                            id: option.code,
                            name: option.code,
                        }))}
                        value={row.days[i].FN}
                        onChange={(e) => updateAttendance(rowIndex, i, "FN", e.target.value)}
                        style={{
                            width: "50px",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: getStatusColor(row.days[i].FN),
                            cursor: "pointer",
                            border: "none",
                            marginBottom: "0px",
                            height: "31px",
                            backgroundColor: "transparent",
                        }}
                    />
                    <div
                        style={{
                            height: "20px",
                            backgroundColor: "#ccc",
                            width: "1px",
                            marginTop: "5px",
                        }}
                    ></div>
                    <CustomDropdown
                        name={`attendance-${rowIndex}-${i}-AN`}
                        options={presentMarkingOptions.map((option) => ({
                            id: option.code,
                            name: option.code,
                        }))}
                        value={row.days[i].AN}
                        onChange={(e) => updateAttendance(rowIndex, i, "AN", e.target.value)}
                        style={{
                            width: "50px",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: getStatusColor(row.days[i].AN),
                            cursor: "pointer",
                            border: "none",
                            marginBottom: "0px",
                            height: "31px",
                            backgroundColor: "transparent",
                        }}
                    />
                </div>
            ),
            sortable: false,
        })),
        { name: "Tot. Days", selector: (row) => row.totalDays, sortable: true, width: "80px" },
        { name: "Attendance", selector: (row) => row.attendance, sortable: true, width: "100px" },
        { name: "W OFF", selector: (row) => row.woff, sortable: true, width: "90px" },
        { name: "CL", selector: (row) => row.cl, sortable: true, width: "80px" },
        { name: "EL", selector: (row) => row.el, sortable: true, width: "80px" },
        { name: "HOL", selector: (row) => row.hol, sortable: true, width: "80px" },
        { name: "Tot. Attendance", selector: (row) => row.totalAttendance, sortable: true, width: "100px" },
    ];

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("month", selectedMonth);
        formData.append("year", currentYear);
        formData.append("attendanceData", JSON.stringify(data));

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handlePresentMarkingChange = (e) => {
        const selectedMarking = e.target.value;

        if (selectedMarking === "P" || selectedMarking === "A") {
            setPresentMarking(selectedMarking);

            setData((prevData) => {
                const updatedData = prevData.map((emp) => ({
                    ...emp,
                    days: emp.days.map(() => ({ FN: selectedMarking, AN: selectedMarking })), // Update both FN and AN
                }));

                return calculateAttendance(updatedData); // Recalculate totals
            });
        }
    };

    return (
        <div id="attendance-fn-an" className="mt-4">
            <PageTitle title="Monthly Entry (Forenoon Afternoon)" iname="bi bi-table" />
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className="mb-3" style={{ width: "200px" }}>
                    <CustomDropdown
                        label="Select Attendance Marking:"
                        name="presentMarking"
                        options={presentMarkingOptions.map((option) => ({
                            id: option.code,
                            name: option.code,
                        }))}
                        value={presentMarking}
                        onChange={handlePresentMarkingChange}
                        required={true}
                    />
                </div>
                <div>
                    <button className="btn-outline" onClick={() => navigate("/firm-dashboard/attendance-single-entry")}>
                        Total
                    </button>
                    <button className="btn-outline" onClick={() => navigate("/firm-dashboard/attendance-monthly-entry")}>
                        Full Day
                    </button>
                    <button disabled className="submit-button">
                        FN / AN
                    </button>
                </div>
            </div>
            <CustomAttendanceTable
                columns={columns}
                data={filteredData}
                showActions={false}
                month={selectedMonth}
                onMonthChange={handleMonthChange}
                months={months}
                showMonthDropdown={true}
                currentYear={currentYear}
                handleSearch={handleSearch}
            />
            <button className="btn btn-success mt-3" onClick={handleSubmit}>
                Submit Attendance
            </button>
        </div>
    );
};

export default AttendanceTableFNAN;