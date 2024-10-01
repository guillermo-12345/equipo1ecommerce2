import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ClienteForm = ({ initialData = {}, onSave }) => {
  const [name, setName] = useState('');
  const [cuit, setCuit] = useState('');
  const [email, setEmail] = useState(''); 
  useEffect(() => {
    setName(initialData.name || '');
    setCuit(initialData.cuit || '');
    setEmail(initialData.email || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, cuit, email }); 
    setName('');
    setCuit('');
    setEmail(''); 
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCuitChange = (e) => {
    setCuit(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
              value={name}
              onChange={handleNameChange}
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
              value={cuit}
              onChange={handleCuitChange}
              autoComplete='cuit'
              required
            />
          </Form.Group>

          {/* Campo para email */}
          <Form.Group className="mb-3 col-4">
            <Form.Label htmlFor="cliente-email">Email</Form.Label>
            <Form.Control
              type='email'
              id="cliente-email"   
              name="email"         
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
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
