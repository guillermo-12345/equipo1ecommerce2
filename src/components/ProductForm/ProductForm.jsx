import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ProductForm = ({ initialData = {}, onSave, onCancel }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    purchase_price: 0,
    category: '',
    supplier_id: '',
    img: ''
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setProductData({
        name: initialData.name || '',
        description: initialData.description || '',
        stock: initialData.stock || 0,
        price: initialData.price || 0,
        purchase_price: initialData.purchase_price || 0,
        category: initialData.category || '',
        supplier_id: initialData.supplier_id || '',
        img: initialData.img || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(productData);
    resetForm();
  };

  const resetForm = () => {
    setProductData({
      name: '',
      description: '',
      stock: 0,
      price: 0,
      purchase_price: 0,
      category: '',
      supplier_id: '',
      img: ''
    });
    if (typeof onCancel === 'function') {
      onCancel(); // Llama a la función onCancel para ocultar el formulario
    }
  };

  return (
    <Form className='my-3' onSubmit={handleSubmit}>
      <Row className='justify-content-center'>
        <Form.Group className="mb-3 col-4">
          <Form.Label htmlFor="product-name">Nombre</Form.Label>
          <Form.Control
            type='text'
            id="product-name"
            name="name"
            placeholder='Nombre'
            value={productData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 col-4">
          <Form.Label htmlFor="product-description">Descripción</Form.Label>
          <Form.Control
            type='text'
            id="product-description"
            name="description"
            placeholder='Descripción'
            value={productData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-2">
          <Form.Label htmlFor="product-stock">Stock</Form.Label>
          <Form.Control
            type='number'
            id="product-stock"
            name="stock"
            placeholder='Stock'
            value={productData.stock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-2">
          <Form.Label htmlFor="product-price">Precio</Form.Label>
          <Form.Control
            type='number'
            id="product-price"
            name="price"
            placeholder='Precio'
            value={productData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-4">
          <Form.Label htmlFor="product-img">Imagen (URL)</Form.Label>
          <Form.Control
            type='text'
            id="product-img"
            name="img"
            placeholder='URL de la imagen'
            value={productData.img}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-3">
          <Form.Label htmlFor="product-purchase_price">Precio de Compra</Form.Label>
          <Form.Control
            type='number'
            id="product-purchase_price"
            name="purchase_price"
            placeholder='Precio de compra'
            value={productData.purchase_price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-3">
          <Form.Label htmlFor="product-category">Categoría</Form.Label>
          <Form.Control
            type='text'
            id="product-category"
            name="category"
            placeholder='Categoría'
            value={productData.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-4">
          <Form.Label htmlFor="product-supplier_id">ID del Proveedor</Form.Label>
          <Form.Control
            type='text'
            id="product-supplier_id"
            name="supplier_id"
            placeholder='ID del proveedor'
            value={productData.supplier_id}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button className='btn btn-success mr-2' type="submit">
            {initialData.id ? 'Actualizar Producto' : 'Agregar Producto'}
          </Button>
          {initialData.id && (
            <Button className='btn btn-danger' onClick={resetForm} type="button">
              Cancelar
            </Button>
          )}
        </div>
      </Row>
    </Form>
  );
};

export default ProductForm;
