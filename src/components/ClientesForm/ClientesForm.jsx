import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ClienteForm = ({ initialData = {}, onSave }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    cuit: initialData.cuit || '',
    email: initialData.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', cuit: '', email: '' }); // Limpiar los campos después de guardar
  };

  return (
    <div>
      <h3>{initialData.id ? 'Editar Cliente' : 'Agregar Cliente'}</h3>
      <Form className='my-3' onSubmit={handleSubmit}>
        <Row className='justify-content-center'>
          <Form.Group className="mb-3 col-4">
            <Form.Label htmlFor="cliente-name">Nombre</Form.Label>
            <Form.Control
              type='text'
              id="cliente-name"
              name="name"
              placeholder='Nombre'
              value={formData.name}
              onChange={handleChange}
              autoComplete='name'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 col-4">
            <Form.Label htmlFor="cliente-cuit">CUIT</Form.Label>
            <Form.Control
              type='text'
              id="cliente-cuit"
              name="cuit"
              placeholder='CUIT'
              value={formData.cuit}
              onChange={handleChange}
              autoComplete='cuit'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 col-4">
            <Form.Label htmlFor="cliente-email">Email</Form.Label>
            <Form.Control
              type='email'
              id="cliente-email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              autoComplete='email'
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
