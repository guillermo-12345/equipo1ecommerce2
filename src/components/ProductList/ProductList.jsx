import React, { useEffect, useState } from 'react';
import axios from '../service/axiosConfig';
import Item from '../Item/Item';
import ProductForm from '../ProductForm/ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/productos');
      console.log("Productos obtenidos:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      console.log('Intentando eliminar producto con ID:', id);
      await axios.delete(`/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditProduct(productToEdit);
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      setLoading(true);
      await axios.put(`/api/products/${id}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product))
      );
      setEditProduct(null);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/products', newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditProduct(null); // Oculta el formulario de edición
  };

  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-around">
          {products.length > 0 ? (
            products.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                title={product.title}
                img={product.img}
                price={product.price}
                purchasePrice={product.purchasePrice}
                description={product.description}
                showEditButton={true}
                showDeleteButton={true}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                className="product-item"
              />
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}
      {editProduct && (
        <ProductForm
          initialData={editProduct}
          onSave={(updatedProduct) => handleUpdateProduct(editProduct.id, updatedProduct)}
          onCancel={handleCancelEdit} // Pasa la función para cancelar
        />
      )}
      <ProductForm onSave={handleAddProduct} />
    </div>
  );
};

export default ProductList;
