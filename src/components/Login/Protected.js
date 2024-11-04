import React, { useState, useEffect, useRef } from 'react';
import { collection, query, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';


const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const emptyProduct = {
    id: '',
    name: '',
    description: '',
    price: 0,
  };

  const fetchProductos = async () => {
    setLoading(true);
    const productsQuery = query(collection(db, 'productos'));
    const productsSnapshot = await getDocs(productsQuery);

    const prodList = productsSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    setProducts(prodList);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);
    setLoading(true);
    setProductDialog(false);
    if (!product.id) {
      await addDoc(collection(db, 'productos'), product);
    } else {
      await updateDoc(doc(db, 'productos', product.id), product);
    }

    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    setLoading(false);
    fetchProductos();
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    setLoading(true);
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);

    await deleteDoc(doc(db, 'productos', product.id));

    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    setLoading(false);
    fetchProductos();
  };

  const findIndexById = (id) => {
    return products.findIndex(product => product.id === id);
  };

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  };

  const onCategoryChange = (e) => {
    // handle category change
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
          <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="description" header="Description" sortable></Column>
          <Column field="price" header="Price" body={(rowData) => formatCurrency(rowData.price)} sortable></Column>
          <Column body={(rowData) => (
            <div>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
          )}></Column>
        </DataTable>
        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
      </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={<>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
      </>} onHide={hideDialog}>
        {productDialog && (
          <div className="p-field">
            <label htmlFor="name">Nombre del Producto</label>
            <InputText id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required autoFocus className={submitted && !product.name ? 'p-invalid' : ''} />
            {submitted && !product.name && <small className="p-invalid">Prodcuto requerido.</small>}
          </div>
        )}
        {productDialog && (
          <div className="p-field">
            <label htmlFor="description">Descripcion</label>
            <InputTextarea id="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required rows={3} cols={20} className={submitted && !product.description ? 'p-invalid' : ''} />
            {submitted && !product.description && <small className="p-invalid">Descripcion requerida.</small>}
          </div>
        )}
        {productDialog && (
          <div className="p-field">
            <label htmlFor="price">Precio</label>
            <InputNumber id="price" value={product.price} onValueChange={(e) => setProduct({ ...product, price: e.value })} required mode="currency" currency="USD" locale="en-US" className={submitted && !product.price ? 'p-invalid' : ''} />
            {submitted && !product.price && <small className="p-invalid">Precio requerido.</small>}
          </div>
        )}
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={<>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
      </>} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && <span>Seguro que quieres eliminar <b>{product.name}</b>?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={<>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
      </>} onHide={hideDeleteProductsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {selectedProducts && <span>Quieres eliminar los productos seleccionados?</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default MyComponent;