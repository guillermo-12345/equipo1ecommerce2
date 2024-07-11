import React, { useEffect, useState } from 'react';
import { getClientes, addClientes, updateClientes, deleteClientes } from '../../asyncMock';
import ClientesForm from '../ClientesForm/ClientesForm';
import Button from 'react-bootstrap/Button';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState(null);

  useEffect(() => {
    setLoading(true);
    getClientes()
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddCliente = (cliente) => {
    setLoading(true);
    addClientes(cliente)
      .then((newCliente) => {
        setClientes((prevClientes) => [...prevClientes, newCliente]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateCliente = (id, updatedCliente) => {
    setLoading(true);
    updateClientes(id, updatedCliente)
      .then(() => {
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === id ? { ...cliente, ...updatedCliente } : cliente
          )
        );
      })
      .finally(() => {
        setLoading(false);
        setEditCliente(null);
      });
  };

  const handleDeleteCliente = (id) => {
    setLoading(true);
    deleteClientes(id)
      .then(() => {
        setClientes((prevClientes) =>
          prevClientes.filter((cliente) => cliente.id !== id)
        );
      })
      .finally(() => {
        setLoading(false);
      });
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
