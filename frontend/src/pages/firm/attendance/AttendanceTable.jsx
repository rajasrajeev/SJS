import React, { useState } from 'react';
import PageTitle from '../../../components/dashboard/PageTitle';
import BackendTable from '../../../components/table/BackendTable';
import CustomDropdown from '../../../components/form/CustomDropdown ';


const AttendanceTable = () => {
  const months = [
    { id: 'January', name: 'January', days: 31 },
    { id: 'February', name: 'February', days: 28 },
    { id: 'March', name: 'March', days: 31 },
    { id: 'April', name: 'April', days: 30 },
    { id: 'May', name: 'May', days: 31 },
    { id: 'June', name: 'June', days: 30 },
    { id: 'July', name: 'July', days: 31 },
    { id: 'August', name: 'August', days: 31 },
    { id: 'September', name: 'September', days: 30 },
    { id: 'October', name: 'October', days: 31 },
    { id: 'November', name: 'November', days: 30 },
    { id: 'December', name: 'December', days: 31 }
  ];

  const [selectedMonth, setSelectedMonth] = useState('January');
  const [daysInMonth, setDaysInMonth] = useState(31);
  const currentYear = new Date().getFullYear();

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const handleMonthChange = (e) => {
    const month = e.target.value;
    let days = months.find(m => m.id === month).days;
    if (month === 'February' && isLeapYear(currentYear)) {
      days = 29;
    }
    setSelectedMonth(month);
    setDaysInMonth(days);
    const updatedData = data.map(row => ({
      ...row,
      days: Array.from({ length: days }, (_, i) => row.days[i] || 'P'),
      totalDays: days
    }));
    setData(updateStatistics(updatedData));
  };

  const initialData = Array.from({ length: 50 }, (_, i) => ({
    tno: `${(i + 1).toString().padStart(3, '0')}`,
    name: `Employee ${i + 1}`,
    days: Array.from({ length: daysInMonth }, () => 'P'),
    totalDays: daysInMonth,
    attendance: 26,
    woff: 4,
    cl: 1,
    el: 0,
    hol: 1,
    totalAttendance: 27,
  }));

  const [data, setData] = useState(initialData);

  const calculateAttendance = (days) => days.filter(day => day === 'P').length;
  const calculateWOff = (days) => days.filter(day => day === 'W').length;
  const calculateCL = (days) => days.filter(day => day === 'CL').length;
  const calculateEL = (days) => days.filter(day => day === 'EL').length;
  const calculateHOL = (days) => days.filter(day => day === 'HOL').length;

  const updateStatistics = (newData) => newData.map(row => {
    const attendance = calculateAttendance(row.days);
    const woff = calculateWOff(row.days);
    const cl = calculateCL(row.days);
    const el = calculateEL(row.days);
    const hol = calculateHOL(row.days);
    const totalAttendance = attendance + cl + el + hol;
    return { ...row, attendance, woff, cl, el, hol, totalAttendance };
  });

  const toggleAttendance = (rowIndex, dayIndex) => {
    const newData = [...data];
    const currentStatus = newData[rowIndex].days[dayIndex];
    const nextStatus = ['P', 'A', 'W', 'CL', 'EL', 'HOL'];
    const currentIndex = nextStatus.indexOf(currentStatus);
    newData[rowIndex].days[dayIndex] = nextStatus[(currentIndex + 1) % nextStatus.length];
    setData(updateStatistics(newData));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'P': return 'darkgreen';
      case 'A': return 'red';
      case 'W': return 'darkblue';
      case 'CL': return 'darkkhaki';
      case 'EL': return 'orange';
      case 'HOL': return 'plum';
      default: return 'white';
    }
  };

  const columns = [
    { name: 'TNO', selector: row => row.tno, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true, width: '200px' },
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      name: `${i + 1}`,
      cell: (row, rowIndex) => (
        <button
          onClick={() => toggleAttendance(rowIndex, i)}
          style={{ width: '40px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '10px', fontWeight: 'bolder', backgroundColor: getStatusColor(row.days[i]), border: 'none', cursor: 'pointer' }}
        >
          {row.days[i]}
        </button>
      ),
      sortable: false,
      width: '50px',
      center: true
    })),
    { name: 'Total Days', selector: row => row.totalDays, sortable: true },
    { name: 'Attendance', selector: row => row.attendance, sortable: true },
    { name: 'W OFF', selector: row => row.woff, sortable: true },
    { name: 'CL', selector: row => row.cl, sortable: true },
    { name: 'EL', selector: row => row.el, sortable: true },
    { name: 'HOL', selector: row => row.hol, sortable: true },
    { name: 'Total Attendance', selector: row => row.totalAttendance, sortable: true },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('month', selectedMonth);
    formData.append('year', currentYear);
    formData.append('attendanceData', JSON.stringify(data));
    // Log FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    // try {
    //   await axios.post('/api/attendance/submit', formData);
    //   alert('Attendance data submitted successfully!');
    // } catch (error) {
    //   console.error('Error submitting data:', error);
    //   alert('Failed to submit attendance data.');
    // }
  };

  return (
    <div className="mt-4">
      <PageTitle title="Editable Attendance Table" iname="bi bi-table" />
      {/* <CustomDropdown
        label="Select Month"
        name="month"
        options={months}
        value={selectedMonth}
        onChange={handleMonthChange}
      /> */}
      <BackendTable
        columns={columns}
        data={data}
        showActions={false}
        month={selectedMonth}
        onMonthChange={handleMonthChange}
        months={months}
        showMonthDropdown={true}
        currentYear={currentYear}
      />
      <button className="btn btn-success mt-3" onClick={handleSubmit}>Submit Attendance</button>
    </div>
  );
};

export default AttendanceTable;


// const initialData = [
//   {
//     tno: '001',
//     name: 'John Doe',
//     days: Array.from({ length: daysInMonth }, () => 'P'),
//     totalDays: daysInMonth,
//     attendance: 26,
//     woff: 4,
//     cl: 1,
//     el: 0,
//     hol: 1,
//     totalAttendance: 27,
//   },
//   {
//     tno: '002',
//     name: 'Jane Smith',
//     days: Array.from({ length: daysInMonth }, (_, i) => (i % 2 === 0 ? 'P' : 'A')),
//     totalDays: daysInMonth,
//     attendance: 24,
//     woff: 4,
//     cl: 2,
//     el: 1,
//     hol: 1,
//     totalAttendance: 25,
//   }
// ];