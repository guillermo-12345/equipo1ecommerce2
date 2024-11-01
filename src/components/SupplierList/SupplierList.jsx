import React, { useEffect, useState } from 'react';
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../../asyncMock';
import SupplierForm from '../SupplierForm/SupplierForm';
import Button from 'react-bootstrap/esm/Button';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editSupplier, setEditSupplier] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSuppliers()
      .then((data) => {
        setSuppliers(data);
      })
      .catch((error) => {
        console.error('Error fetching suppliers:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getSuppliers]);

  const handleAddSupplier = (supplier) => {
    setLoading(true);
    addSupplier(supplier)
      .then((newSupplier) => {
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateSupplier = (id, updatedSupplier) => {
    setLoading(true);
    updateSupplier(id, updatedSupplier)
      .then(() => {
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier
          )
        );
      })
      .finally(() => {
        setLoading(false);
        setEditSupplier(null);
      });
  };

  const handleDeleteSupplier = (id) => {
    setLoading(true);
    deleteSupplier(id)
      .then(() => {
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.id !== id)
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
      <h1>Lista de Proveedores</h1>

      {suppliers.map((supplier) => (
        <div key={supplier.id}>
          <p>Nombre: {supplier.name}</p>
          <p>Teléfono: {supplier.phone}</p>
          <p>Email: {supplier.email}</p>
          <p>Categoría: {supplier.category}</p>
          <Button className='mx-2' onClick={() => setEditSupplier(supplier)}>Editar</Button>
          <Button onClick={() => handleDeleteSupplier(supplier.id)}>Eliminar</Button>
          <hr />
        </div>
      ))}
      {editSupplier && (
        <SupplierForm
          initialData={editSupplier}
          onSave={(updatedSupplier) => handleUpdateSupplier(editSupplier.id, updatedSupplier)}
        />
      )}
      <SupplierForm onSave={handleAddSupplier} />
    </div>
  );
};

export default SupplierList;