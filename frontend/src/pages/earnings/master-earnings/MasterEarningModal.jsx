import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import TextInput from '../../../components/form/TextInput';
import CustomDropdown from '../../../components/form/CustomDropdown ';

import { createMonthlyEarningMaster, updateMonthlyEarningMaster, fetchMonthlyEarningMasterDetails } from '../../../features/earningsMonthlySlice';

import '../style.scss';

const months = [
  { id: 'January', name: 'January' },
  { id: 'February', name: 'February' },
  { id: 'March', name: 'March' },
  { id: 'April', name: 'April' },
  { id: 'May', name: 'May' },
  { id: 'June', name: 'June' },
  { id: 'July', name: 'July' },
  { id: 'August', name: 'August' },
  { id: 'September', name: 'September' },
  { id: 'October', name: 'October' },
  { id: 'November', name: 'November' },
  { id: 'December', name: 'December' },
];

const MasterEarningModal = ({ show, handleClose, data, earningsOptions = [], earnings }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((store) => store.earningsMonthly || {});

  const [formData, setFormData] = useState({
    earning_id: '',
    month: '',
    year: new Date().getFullYear(),
    branch_id: null,
    department_id: null,
    unwanted: false,
    employees: [], // { emp_id, earning_amt }
  });

  // local row state for UI table
  const [rows, setRows] = useState([]); // { emp_id, emp_code, earning_amt }

  useEffect(() => {
    if (!show) return;

    if (data?.id) {
      // If details not already present, you can fetch; for now assume `data` already has fields
      // Expected `data` shape from backend:
      // { id, earning_id, month, unwanted, branch_id, department_id, employees:[{emp_id, earning_amt,...}] }
      const monthDate = data.month ? new Date(data.month) : null;
      const monthName = monthDate
        ? months[monthDate.getMonth()]?.name
        : '';

      const mappedRows = (data.employees || []).map((r) => ({
        emp_id: r.emp_id,
        emp_code: r.employee?.pno || r.employee?.tno || '',
        earning_amt: r.earning_amt ?? 0,
      }));

      setFormData({
        earning_id: data.earning_id ?? '',
        month: monthName,
        year: monthDate ? monthDate.getFullYear() : new Date().getFullYear(),
        branch_id: data.branch_id ?? null,
        department_id: data.department_id ?? null,
        unwanted: !!data.unwanted,
        employees: mappedRows.map((r) => ({ emp_id: r.emp_id, earning_amt: r.earning_amt })),
      });
      setRows(mappedRows);
      return;
    }

    // create mode
    setFormData({
      earning_id: '',
      month: '',
      year: new Date().getFullYear(),
      branch_id: null,
      department_id: null,
      unwanted: false,
      employees: [],
    });
    setRows([{ emp_id: '', emp_code: '', earning_amt: 0 }]);
  }, [show, data]);

  useEffect(() => {
    if (success && show) handleClose();
  }, [success, show, handleClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRowChange = (index, e) => {
    const { name, value } = e.target;
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [name]: value };
      return next;
    });
  };

  const syncEmployeesFromRows = (nextRows) => {
    setFormData((prev) => ({
      ...prev,
      employees: nextRows.map((r) => ({
        emp_id: r.emp_id ? parseInt(r.emp_id) : null,
        earning_amt: parseFloat(r.earning_amt ?? 0),
      })),
    }));
  };

  const handleAddRow = () => {
    const next = [...rows, { emp_id: '', emp_code: '', earning_amt: 0 }];
    setRows(next);
    syncEmployeesFromRows(next);
  };

  const handleRemoveRow = (index) => {
    const next = rows.filter((_, i) => i !== index);
    setRows(next);
    syncEmployeesFromRows(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      earning_id: parseInt(formData.earning_id),
      month: formData.month,
      year: formData.year,
      branch_id: formData.branch_id,
      department_id: formData.department_id,
      unwanted: formData.unwanted,
      employees: (rows || [])
        .filter((r) => r.emp_id)
        .map((r) => ({ emp_id: parseInt(r.emp_id), earning_amt: parseFloat(r.earning_amt ?? 0) })),
    };

    if (data?.id) {
      dispatch(updateMonthlyEarningMaster({ id: data.id, payload }));
    } else {
      dispatch(createMonthlyEarningMaster(payload));
    }
  };

  const monthOptions = months;

  const earningOptions = useMemo(() => earnings || [], [earnings]);

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data?.id ? 'Edit Monthly Earning Master' : 'Add Monthly Earning Master'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error ? <DismissableAlert variant="danger" title="Error" msg={error?.message || error} /> : null}

        <form onSubmit={handleSubmit}>
          <div className="row border-box">
            <div className="col-md-4 col-lg-4">
              <CustomDropdown
                label="Earning"
                name="earning_id"
                options={earningOptions}
                value={formData.earning_id}
                onChange={(e) => setFormData((p) => ({ ...p, earning_id: e.target.value }))}
                required
              />
            </div>

            <div className="col-md-4 col-lg-4">
              <CustomDropdown
                label="Month"
                name="month"
                options={monthOptions}
                value={formData.month}
                onChange={(e) => setFormData((p) => ({ ...p, month: e.target.value }))}
                required
              />
            </div>

            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Year"
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="table-responsive ded-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Emp Id</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} style={{ height: '30px' }}>
                      <td>
                        <input
                          type="number"
                          name="emp_id"
                          value={row.emp_id ?? ''}
                          onChange={(e) => {
                            handleRowChange(index, e);
                            const next = [...rows];
                            next[index] = { ...next[index], emp_id: e.target.value };
                            syncEmployeesFromRows(next);
                          }}
                          className="form-control tbl"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="earning_amt"
                          value={row.earning_amt ?? 0}
                          onChange={(e) => {
                            handleRowChange(index, e);
                            const next = [...rows];
                            next[index] = { ...next[index], earning_amt: e.target.value };
                            syncEmployeesFromRows(next);
                          }}
                          className="form-control tbl"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          disabled={index === 0}
                          className="action-button"
                          onClick={() => handleRemoveRow(index)}
                        >
                          <i className="bx bx-trash" style={index === 0 ? { color: 'lightgrey' } : { color: 'red' }}></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-between gap-2 mt-3">
            <Button variant="secondary" type="button" onClick={handleAddRow} disabled={loading ? true : false}>
              Add Row
            </Button>
            <Button variant="primary" type="submit" disabled={loading ? true : false}>
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default MasterEarningModal;

