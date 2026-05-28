import React, { useState } from 'react';
import PageTitle from '../../../components/dashboard/PageTitle';
import './AddAttendanceModal.scss';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../../../components/form/CustomDropdown ';


const employeeData = [
  { empCode: 'EMP001', name: 'John Doe' },
  { empCode: 'EMP002', name: 'Jane Smith' },
  { empCode: 'EMP003', name: 'Michael Johnson' },
  { empCode: 'EMP004', name: 'Emily Davis' },
];

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
  { id: 'December', name: 'December', days: 31 },
];

const AttendanceSingleEntry = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      pNo: '',
      name: '',
      days: 0,
      cl: 0,
      el: 0,
      fh: 0,
      wOff: 0,
      layOff: 0,
      na: 0,
      lop: 0,
      esi: 0,
      orLeave: 0,
      absent: 0,
      sus: 0,
      strike: 0,
      coff: 0,
      total: 0,
    },
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const currentYear = new Date().getFullYear();

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;

    if (name === 'pNo') {
      const filteredSuggestions = employeeData.filter((emp) =>
        emp.empCode.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setActiveRowIndex(index);
    }

    setRows(updatedRows);
  };

  const handleKeyPress = (index, e) => {
    if (e.key === 'Enter' && index === rows.length - 1) {
      handleAddRow(); // Add a new row when Enter is pressed in the last row
    }
  };

  const handleSuggestionClick = (index, empCode) => {
    const updatedRows = [...rows];
    const employee = employeeData.find((emp) => emp.empCode === empCode);
    if (employee) {
      updatedRows[index].pNo = employee.empCode;
      updatedRows[index].name = employee.name;
    }
    setRows(updatedRows);
    setSuggestions([]);
    setActiveRowIndex(null);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        pNo: '',
        name: '',
        days: 0,
        cl: 0,
        el: 0,
        fh: 0,
        wOff: 0,
        layOff: 0,
        na: 0,
        lop: 0,
        esi: 0,
        orLeave: 0,
        absent: 0,
        sus: 0,
        strike: 0,
        coff: 0,
        total: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const handleSaveChanges = () => {
    console.log('Saved data:', rows);
  };

  return (
    <div className="mt-4">
      <PageTitle title="Monthly Entry" iname="bi bi-table" />

      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="mb-4">
          <div className="row">
            <div className="col">
              <CustomDropdown
                label="Select Month"
                name="month"
                options={months}
                value={selectedMonth}
                onChange={handleMonthChange}
              />
            </div>
            <div className="col">
              <div className="mt-4 pt-2">
                <h6>Current Year: {currentYear}</h6>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button disabled className="submit-button">
            Total
          </button>
          <button
            
            className="btn-outline"
            onClick={() => navigate('/firm-dashboard/attendance-monthly-entry')}
          >
            Full Day
          </button>
          <button
            className="btn-outline"
            onClick={() => navigate('/firm-dashboard/attendance-FNAN')}
          >
            FN / AN
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h5>Add Employee to Mark Attendance</h5>
        <div className="table-responsive mt-3 mb-4">
          <table className="table table-bordered custom-attendance-table text-center align-middle mb-4">
            <thead className="table-header-bg">
              <tr>
                {[
                  'P No',
                  'Name',
                  'Days',
                  'CL',
                  'EL',
                  'FH',
                  'W OFF',
                  'LAY OFF',
                  'NA',
                  'LOP',
                  'ESI',
                  'OR LEAVE',
                  'ABSENT',
                  'SUS',
                  'STRIKE',
                  'COFF',
                  'Total',
                  'Actions',
                ].map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {[
                    'pNo',
                    'name',
                    'days',
                    'cl',
                    'el',
                    'fh',
                    'wOff',
                    'layOff',
                    'na',
                    'lop',
                    'esi',
                    'orLeave',
                    'absent',
                    'sus',
                    'strike',
                    'coff',
                    'total',
                  ].map((field, index) => (
                    <td key={index} style={{ position: 'relative' }}>
                      <input
                        type={field === 'pNo' || field === 'name' ? 'text' : 'number'}
                        name={field}
                        value={row[field]}
                        onChange={(e) => handleInputChange(rowIndex, e)}
                        onKeyDown={(e) => handleKeyPress(rowIndex, e)} // Add this line for Enter key press
                        className="form-control form-control-sm text-center custom-input" // Add a custom class
                        disabled={field === 'name'}
                      />
                      {field === 'pNo' &&
                        activeRowIndex === rowIndex &&
                        suggestions.length > 0 && (
                          <div
                            className="suggestions-list"
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              right: 0,
                              zIndex: 1000,
                              backgroundColor: 'white',
                              border: '1px solid #ccc',
                              maxHeight: '150px',
                              overflowY: 'auto',
                            }}
                          >
                            {suggestions.map((suggestion, suggestionIndex) => (
                              <div
                                key={suggestionIndex}
                                className="suggestion-item"
                                onClick={() =>
                                  handleSuggestionClick(rowIndex, suggestion.empCode)
                                }
                                style={{ padding: '5px', cursor: 'pointer' }}
                              >
                                {suggestion.empCode} {/* Only show employee code */}
                              </div>
                            ))}
                          </div>
                        )}
                    </td>
                  ))}
                  <td>
                    {rows.length > 1 && (
                      <button
                        className="btn-outline"
                        style={{ backgroundColor: 'transparent', padding: '4px' }}
                        onClick={() => handleDeleteRow(rowIndex)}
                      >
                        <i className="bx bx-trash" style={{ color: 'red' }}></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="btn btn-outline" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="btn btn-outline" onClick={handleAddRow}>
          Add Row
        </button>
      </div>
    </div>
  );
};

export default AttendanceSingleEntry;