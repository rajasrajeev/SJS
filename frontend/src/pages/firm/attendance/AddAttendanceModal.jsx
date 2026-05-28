import React, { useState } from 'react';
import CustomTable from '../../../components/table/CustomTable';
import TextInput from '../../../components/form/TextInput';
import CheckBox from '../../../components/form/CheckBox';
import './AddAttendanceModal.scss';

const AddAttendanceModal = ({ onAddSelected }) => {
  const [data, setData] = useState([
    { slNo: 10608, empCode: 1193, empName: 'BINDHU K R', dept: 'PREPARATORY', total: 30.8, isChecked: false },
    { slNo: 10612, empCode: 1182, empName: 'JESSINTHA.E.P', dept: 'PREPARATORY', total: 31, isChecked: false },
    { slNo: 10620, empCode: 1102, empName: 'SURAJA A V', dept: 'SPINNING', total: 31, isChecked: false },
    { slNo: 10631, empCode: 1052, empName: 'VASANTHI K.N.', dept: 'SPINNING', total: 31, isChecked: false },
    { slNo: 10635, empCode: 1137, empName: 'BINDHU V K', dept: 'SPINNING', total: 31, isChecked: false },
    { slNo: 10617, empCode: 758, empName: 'K. VENUGOPALAN', dept: 'WINDING', total: 31, isChecked: false },
    { slNo: 10647, empCode: 826, empName: 'P.K. RAVINDRANATHAN', dept: 'PACKING', total: 30.8, isChecked: false },
    { slNo: 10648, empCode: 866, empName: 'P. PARAMESWARAN', dept: 'MIXING', total: 31, isChecked: false },
    { slNo: 947, empCode: 1045, empName: 'K.A. JOY', dept: 'MIXING', total: 31, isChecked: false },
    { slNo: 10312, empCode: 1165, empName: 'SMITHA V V', dept: 'MIXING', total: 31, isChecked: false },
    { slNo: 10322, empCode: 1055, empName: 'VANAJA.C.P', dept: 'MIXING', total: 31, isChecked: false },
    { slNo: 10330, empCode: 577, empName: 'K. KRISHNANKUTTY', dept: 'BLOWROOM', total: 31, isChecked: false },
    { slNo: 10331, empCode: 877, empName: 'K.F. VINCENT', dept: 'BLOWROOM', total: 31, isChecked: false },
    { slNo: 10332, empCode: 944, empName: 'K.T. SHAJU', dept: 'BLOWROOM', total: 31, isChecked: false },
    { slNo: 10333, empCode: 1053, empName: 'SUDHEESH P.F.', dept: 'BLOWROOM', total: 31, isChecked: false },
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [missingEntry, setMissingEntry] = useState({
    empCode: '',
    empName: '',
    dept: '',
    total: '',
    isChecked: false,
  });

  const handleAddMissingEntry = () => {
    if (!missingEntry.empCode || !missingEntry.empName || !missingEntry.dept || !missingEntry.total) {
      alert("Please fill all fields.");
      return;
    }

    const newEntry = {
      slNo: Date.now(), // temporary unique ID
      empCode: Number(missingEntry.empCode),
      empName: missingEntry.empName,
      dept: missingEntry.dept,
      total: parseFloat(missingEntry.total),
      isChecked: false,
    };
    setData([...data, newEntry]);
    setMissingEntry({
      empCode: '',
      empName: '',
      dept: '',
      total: '',
      isChecked: false,
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleMissingEntryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMissingEntry((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (index) => {
    const updatedData = [...data];
    updatedData[index].isChecked = !updatedData[index].isChecked;
    setData(updatedData);
  };

  const filteredData = data.filter((item) =>
    item.empCode.toString().includes(searchInput) ||
    item.empName.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.dept.toLowerCase().includes(searchInput.toLowerCase())
  );

  const columns = [
    {
      name: 'Select',
      cell: (row, index) => (
        <CheckBox
          label=""
          value={row.isChecked}
          onToggle={() => handleCheckboxChange(data.indexOf(row))}
          id={`checkbox-${row.slNo}`}
          name={`checkbox-${row.slNo}`}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: 'Sl. No', selector: row => row.slNo, sortable: true },
    { name: 'Employee Code', selector: row => row.empCode, sortable: true },
    { name: 'Employee Name', selector: row => row.empName, sortable: true },
    { name: 'Department', selector: row => row.dept, sortable: true },
    { name: 'Total', selector: row => row.total.toFixed(3), sortable: true },
  ];

  const totalWorkdays = data.reduce((sum, emp) => sum + emp.total, 0).toFixed(1);
  const totalEmployees = 230;
  const workdaysAbove15 = 4655.3;

  const handleAddSelected = () => {
    const selectedData = data.filter(item => item.isChecked);
    onAddSelected(selectedData);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, width: '100%', background: '#f9f9f9' }}>
      <h5>Attendance</h5>

      {/* Search and Add Missing Entry */}
      {/* <div className="mb-3 d-flex flex-wrap gap-2">
        <TextInput
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="form-control form-control-sm"
          width="200px"
        />
      </div> */}

      {/* <div className="mb-3 d-flex gap-1" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <TextInput
          type="number"
          placeholder="Employee Code"
          name="empCode"
          value={missingEntry.empCode}
          onChange={handleMissingEntryChange}
          className="form-control form-control-sm"
          width="150px"
        />
        <TextInput
          type="text"
          placeholder="Employee Name"
          name="empName"
          value={missingEntry.empName}
          onChange={handleMissingEntryChange}
          className="form-control form-control-sm"
          width="150px"
        />
        <TextInput
          type="text"
          placeholder="Department"
          name="dept"
          value={missingEntry.dept}
          onChange={handleMissingEntryChange}
          className="form-control form-control-sm"
          width="150px"
        />
        <TextInput
          type="number"
          step="0.001"
          placeholder="Total Days"
          name="total"
          value={missingEntry.total}
          onChange={handleMissingEntryChange}
          className="form-control form-control-sm"
          width="120px"
        />
        <CheckBox
          label="Mark as Missing"
          value={missingEntry.isChecked}
          onToggle={(checked) => setMissingEntry((prev) => ({ ...prev, isChecked: checked }))}
          id="missingEntryCheck"
          name="isChecked"
        />
        <button className="btn btn-sm btn-outline-info" onClick={handleAddMissingEntry} disabled={!missingEntry.isChecked}>
          Add Missing Entry
        </button>
      </div> */}

      {/* Table Display */}
      <CustomTable
        columns={columns}
        data={filteredData}
        showActions={false}
        showSearchBar={true}
        search={searchInput}
        handleSearch={handleSearchInputChange}
        pagination={false}
        addButton={{ show: true, text: 'Add Selected', onClick: handleAddSelected }}
        addButtonWidth="150px" // Example width for the add button
      />

      {/* Footer */}
      <div className="d-flex justify-content-end mt-2">
        <strong style={{ fontSize: '0.9rem' }}>Total : {data.length}</strong>
      </div>

      {/* <div className="d-flex justify-content-end gap-2 mt-3 border-top pt-2">
        <button className="btn btn-outline-primary btn-sm">Import</button>
        <button className="btn btn-outline-secondary btn-sm">Edit</button>
        <button className="btn btn-outline-danger btn-sm">Delete</button>
        <button className="btn btn-outline-success btn-sm">To Excel</button>
        <button className="btn btn-outline-dark btn-sm">Cancel</button>
      </div> */}

      <div className="mt-3">
        <strong style={{ fontSize: '0.9rem' }}>
          TOTAL WORKDAYS OF {totalEmployees} EMPLOYEES WORK DAYS 15 AND ABOVE IS : {workdaysAbove15}
        </strong>
      </div>
    </div>
  );
};

export default AddAttendanceModal;