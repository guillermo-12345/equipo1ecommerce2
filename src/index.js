import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import { initializeApp } from "firebase/app";

import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext';

window.localStorage.removeItem('orders'); 
const firebaseConfig = {
  apiKey: "AIzaSyCfAJnhRLGif5Rw537AQmounfGVi0cST10",
  authDomain: "equipo1-ecommerce.firebaseapp.com",
  projectId: "equipo1-ecommerce",
  storageBucket: "equipo1-ecommerce.appspot.com",
  messagingSenderId: "66738131494",
  appId: "1:66738131494:web:e199a3bbf8ca100a010ce7",
  measurementId: "G-3B4BKNN2L6"
};
var admin = require("firebase-admin");

var serviceAccount = require("equipo1-ecommerce-firebase-adminsdk-shdvj-444ab7c9db.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

initializeApp(firebaseConfig);
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
