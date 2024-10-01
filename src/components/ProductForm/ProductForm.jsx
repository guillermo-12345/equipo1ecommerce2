import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormGroup from 'react-bootstrap/FormGroup';
import axios from 'axios';

const ProductForm = () => {
    const { itemId } = useParams(); 
    const [product, setProduct] = useState({
        title: '',
        description: '',
        stock: 0,
        price: 0,
        img: ''  
    });
    const navigate = useNavigate();
    const isEditMode = Boolean(itemId); 

    useEffect(() => {
        if (isEditMode) {
            
            axios.get(`/products/${itemId}`)
                .then((response) => setProduct(response.data))
                .catch((error) => console.error("Error fetching product:", error));
        }
    }, [itemId, isEditMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
           
            axios.put(`/products/${itemId}`, product)
                .then(() => {
                    alert("Producto actualizado con éxito");
                    navigate('/products'); 
                })
                .catch((error) => console.error("Error updating product:", error));
        } else {
           
            axios.post(`/products`, product)
                .then(() => {
                    alert("Producto agregado con éxito");
                    navigate('/products'); 
                })
                .catch((error) => console.error("Error adding product:", error));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    if (isEditMode && !product) {
        return <div>Loading...</div>;
    }

    return (
        <Form className='container' onSubmit={handleSubmit}>
            <Row className='justify-content-center col-12'>
                <FormGroup className='col-6'>
                    <Form.Label htmlFor="title">Nombre</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={product.title} 
                        onChange={handleChange} 
                    />
                </FormGroup>
            </Row>
            <Row className='justify-content-center'>
                <FormGroup className='col-8'>
                    <Form.Label htmlFor="description">Descripción</Form.Label>
                    <Form.Control 
                        type='text' 
                        id="description" 
                        name="description" 
                        value={product.description} 
                        onChange={handleChange} 
                    />
                </FormGroup>
            </Row>
            <Row className='justify-content-center my-3'>
                <FormGroup className='col-4'>
                    <Form.Label htmlFor="stock">Stock</Form.Label>
                    <Form.Control 
                        type="number" 
                        id="stock" 
                        name="stock" 
                        value={product.stock} 
                        onChange={handleChange} 
                    />
                </FormGroup>
                <FormGroup className='col-4'>
                    <Form.Label htmlFor="price">Precio</Form.Label>
                    <Form.Control 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                    />
                </FormGroup>
            </Row>
            <Row className='justify-content-center'>
                <FormGroup className='col-8'>
                    <Form.Label htmlFor="img">Imagen (URL)</Form.Label>
                    <Form.Control 
                        type='text' 
                        id="img" 
                        name="img" 
                        value={product.img} 
                        onChange={handleChange} 
                    />
                </FormGroup>
            </Row>
            <Button type="submit">
                {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
            </Button>
        </Form>
    );
};

export default ProductForm;
