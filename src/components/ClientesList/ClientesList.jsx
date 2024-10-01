/* import React, { useEffect, useState } from 'react';
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
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import ClientesForm from '../ClientesForm/ClientesForm';
import Button from 'react-bootstrap/Button';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState(null);
  
  const db = getFirestore();

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const clientList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClientes(clientList);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [db]);

  const handleAddCliente = async (cliente) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "clientes"), cliente);
      setClientes((prevClientes) => [...prevClientes, { id: docRef.id, ...cliente }]);
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCliente = async (id, updatedCliente) => {
    setLoading(true);
    try {
      const clientDoc = doc(db, "clientes", id);
      await updateDoc(clientDoc, updatedCliente);
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
      const clientDoc = doc(db, "clientes", id);
      await deleteDoc(clientDoc);
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

export default ClienteList;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ClientesForm from '../ClientesForm/ClientesForm';
import Button from 'react-bootstrap/Button';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState(null);

 
  useEffect(() => {
    setLoading(true);
    axios.get('/api/clientes')  
      .then((response) => {
        setClientes(response.data); 
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
    axios.post('/api/clientes', cliente) 
      .then((response) => {
        setClientes((prevClientes) => [...prevClientes, response.data]); 
      })
      .catch((error) => {
        console.error('Error adding client:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateCliente = (id, updatedCliente) => {
    setLoading(true);
    axios.put(`/api/clientes/${id}`, updatedCliente) 
      .then(() => {
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === id ? { ...cliente, ...updatedCliente } : cliente
          )
        );
      })
      .catch((error) => {
        console.error('Error updating client:', error);
      })
      .finally(() => {
        setLoading(false);
        setEditCliente(null);
      });
  };

  const handleDeleteCliente = (id) => {
    setLoading(true);
    axios.delete(`/api/clientes/${id}`) 
      .then(() => {
        setClientes((prevClientes) =>
          prevClientes.filter((cliente) => cliente.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting client:', error);
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
