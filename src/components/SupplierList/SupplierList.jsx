import React, { useEffect, useState } from 'react';
import axios from '../service/axiosConfig';
import SupplierForm from '../SupplierForm/SupplierForm';
import Button from 'react-bootstrap/Button';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editSupplier, setEditSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/proveedores');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async (supplier) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/proveedores', supplier);
      setSuppliers((prevSuppliers) => [...prevSuppliers, response.data]);
    } catch (error) {
      console.error('Error adding supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSupplier = async (id, updatedSupplier) => {
    try {
      setLoading(true);
      await axios.put(`/api/proveedores/${id}`, updatedSupplier);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier
        )
      );
      setEditSupplier(null);
    } catch (error) {
      console.error('Error updating supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/proveedores/${id}`);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier.id !== id)
      );
    } catch (error) {
      console.error('Error deleting supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Lista de Proveedores</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        suppliers.map((supplier) => (
          <div key={supplier.id}>
            <p>Nombre: {supplier.name}</p>
            <p>Teléfono: {supplier.phone}</p>
            <p>Email: {supplier.email}</p>
            <p>Categoría: {supplier.category}</p>
            <Button className='mx-2' onClick={() => setEditSupplier(supplier)}>Editar</Button>
            <Button onClick={() => handleDeleteSupplier(supplier.id)}>Eliminar</Button>
            <hr />
          </div>
        ))
      )}
      {editSupplier && (
        <SupplierForm
          initialData={editSupplier}
          onSave={(updatedSupplier) => handleUpdateSupplier(editSupplier.id, updatedSupplier)}
          onCancel={() => setEditSupplier(null)}
        />
      )}
      <SupplierForm onSave={handleAddSupplier} />
    </div>
  );
};

export default SupplierList;
