import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../components/service/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRole = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get('http://localhost:3001/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prev) => ({ ...prev, role: response.data.role }));
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      setError(error);
    }
  };
  

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await axios.post('http://localhost:3001/auth/login', { firebaseToken: token });
      fetchUserRole();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      setError(error);
    }
  };

  const logout = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post('http://localhost:3001/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchUserRole();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};