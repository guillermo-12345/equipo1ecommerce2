import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormSelect from 'react-bootstrap/FormSelect';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const SupplierForm = ({ initialData = null, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPhone(initialData.phone || '');
      setEmail(initialData.email || '');
      setCategory(initialData.category || '');
    } else {
      // Limpiar los campos si initialData no está presente
      setName('');
      setPhone('');
      setEmail('');
      setCategory('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, phone, email, category });
    setName('');
    setPhone('');
    setEmail('');
    setCategory('');
  };

  const handleCancel = () => {
    setName('');
    setPhone('');
    setEmail('');
    setCategory('');
    if (onCancel) onCancel();
  };

  return (
    <div> 
      <h3>{initialData ? 'Editar Proveedor' : 'Agregar Proveedor'}</h3>
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

          <Form.Group className="mb-3 col-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type='text'
              placeholder='11 #### ####'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete='tel'
              required
            />
          </Form.Group>
        </Row>

        <Row className='justify-content-center'>
          <Form.Group className="mb-3 col-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='email'
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategory" className="mb-3 col-4">
            <Form.Label>Categoría</Form.Label>
            <FormSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete='category'
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Notebook">Notebook</option>
              <option value="Celular">Celular</option>
              <option value="Tablet">Tablet</option>
            </FormSelect>
          </Form.Group>
        </Row>

        <Button className='btn-success' type="submit">Guardar</Button>
        {initialData && (
          <Button className='btn-danger mx-2' onClick={handleCancel}>Cancelar</Button>
        )}
      </Form>
    </div>
  );
};

export default SupplierForm;
