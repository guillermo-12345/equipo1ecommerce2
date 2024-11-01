const [loading, setLoading] = useState(false);

const toast = useRef(null);
const dt = useRef(null);

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