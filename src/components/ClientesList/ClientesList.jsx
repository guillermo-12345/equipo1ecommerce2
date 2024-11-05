// ClienteList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ClientesForm from '../ClientesForm/ClientesForm';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleAddCliente = async (cliente) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/clientes', cliente);
      setClientes((prevClientes) => [...prevClientes, response.data]);
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCliente = async (id, updatedCliente) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/clientes/${id}`, updatedCliente);
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === id ? { ...cliente, ...updatedCliente } : cliente
        )
      );
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
      await axios.delete(`http://localhost:3000/api/clientes/${id}`);
      setClientes((prevClientes) =>
        prevClientes.filter((cliente) => cliente.id !== id)
      );
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
