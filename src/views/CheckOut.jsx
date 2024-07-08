import "../App.css";
import { useState, useContext } from "react";
import { CartContext } from "../context/cartContext";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const { cart, total, clearCart } = useContext(CartContext);

  const createOrder = ({ name, phone, email }) => {
    setLoading(true);

    try {
      const objOrder = {
        buyer: {
          name,
          phone,
          email,
        },
        items: cart,
        total: total,
        date: new Date().toISOString(),
      };

      // Simulate the order ID generation
      const orderId = `order_${new Date().getTime()}`;
      setOrderId(orderId);

      // Save order to local storage
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push({ ...objOrder, id: orderId });
      localStorage.setItem('orders', JSON.stringify(orders));

      clearCart();
    } catch (error) {
      console.log(error);
      // TODO: Handle error and return feedback to the user
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (loading) {
    return <h1>Se está generando su orden...</h1>;
  }

  if (orderId) {
    return <h1>El ID de su orden es: {orderId}</h1>;
  }

  return (
    <div>
      <div className="">
        <h3>Resumen de tu compra</h3>
        {cart.map(({ id, img, title, price, quantity }) => (
          <div key={id}>
            <p className=" text-uppercase fw-bolder" id="itemName">
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
      </div>
      <h3>Checkout</h3>
      <CheckoutForm
        onConfirm={createOrder}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default CheckOut;
