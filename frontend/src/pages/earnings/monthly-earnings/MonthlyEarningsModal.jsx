import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from 'react-select/async';

import axiosInstance from '../../../utils/axios';

import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import TextInput from '../../../components/form/TextInput';
import CustomDropdown from '../../../components/form/CustomDropdown ';

import { createMonthlyEarning, updateMonthlyEarning, fetchMonthlyEarnings } from '../../../features/earningsMonthlySlice';

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

const MonthlyEarningsModal = ({ show, handleClose, data, earningOptions = [] }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((store) => store.earningsMonthly || {});

  const earningSelectOptions = useMemo(() => earningOptions || [], [earningOptions]);

  const [formData, setFormData] = useState({
    earning_id: '',
    month: '',
    year: new Date().getFullYear(),
    branch_id: null,
    department_id: null,
    unwanted: false,
    employees: [], // derived from rows
  });

  // rows: { emp_id, emp_code, emp_name, earning_amt }
  const [rows, setRows] = useState([{ emp_id: '', emp_code: '', emp_name: '', earning_amt: 0 }]);

  // ensure modal keeps latest response in formData so list shows saved employees
  const ensureEmployeesToSubmit = (nextRows) => {
    setRows(nextRows);
    syncEmployeesFromRows(nextRows);
  };

  useEffect(() => {
    if (!show) return;

    if (data?.id) {
      const monthDate = data.month ? new Date(data.month) : null;
      const monthName = monthDate ? months[monthDate.getMonth()]?.name : '';

      const mappedRows = (data.employees || []).map((r) => ({
        emp_id: r.emp_id ?? '',
        emp_code: r.employee?.pno || r.employee?.tno || r.emp_code || '',
        emp_name: r.employee?.name || r.emp_name || '',
        earning_amt: r.earning_amt ?? 0,
      }));

      setFormData({
        earning_id: data.earning_id ?? '',
        month: monthName,
        year: monthDate ? monthDate.getFullYear() : new Date().getFullYear(),
        branch_id: data.branch_id ?? null,
        department_id: data.department_id ?? null,
        unwanted: !!data.unwanted,
        employees: mappedRows.map((r) => ({ emp_id: r.emp_id ? parseInt(r.emp_id) : null, earning_amt: parseFloat(r.earning_amt ?? 0) })),
      });
      setRows(mappedRows);
      return;
    }

    setFormData({
      earning_id: '',
      month: '',
      year: new Date().getFullYear(),
      branch_id: null,
      department_id: null,
      unwanted: false,
      employees: [],
    });
    setRows([{ emp_id: '', emp_code: '', emp_name: '', earning_amt: 0 }]);
  }, [show, data]);

  useEffect(() => {
    if (success && show) {
      handleClose();
      // refresh table after create/update
      dispatch(fetchMonthlyEarnings({ page: 1, perPage: 10, search: '' }));
    }
  }, [success, show, handleClose, dispatch]);

  const syncEmployeesFromRows = (nextRows) => {
    setFormData((prev) => ({
      ...prev,
      employees: nextRows
        .filter((r) => r.emp_id)
        .map((r) => ({
          emp_id: parseInt(r.emp_id),
          earning_amt: parseFloat(r.earning_amt ?? 0),
        })),
    }));
  };

  const handleAddRow = () => {
    const next = [...rows, { emp_id: '', emp_code: '', emp_name: '', earning_amt: 0 }];
    setRows(next);
    syncEmployeesFromRows(next);
  };

  const handleRemoveRow = (index) => {
    const next = rows.filter((_, i) => i !== index);
    setRows(next.length ? next : [{ emp_id: '', emp_code: '', emp_name: '', earning_amt: 0 }]);
    syncEmployeesFromRows(next);
  };

  const handleRowChange = (index, patch) => {
    const next = [...rows];
    next[index] = { ...next[index], ...patch };
    setRows(next);
    syncEmployeesFromRows(next);
  };

  const fetchEmployeeList = async (inputValue) => {
    if (!inputValue || inputValue.length <= 1) return [];

    try {
      const response = await axiosInstance.get(`/employee/mini?emp_code=${inputValue}`);
      const list = response.data || [];

      return list.map((emp) => ({
        value: emp.id, // emp id
        label: `${emp.pno} (${emp.name})`,
        raw: emp,
      }));
    } catch (e) {
      return [];
    }
  };

  const handleSubmit = (e) => {
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

    if (data?.id) dispatch(updateMonthlyEarning({ id: data.id, payload }));
    else dispatch(createMonthlyEarning(payload));
  };

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data?.id ? 'Edit Monthly Earning' : 'Add Monthly Earning'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error ? <DismissableAlert variant="danger" title="Error" msg={error?.message || error} /> : null}

        <form onSubmit={handleSubmit}>
          <div className="row border-box">
            <div className="col-md-4 col-lg-4">
              <CustomDropdown
                label="Earning Id"
                name="earning_id"
                options={earningSelectOptions}
                value={formData.earning_id}
                onChange={(e) => setFormData((p) => ({ ...p, earning_id: e.target.value }))}
                required
              />
            </div>

            <div className="col-md-4 col-lg-4">
              <CustomDropdown
                label="Month"
                name="month"
                options={months}
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
                onChange={(e) => setFormData((p) => ({ ...p, year: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="table-responsive ded-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Employee Code</th>
                    <th>Employee Name</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} style={{ height: '30px' }}>
                      <td style={{ width: 260 }}>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={fetchEmployeeList}
                          value={
                            row.emp_id
                              ? {
                                  value: row.emp_id,
                                  label: `${row.emp_code || ''}${row.emp_name ? ` (${row.emp_name})` : ''}`.trim(),
                                }
                              : null
                          }
                          onChange={(selected) => {
                            const emp = selected?.raw || {};
                            handleRowChange(index, {
                              emp_id: selected?.value ?? '',
                              emp_code: emp.pno || emp.tno || selected?.label || '',
                              emp_name: emp.name || '',
                            });
                          }}
                          placeholder="Emp code"
                          className="tbl"
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          name="emp_name"
                          value={row.emp_name ?? ''}
                          readOnly
                          className="form-control tbl"
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="earning_amt"
                          value={row.earning_amt ?? 0}
                          onChange={(e) => handleRowChange(index, { earning_amt: e.target.value })}
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

export default MonthlyEarningsModal;

