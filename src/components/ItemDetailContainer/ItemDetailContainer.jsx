import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail'; // Asegúrate de que la ruta sea correcta

const ItemDetailContainer = () => {
  const { id } = useParams(); // Obtener el ID del producto desde los parámetros de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/products/${id}`); // Asegúrate de que esta URL sea correcta
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="ItemDetailContainer">
      {loading ? (
        <p>Cargando información del producto...</p>
      ) : error ? (
        <p>Error al obtener la información del producto: {error.message}</p>
      ) : product ? (
        <ItemDetail {...product} />
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;