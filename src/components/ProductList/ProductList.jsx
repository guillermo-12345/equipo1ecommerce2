import React, { useEffect, useState } from 'react';
import { getProduct, deleteProduct, updateProduct, addProduct } from '../../asyncMock';
import Item from '../Item/Item';
import ProductForm from '../ProductForm/ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProduct()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    setLoading(true);
    deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
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
    updateProduct(id, updatedProduct)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .finally(() => {
        setLoading(false);
        setEditProduct(null);
      });
  };

  const handleAddProduct = (newProduct) => {
    setLoading(true);
    addProduct(newProduct)
      .then((addedProduct) => {
        setProducts((prevProducts) => [...prevProducts, addedProduct]);
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
        {products.map((product) => (
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
        ))}
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
