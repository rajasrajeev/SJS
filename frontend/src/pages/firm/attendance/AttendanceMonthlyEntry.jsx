import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/dashboard/PageTitle";
import BackendTable from "../../../components/table/BackendTable";
import "./AttendanceMonthlyEntry.scss";
import CustomDropdown from "../../../components/form/CustomDropdown ";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../../features/employeeSlice";
import { fetchLeaves } from "../../../features/leaveSlice";

const AttendanceMonthlyEntry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employees, loading: employeeLoading } = useSelector((state) => state.employee);
  const { leaves, loading: leaveLoading } = useSelector((state) => state.leave);

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
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [daysInMonth, setDaysInMonth] = useState(31);
  const currentYear = new Date().getFullYear();
  const [presentMarking, setPresentMarking] = useState("P");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [presentMarkingOptions, setPresentMarkingOptions] = useState([]);

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
        { id: "P", code: "P", name: "P (Present)" },
        { id: "A", code: "A", name: "A (Absent)" },
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
    setData(generateInitialData(employees?.data || dummyEmployees, days));
  };

  const generateInitialData = (employees, days) =>
    employees.map((employee) => ({
      tno: employee.tno,
      name: employee.name,
      days: Array.from({ length: days }, () => presentMarking),
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

  const updateAttendance = (rowIndex, dayIndex, status) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex].days[dayIndex] = status;
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

      emp.days.forEach((status) => {
        switch (status) {
          case "P":
            attendance += 1;
            break;
          case "A":
            break;
          case "CL":
            cl += 1;
            break;
          case "W":
            woff += 1;
            break;
          case "EL":
            el += 1;
            break;
          case "HOL":
            hol += 1;
            break;
          default:
            break;
        }
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
    { name: "TNO", selector: (row) => row.tno, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true, width: "200px" },
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      name: `${i + 1}`,
      cell: (row, rowIndex) => (
        <div className="attendance-dropdown">
          <CustomDropdown
            name={`attendance-${rowIndex}-${i}`}
            options={presentMarkingOptions.map((option) => ({
              id: option.code,
              name: option.code,
            }))}
            value={row.days[i]}
            onChange={(e) => updateAttendance(rowIndex, i, e.target.value)}
            style={{
              width: "50px",
              height: "31px",
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "transparent",
              color: getStatusColor(row.days[i]),
              border: "none",
              cursor: "pointer",
            }}
          />
        </div>
      ),
      sortable: false,
      width: "60px",
    })),
    { name: "Total Days", selector: (row) => row.totalDays, sortable: true },
    { name: "Attendance", selector: (row) => row.attendance, sortable: true },
    { name: "W OFF", selector: (row) => row.woff, sortable: true },
    { name: "CL", selector: (row) => row.cl, sortable: true },
    { name: "EL", selector: (row) => row.el, sortable: true },
    { name: "HOL", selector: (row) => row.hol, sortable: true },
    { name: "Total Attendance", selector: (row) => row.totalAttendance, sortable: true },
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

  const handlePresentMarkingChange = (e) => {
    const selectedMarking = e.target.value;

    if (selectedMarking === "P" || selectedMarking === "A") {
      setPresentMarking(selectedMarking);

      setData((prevData) => {
        const updatedData = prevData.map((emp) => ({
          ...emp,
          days: emp.days.map(() => selectedMarking),
        }));

        return calculateAttendance(updatedData); // Recalculate totals
      });
    }
  };

  return (
    <div id="attendance-fn-an" className="mt-4">
      <PageTitle title="Monthly Entry (Full Day)" iname="bi bi-table" />

      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="mb-3" style={{ width: "200px" }}>
          <CustomDropdown
            label="Select Attendance Marking:"
            name="presentMarking"
            options={presentMarkingOptions}
            value={presentMarking}
            onChange={handlePresentMarkingChange}
            required={true}
          />
        </div>
        <div>
          <button className="btn-outline" onClick={() => navigate('/firm-dashboard/attendance-single-entry')}>
            Total
          </button>
          <button disabled className="submit-button">
            Full Day
          </button>
          <button className="btn-outline" onClick={() => navigate('/firm-dashboard/attendance-FNAN')}>
            FN / AN
          </button>
        </div>
      </div>

      <BackendTable
        columns={columns}
        data={filteredData}
        showActions={false}
        month={selectedMonth}
        onMonthChange={handleMonthChange}
        months={months}
        showMonthDropdown={true}
        currentYear={currentYear}
        handleSearch={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-success mt-3" onClick={handleSubmit}>
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceMonthlyEntry;