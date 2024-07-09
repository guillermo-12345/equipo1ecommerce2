/* import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useNavigate } from 'react-router-dom';  */
function ItemForm() {
/*     const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const img = 'https://via.placeholder.com/150';

    const navigate = useNavigate();

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleStockChange = (e) => setStock(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            title,
            category,
            price,
            stock,
            description,
            img
        };
        console.log(newItem);
        navigate('/item/:id');
    }

    return (
        <Form className='container' onSubmit={handleSubmit}>
            <Row className='justify-content-end col-12'>
                <FormGroup className='col-6'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={title} onChange={handleTitleChange} />
                </FormGroup>
                <FormGroup className='col-6'>
                    <Form.Label>Categoría</Form.Label>
                    <FormSelect value={category} onChange={handleCategoryChange}   >
                        <option value="">Seleccionar categoría</option>
                        <option value="Notebook">Notebook</option>
                        <option value="Celular">Celular</option>
                        <option value="Tablet">Tablet</option>
                    </FormSelect>
                </FormGroup>
            </Row>
            <Row className='justify-content-center'>
                <FormGroup className='col-8'>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control value={description} onChange={handleDescriptionChange} />
                    </FormGroup>
            </Row>
            <Row className='justify-content-center my-3'>
                <FormGroup className='col-4'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" value={stock} onChange={handleStockChange} />
                    </FormGroup>
                <FormGroup className='col-4'>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" value={price} onChange={handlePriceChange} />
                </FormGroup>
            </Row>
            <Button type="submit">Agregar Producto</Button>
        </Form>
    );*/
} 

export default ItemForm;