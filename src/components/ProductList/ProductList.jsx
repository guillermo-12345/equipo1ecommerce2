import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import ProductForm from '../ProductForm/ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/productos')
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    setLoading(true);
    axios.delete(`/api/productos/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditProduct(productToEdit);
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setLoading(true);
    axios.put(`/api/productos/${id}`, updatedProduct)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      })
      .finally(() => {
        setLoading(false);
        setEditProduct(null);
      });
  };


  const handleAddProduct = (newProduct) => {
    setLoading(true);
    axios.post('/api/productos', newProduct)
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, response.data]);
      })
      .catch((error) => {
        console.error('Error al agregar el producto:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>
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
      {editProduct && (
        <ProductForm
          initialData={editProduct}
          onSave={(updatedProduct) => handleUpdateProduct(editProduct.id, updatedProduct)}
        />
      )}
      <ProductForm onSave={handleAddProduct} />
    </div>
  );
};

export default ProductList;
