import React, { useState } from 'react';
import PageTitle from '../../../components/dashboard/PageTitle';
import BackendTable from '../../../components/table/BackendTable';
import EditAttendanceModal from './EditAttendanceModal';
import AddAttendanceModal from './AddAttendanceModal';

const AttendanceImport = () => {
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddAttendance, setShowAddAttendance] = useState(false);

  const [attendanceData, setAttendanceData] = useState([
    { tNo: 'EMP001', name: 'John Doe', workDays: 0, el: 0, cl: 0, ml: 0, coff: 0, wo: 0, na: 0, esi: 0, ol: 0, lop: 0, absent: 0, sus: 0, totalDays: 0 },
    { tNo: 'EMP002', name: 'Jane Smith', workDays: 0, el: 0, cl: 0, ml: 0, coff: 0, wo: 0, na: 0, esi: 0, ol: 0, lop: 0, absent: 0, sus: 0, totalDays: 0 },
    { tNo: 'EMP003', name: 'Michael Johnson', workDays: 0, el: 0, cl: 0, ml: 0, coff: 0, wo: 0, na: 0, esi: 0, ol: 0, lop: 0, absent: 0, sus: 0, totalDays: 0 },
    { tNo: 'EMP004', name: 'Emily Davis', workDays: 0, el: 0, cl: 0, ml: 0, coff: 0, wo: 0, na: 0, esi: 0, ol: 0, lop: 0, absent: 0, sus: 0, totalDays: 0 }
  ]);

  const handleEditClick = (row) => {
    const index = attendanceData.findIndex((item) => item.tNo === row.tNo);
    setEditRowIndex(index);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditRowIndex(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = [...attendanceData];
    updated[editRowIndex][name] = value;
    setAttendanceData(updated);
  };

  const handleSave = () => {
    setShowModal(false);
  };

  const handleNextEmployee = () => {
    if (editRowIndex < attendanceData.length - 1) {
      setEditRowIndex(editRowIndex + 1);
    }
  };

  const handlePrevEmployee = () => {
    if (editRowIndex > 0) {
      setEditRowIndex(editRowIndex - 1);
    }
  };

  const handleAddSelected = (selectedData) => {
    const newAttendanceData = selectedData.map(item => ({
      tNo: `EMP${item.empCode}`,
      name: item.empName,
      workDays: item.total,
      el: 0,
      cl: 0,
      ml: 0,
      coff: 0,
      wo: 0,
      na: 0,
      esi: 0,
      ol: 0,
      lop: 0,
      absent: 0,
      sus: 0,
      totalDays: item.total,
    }));
    setAttendanceData([...attendanceData, ...newAttendanceData]);
    setShowAddAttendance(false);
  };

  const columns = [
    { name: 'SL NO', selector: (row, index) => index + 1, sortable: true, width: '80px' },
    { name: 'T NO', selector: row => row.tNo, sortable: true },
    { name: 'NAME', selector: row => row.name, sortable: true, width: '200px' },
    { name: 'WORK DAYS', selector: row => row.workDays, sortable: true },
    { name: 'EL', selector: row => row.el, sortable: true },
    { name: 'CL', selector: row => row.cl, sortable: true },
    { name: 'ML', selector: row => row.ml, sortable: true },
    { name: 'COFF', selector: row => row.coff, sortable: true },
    { name: 'WO', selector: row => row.wo, sortable: true },
    { name: 'NA', selector: row => row.na, sortable: true },
    { name: 'ESI', selector: row => row.esi, sortable: true },
    { name: 'OL', selector: row => row.ol, sortable: true },
    { name: 'LOP', selector: row => row.lop, sortable: true },
    { name: 'ABSENT', selector: row => row.absent, sortable: true },
    { name: 'SUS', selector: row => row.sus, sortable: true },
    { name: 'TOTAL DAYS', selector: row => row.totalDays, sortable: true },
  ];

  const currentRow = editRowIndex !== null ? attendanceData[editRowIndex] : null;

  return (
    <div className="mt-4">
      <PageTitle title="Attendance Import" iname="bi bi-cloud-arrow-up-fill" />

      <BackendTable
        columns={columns}
        data={attendanceData}
        onEdit={(row) => handleEditClick(row)}
        onDelete={(row) =>
          setAttendanceData(attendanceData.filter((item) => item.tNo !== row.tNo))
        }
        handleSearch={(e) => console.log('Search:', e.target.value)}
        loading={false}
        total={attendanceData.length}
        search={''}
        handlePageChange={(page) => console.log('Page:', page)}
        handlePerRowsChange={(currentRowsPerPage, page) =>
          console.log('Rows per page:', currentRowsPerPage, 'Page:', page)
        }
        addButton={{
          show: true,
          text: 'Import',
          onClick: () => setShowAddAttendance(true),
        }}
      />

      {/* Modal for Editing Attendance */}
      {showModal && currentRow && (
        <EditAttendanceModal
          show={showModal}
          handleClose={handleModalClose}
          currentRow={currentRow}
          handleInputChange={handleInputChange}
          handlePrevEmployee={handlePrevEmployee}
          handleNextEmployee={handleNextEmployee}
          handleSave={handleSave}
          editRowIndex={editRowIndex}
          attendanceData={attendanceData}
        />
      )}

      {/* Add Attendance Modal */}
      {showAddAttendance && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <div className="bg-white p-4 rounded shadow" style={{ width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            <AddAttendanceModal onAddSelected={handleAddSelected} />
            <div className="d-flex justify-content-end mt-3">
              <button onClick={() => setShowAddAttendance(false)} className="btn btn-secondary me-2">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceImport;