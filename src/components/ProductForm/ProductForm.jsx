import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ProductForm = ({ initialData = {}, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    setTitle(initialData.title || '');
    setDescription(initialData.description || '');
    setPrice(initialData.price || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, price });
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <div>
      <h3>{initialData.id ? 'Editar Producto' : 'Agregar Producto'}</h3>
      <Form className='my-3' onSubmit={handleSubmit}>
        <Row className='justify-content-center'>
          <Form.Group className="mb-3 col-4">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre del producto'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete='name'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 col-4">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type='text'
              placeholder='Descripción del producto'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete='description'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 col-4">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type='number'
              placeholder='Precio del producto'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              autoComplete='price'
              required
            />
          </Form.Group>
        </Row>

        <Button className='btn-success' type="submit">Guardar</Button>
      </Form>
    </div>
  );
};

export default ProductForm;
