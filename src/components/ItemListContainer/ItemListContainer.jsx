import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      const productsInStock = response.data.filter(product => product.stock > 0);
      setProducts(productsInStock);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{greeting}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;

