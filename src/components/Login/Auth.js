import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../service/firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Auth = () => {
  const { setUser, setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();

      const response = await axios.post('http://localhost:3001/auth/login', { firebaseToken });

      setUser(result.user);
      setUserRole(response.data.userRole);

      navigate('/');
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="login-container">
      <button onClick={handleGoogleLogin} className="btn btn-primary">Iniciar sesión con Google</button>
    </div>
  );
};

export default Auth;
