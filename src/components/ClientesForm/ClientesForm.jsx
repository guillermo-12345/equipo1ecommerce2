import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ClienteForm = ({ initialData = {}, onSave }) => {
  const [name, setName] = useState('');
  const [cuit, setCuit] = useState('');

  useEffect(() => {
    setName(initialData.name || '');
    setCuit(initialData.cuit || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, cuit });
    setName('');
    setCuit('');
  };

  return (
    <div>
      <h3>{initialData.id ? 'Editar Cliente' : 'Agregar Cliente'}</h3>
      <Form className='my-3' onSubmit={handleSubmit}>
        <Row className='justify-content-center'>
          <Form.Group className="mb-3 col-4">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete='name'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 col-4">
            <Form.Label>CUIT</Form.Label>
            <Form.Control
              type='text'
              placeholder='CUIT'
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              autoComplete='cuit'
              required
            />
          </Form.Group>
        </Row>
        <Button className='btn-success' type="submit">Guardar</Button>
      </Form>
    </div>
  );
};

export default ClienteForm;
