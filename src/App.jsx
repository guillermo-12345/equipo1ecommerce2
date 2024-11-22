import './App.css';
import 'bootstrap';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Contact } from './views/Contact';
import { Cart } from './views/Cart';
import CheckOut from './views/CheckOut';
import SupplierList from './components/SupplierList/SupplierList';
import SalesReport from './components/SalesReport/SalesReport';
import PurchaseReport from './components/PurchaseReport/PurchaseReport';
import ProductList from './components/ProductList/ProductList';
import ClienteList from './components/ClientesList/ClientesList';
import Auth from './components/Login/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (userRole) {
      console.log("Rol del usuario en el frontend:", userRole);
    }
  }, [userRole]);

  return (
    <div className="App">
      <AuthProvider>
        <NavBar userRole={userRole} />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting={"Bienvenidos"} />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/products/:itemId" element={<ItemDetailContainer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/auth/login" element={<Auth setUserRole={setUserRole} />} />

          {/* Rutas protegidas */}
          <Route path="/clientes" element={<ProtectedRoute userRole={userRole} requiredRole="admin" redirectPath="/auth/login"><ClienteList /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute userRole={userRole} requiredRole="admin" redirectPath="/auth/login"><SupplierList /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute userRole={userRole} requiredRole="admin" redirectPath="/auth/login"><ProductList /></ProtectedRoute>} />
          <Route path="/sales-report" element={<ProtectedRoute userRole={userRole} requiredRole="admin" redirectPath="/auth/login"><SalesReport /></ProtectedRoute>} />
          <Route path="/purchase-report" element={<ProtectedRoute userRole={userRole} requiredRole="admin" redirectPath="/auth/login"><PurchaseReport /></ProtectedRoute>} />

          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </AuthProvider>
      <footer className="my-xxl-5 justify-content-end">
        <Link to="/">
          <button className="btn btn-outline-success">🏠 HOME</button>
        </Link>
      </footer>
    </div>
  );
}

const ProtectedRoute = ({ userRole, requiredRole = "user", redirectPath = "/", children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Verificando rol del usuario en ProtectedRoute:", userRole); 
    const token = localStorage.getItem('firebaseToken');

    if (!token || (userRole && userRole !== requiredRole)) {
      console.log("Redirigiendo a:", redirectPath); 
      navigate(redirectPath);
    }
  }, [navigate, redirectPath, userRole, requiredRole]);

  return children;
};

export default App;
