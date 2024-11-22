import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../components/service/firebaseConfig';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const firebaseToken = await currentUser.getIdToken();
        localStorage.setItem('firebaseToken', firebaseToken);
        await fetchUserRole(firebaseToken);
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('firebaseToken');
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (firebaseToken) => {
    try {
      const response = await axios.get('http://localhost:3001/auth/user', {
        headers: {
          Authorization: `Bearer ${firebaseToken}`
        }
      });
      setUserRole(response.data.userRole);
      console.log("Rol del usuario recibido en el frontend:", response.data.userRole); 
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      logout();
    }
  };
  
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();
  
      console.log("Token de Firebase generado:", firebaseToken);
  
      const response = await axios.post('http://localhost:3001/auth/login', { firebaseToken });
      
      console.log("Respuesta del backend:", response.data); 
      setUserRole(response.data.userRole);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('firebaseToken'); // Limpia el token almacenado
      localStorage.removeItem('userSession'); // Limpia cualquier dato adicional
      sessionStorage.clear(); // Limpia sessionStorage si es necesario
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, userRole, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
