import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext';

window.localStorage.removeItem('orders'); 

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <CartProvider>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </CartProvider>
);


reportWebVitals();
