import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import DismissableAlert from '../../../components/dashboard/miscellaneous/DismissableAlert';
import TextInput from '../../../components/form/TextInput';
import CustomDropdown from '../../../components/form/CustomDropdown ';

import { createEarning, updateEarning } from '../../../features/earningSlice';

import '../style.scss';

const MasterEarningModal = ({ show, handleClose, data }) => {
  const dispatch = useDispatch();
  const { loading, earningSuccess, error } = useSelector((store) => store.earning || {});

  const deductionTypeOptions = useMemo(
    () => [
      { id: 'Master', name: 'Master' },
      { id: 'Monthly', name: 'Monthly' },
    ],
    []
  );

  const [formData, setFormData] = useState({
    code: '',
    acc_code: '',
    name: '',
    type: 'Master',
    effect_pf: false,
    effect_csi: false,
    id: '',
  });

  useEffect(() => {
    if (!data) {
      setFormData({
        code: '',
        acc_code: '',
        name: '',
        type: 'Master',
        effect_pf: false,
        effect_csi: false,
        id: '',
      });
      return;
    }

    setFormData({
      code: data.code || '',
      acc_code: data.acc_code || '',
      name: data.name || '',
      type: data.type || 'Master',
      effect_pf: !!data.effect_pf,
      effect_csi: !!data.effect_csi,
      id: data.id,
    });
  }, [data]);

  useEffect(() => {
    if (earningSuccess) handleClose();
  }, [earningSuccess, handleClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: formData.id,
      code: formData.code,
      acc_code: formData.acc_code,
      name: formData.name,
      type: formData.type,
      effect_pf: formData.effect_pf,
      effect_csi: formData.effect_csi,
    };

    if (formData.id) {
      dispatch(updateEarning(payload));
    } else {
      dispatch(createEarning(payload));
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? 'Edit Earning' : 'Add Earning'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error ? <DismissableAlert variant="danger" title="Error" msg={error} /> : null}

        <form onSubmit={handleSubmit}>
          <div className="row border-box">
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Account Code"
                type="text"
                name="acc_code"
                value={formData.acc_code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 col-lg-4">
              <TextInput
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 col-lg-6">
              <CustomDropdown
                label="Type"
                name="type"
                options={deductionTypeOptions}
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                required
              />
            </div>

            <div className="col-md-3 col-lg-3 d-flex align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="effect_pf"
                  id="effectPf"
                  checked={formData.effect_pf}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="effectPf">
                  Effect PF
                </label>
              </div>
            </div>

            <div className="col-md-3 col-lg-3 d-flex align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="effect_csi"
                  id="effectCsi"
                  checked={formData.effect_csi}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="effectCsi">
                  Effect CSI
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" type="button" onClick={handleClose} disabled={loading ? true : false}>
              Cancel
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

