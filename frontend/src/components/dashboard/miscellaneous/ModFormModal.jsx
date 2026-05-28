import React from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';


const ModFormModal = ({ show, handleClose, name, desc, handleNameChange, 
    handleDescChange, handleSubmit, nameError, descError, loading, error }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add new mod</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? <Alert variant="danger">
          {error}
        </Alert> : null}
        <Form>
          <Form.Group className="mb-3" controlId="modForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg: Edu"
              value={name}
              onChange={handleNameChange}
            />
            <small style={{ color: "red" }}>{nameError}</small>
          </Form.Group>
          <Form.Group className="mb-3" controlId="modForm.desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              placeholder='Eg: For educational and learning purpose'
              onChange={handleDescChange}
            />
            <small style={{ color: "red" }}>{descError}</small>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="success" onClick={handleSubmit} disabled={loading}>{loading ? "Please wait" : "Submit"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModFormModal;
