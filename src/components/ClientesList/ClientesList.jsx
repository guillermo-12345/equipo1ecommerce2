import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ClientesForm from '../ClientesForm/ClientesForm';
import { useAuth } from '../../context/AuthContext'; 

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState(null);
  const { user } = useAuth(); // Cambiamos currentUser a user para que coincida con el contexto

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        if (user) { // Verificamos si el usuario está autenticado
          const token = await user.getIdToken(); // Obtenemos el token del usuario autenticado
          const response = await axios.get('http://localhost:3001/api/clientes', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setClientes(response.data);
        } else {
          console.error("Usuario no autenticado");
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [user]); // Dependemos de user en lugar de currentUser

  const handleAddCliente = async (cliente) => {
    setLoading(true);
    try {
      if (user) {
        const token = await user.getIdToken();
        const response = await axios.post('http://localhost:3001/api/clientes', cliente, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes((prevClientes) => [...prevClientes, response.data]);
      }
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCliente = async (id, updatedCliente) => {
    setLoading(true);
    try {
      if (user) {
        const token = await user.getIdToken();
        await axios.put(`http://localhost:3001/api/clientes/${id}`, updatedCliente, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === id ? { ...cliente, ...updatedCliente } : cliente
          )
        );
      }
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setLoading(false);
      setEditCliente(null);
    }
  };

  const handleDeleteCliente = async (id) => {
    setLoading(true);
    try {
      if (user) {
        const token = await user.getIdToken();
        await axios.delete(`http://localhost:3001/api/clientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes((prevClientes) =>
          prevClientes.filter((cliente) => cliente.id !== id)
        );
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista de Clientes</h1>

      {clientes.map((cliente) => (
        <div key={cliente.id}>
          <p>Nombre: {cliente.name}</p>
          <p>CUIT: {cliente.cuit}</p>
          <p>Email: {cliente.email}</p>
          <Button className='mx-2' onClick={() => setEditCliente(cliente)}>Editar</Button>
          <Button onClick={() => handleDeleteCliente(cliente.id)}>Eliminar</Button>
          <hr />
        </div>
      ))}
      {editCliente && (
        <ClientesForm
          initialData={editCliente}
          onSave={(updatedCliente) => handleUpdateCliente(editCliente.id, updatedCliente)}
        />
      )}
      <ClientesForm onSave={handleAddCliente} />
    </div>
  );
};

export default ClienteList;
