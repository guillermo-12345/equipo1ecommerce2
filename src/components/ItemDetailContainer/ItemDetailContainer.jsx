import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import axios from "../service/axiosConfig";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/products/${itemId}`);
                setProduct(response.data);
                console.log("Product data:", response.data);
                
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (itemId) {
            fetchProduct();
        }
    }, [itemId]);

    return (
        <div className="ItemDetailContainer">
            {loading ? (
                <p>Cargando información del producto...</p>
            ) : product ? (
                <ItemDetail {...product} />
            ) : (
                <p>Producto no encontrado.</p>
            )}
        </div>
    );
};

export default ItemDetailContainer;
