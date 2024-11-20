const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore({
  projectId: 'equipo1-ecommerce',
  keyFilename: './credentials/firebase-key.json',
});

const getProducts = async (req, res) => {
  try {
    const query = datastore.createQuery('products');
    const [products] = await datastore.runQuery(query);
    const formattedProducts = products.map(product => ({
      id: product[datastore.KEY].id,
      ...product,
    }));
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const addProduct = async (req, res) => {
  const { title, description, price, purchase_price, category, stock, img, supplier_id } = req.body;
  const productKey = datastore.key('products');
  const entity = {
    key: productKey,
    data: { title, description, price, purchase_price, category, stock, img, supplier_id },
  };

  try {
    await datastore.save(entity);
    res.status(201).json({ id: productKey.id, ...entity.data });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productKey = datastore.key(['products', parseInt(id)]);
  try {
    await datastore.delete(productKey);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
};
