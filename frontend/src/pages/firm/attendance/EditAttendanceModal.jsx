import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditAttendanceModal = ({
    show,
    handleClose,
    currentRow,
    handleInputChange,
    handlePrevEmployee,
    handleNextEmployee,
    handleSave,
    editRowIndex,
    attendanceData
}) => {
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Attendance</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h5 className="mb-3">ADD and Edit Attendance Manually</h5>

                {/* Employee Info */}
                <div className="mb-3 d-flex justify-content-between">
                    <h6>Employee Name: {currentRow.name}</h6>
                    <h6>T No: {currentRow.tNo}</h6>
                </div>

                {/* Attendance Table */}
                <div className="table-responsive mt-3">
                    <table className="table table-bordered custom-attendance-table text-center align-middle">
                        <thead className="table-header-bg">
                            <tr>
                                {[
                                    'Work Days', 'EL', 'CL', 'ML', 'COFF',
                                    'WO', 'NA', 'ESI', 'OL', 'LOP',
                                    'ABSENT', 'SUS', 'Total Days'
                                ].map((heading, index) => (
                                    <th key={index}>{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {[
                                    'workDays', 'el', 'cl', 'ml', 'coff',
                                    'wo', 'na', 'esi', 'ol', 'lop',
                                    'absent', 'sus', 'totalDays'
                                ].map((field, index) => (
                                    <td key={index}>
                                        <input
                                            type="number"
                                            name={field}
                                            value={currentRow[field]}
                                            onChange={handleInputChange}
                                            className="form-control form-control-sm text-center"
                                            style={{ width: "70px" }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Navigation & Action Buttons */}
                <div className="attendance-modal-buttons d-flex justify-content-between mt-3 flex-wrap gap-2">
                    <div className="d-flex gap-2">
                        <button className='btn-outline ' onClick={handlePrevEmployee} disabled={editRowIndex === 0}>
                            Previous
                        </button>
                        <button className='btn-outline ' onClick={handleNextEmployee} disabled={editRowIndex === attendanceData.length - 1}>
                            Next
                        </button>
                    </div>
                    <div className="d-flex gap-2">
                        <button className='submit-button' onClick={handleClose}>Cancel</button>
                        <button className='submit-button' onClick={handleSave}>Save</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditAttendanceModal;