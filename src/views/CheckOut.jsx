import "../App.css";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";
import axios from "axios"; // Usando axios para comunicación con el backend
import { useAuth } from "../context/AuthContext";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { cart, total, clearCart } = useContext(CartContext);
  const { user } = useAuth();

  const createOrder = async () => {
    if (!user) {
      alert("Debe iniciar sesión para completar la compra.");
      return;
    }

    setLoading(true);

    try {
      // Construir el objeto de orden para Datastore
      const objOrder = {
        buyer: {
          uid: user.uid,
          email: user.email,
        },
        items: cart,
        total: total,
        date: new Date().toISOString(),
      };

      // Llamada a tu backend para crear la orden en Datastore
      const response = await axios.post("http://localhost:3001/api/ordenes", objOrder);
      setOrderId(response.data.id); // Asegúrate de que el backend devuelva el ID de la orden creada

      // Actualizar el stock de cada producto
      for (let item of cart) {
        await axios.post(`http://localhost:3001/api/products/${item.id}/decrementStock`, {
          quantity: item.quantity
        });
      }

      // Limpiar el carrito después de procesar la compra
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden o actualizar el stock:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de proceder.");
    }
  }, [cart]);

  if (loading) {
    return <h1>Se está generando su orden...</h1>;
  }

  if (orderId) {
    return <h1>El ID de su orden es: {orderId}</h1>;
  }

  return (
    <div>
      <h3>Resumen de tu compra</h3>
      {cart.map(({ id, img, title, price, quantity }) => (
        <div key={id}>
          <p className="text-uppercase fw-bolder" id="itemName">
            {title}
          </p>
          <p>Precio Unitario: ${price}</p>
          <p>
            <img width={"80px"} src={img} alt="" />
          </p>
          <p>Cantidad: {quantity}</p>
        </div>
      ))}
      <h4>Total a pagar: ${total}</h4>
      <button onClick={createOrder} className="btn btn-primary">
        Confirmar Compra
      </button>
    </div>
  );
};

export default CheckOut;
