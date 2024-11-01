import './App.css';
import 'bootstrap';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react'; 
import { Contact } from './views/Contact';
import { Cart } from './views/Cart';
import CheckOut from './views/CheckOut';
import SupplierList from './components/SupplierList/SupplierList';
import SalesReport from './components/SalesReport/SalesReport';
import PurchaseReport from './components/PurchaseReport/PurchaseReport';
import ProductList from './components/ProductList/ProductList';
import ClienteList from './components/ClientesList/ClientesList';
import { Auth } from './components/Login/Auth';
import { Protected } from './components/Login/Protected';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<ItemListContainer greeting={"Bienvenidos"} />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/purchase-report" element={<PurchaseReport />} />
        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <Protected />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>

      <footer className="my-xxl-5 justify-content-end">
        <Link to="/">
          <button className="btn btn-outline-success">🏠 HOME</button>
        </Link>
      </footer>
    </div>
  );
}

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('firebaseToken');

    if (!token) {
      navigate(redirectPath); 
    }
  }, [navigate, redirectPath]);

  return children;
};

export default App;
