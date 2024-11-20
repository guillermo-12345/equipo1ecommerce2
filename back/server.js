const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Datastore } = require('@google-cloud/datastore');
const admin = require('firebase-admin');
const authRoutes = require('./routes/authRoute');
const usuarioRoutes = require('./routes/usuarioRoute');
const protectedRoutes = require('./routes/protectedRoutes');
const serviceAccount = require('./credentials/firebase-key.json');
const sequelize = require('../../src/components/service/dbConfig');
const supplierRoutes = require('./routes/supplierRoutes');

// Importa los controladores y el middleware
const { login, getUser } = require('./controllers/authController');
const { verifyToken } = require('./middlewares/authMiddleware');

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Configuración de Datastore
const datastore = new Datastore({
  projectId: 'equipo1-ecommerce',
  keyFilename: './credentials/firebase-key.json',
});

// Inicializar express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Función auxiliar para formatear datos de Datastore
const getEntityData = (entity) => ({
  id: entity[datastore.KEY].id,
  ...entity,
});

// Rutas de autenticación
app.post('/auth/login', login);           
app.get('/auth/user', verifyToken, getUser); 

// Rutas de autenticación y usuarios
app.use('/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api', protectedRoutes);

// Ruta pública para obtener todos los productos (sin autenticación)
app.get('/api/productos', async (req, res) => {
  try {
    const query = datastore.createQuery('productos');
    const [products] = await datastore.runQuery(query);
    const formattedProducts = products.map((product) => ({
      id: product[datastore.KEY].id,
      title: product.title,
      description: product.description,
      price: product.price,
      purchase_price: product.purchase_price,
      category: product.category,
      stock: product.stock,
      img: product.img,
      supplier_id: product.supplier_id,
    }));
    res.json(formattedProducts);
  } catch (err) {
    console.error('Error al obtener los productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta pública para obtener un producto individual por su ID (sin autenticación)
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productKey = datastore.key(['productos', parseInt(id)]);
    const [product] = await datastore.get(productKey);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productData = {
      id: productKey.id,
      ...product,
    };

    res.json(productData);
  } catch (err) {
    console.error('Error al obtener el producto:', err);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// CRUD para clientes (ruta protegida)
app.get('/api/clientes', verifyToken, async (req, res) => {
  try {
    const query = datastore.createQuery('clientes');
    const [clients] = await datastore.runQuery(query);
    res.json(clients.map(getEntityData));
  } catch (err) {
    console.error('Error encontrando clientes:', err);
    res.status(500).json({ error: 'Error encontrando clientes' });
  }
});

app.post('/api/clientes', verifyToken, async (req, res) => {
  const { name, cuit, email } = req.body;
  const clientKey = datastore.key('clientes');
  const entity = {
    key: clientKey,
    data: { name, cuit, email },
  };
  try {
    await datastore.save(entity);
    res.status(201).json({ id: clientKey.id, name, cuit, email });
  } catch (err) {
    console.error('Error agregando cliente:', err);
    res.status(500).json({ error: 'Error agregando cliente' });
  }
});

app.put('/api/clientes/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, cuit, email } = req.body;
  const clientKey = datastore.key(['clientes', parseInt(id)]);
  try {
    await datastore.update({ key: clientKey, data: { name, cuit, email } });
    res.json({ id, name, cuit, email });
  } catch (err) {
    console.error('Error al actualizar el cliente:', err);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});

app.delete('/api/clientes/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const clientKey = datastore.key(['clientes', parseInt(id)]);
  try {
    await datastore.delete(clientKey);
    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar el cliente:', err);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});

// CRUD para productos (rutas protegidas para agregar, actualizar y eliminar productos)
app.get('/api/products/inStock', async (req, res) => {
  try {
    const query = datastore.createQuery('productos').filter('stock', '>', 0);
    const [products] = await datastore.runQuery(query);

    const formattedProducts = products.map(product => ({
      id: product[datastore.KEY].id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      img: product.img,
      supplier_id: product.supplier_id,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error fetching in-stock products:', error);
    res.status(500).send('Error fetching in-stock products');
  }
});

app.post('/api/products', verifyToken, async (req, res) => {
  const { title, description, price, purchase_price, category, stock, img, supplier_id } = req.body;
  const productKey = datastore.key('productos');
  const entity = {
    key: productKey,
    data: { title, description, price, purchase_price, category, stock, img, supplier_id },
  };
  try {
    await datastore.save(entity);
    res.status(201).json({ id: productKey.id, title, description, price, purchase_price, category, stock, img, supplier_id });
  } catch (err) {
    console.error('Error al agregar el producto:', err);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

app.put('/api/products/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, purchase_price, category, stock, img, supplier_id } = req.body;
  const productKey = datastore.key(['productos', parseInt(id)]);
  try {
    await datastore.update({ key: productKey, data: { title, description, price, purchase_price, category, stock, img, supplier_id } });
    res.json({ id, title, description, price, purchase_price, category, stock, img, supplier_id });
  } catch (err) {
    console.error('Error al actualizar el producto:', err);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

app.delete('/api/products/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const productKey = datastore.key(['productos', parseInt(id)]);
  try {
    await datastore.delete(productKey);
    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar el producto:', err);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});


app.post('/api/ordenes', async (req, res) => {
  const { buyer, items, total, date } = req.body;

  // Creamos la clave de la nueva orden
  const orderKey = datastore.key('ordenes');

  // Estructuramos la orden con `buyer` como entidad incorporada
  const order = {
    key: orderKey,
    data: {
      buyer: {
        uid: buyer.uid,
        email: buyer.email
      },
      items,
      total,
      date
    }
  };

  try {
    // Guardamos la orden en Datastore
    await datastore.save(order);
    res.status(201).send({ id: orderKey.id });
  } catch (error) {
    console.error("Error al guardar la orden en Datastore:", error);
    res.status(500).send("Error al crear la orden");
  }
});


app.post('/api/products/:id/decrementStock', async (req, res) => {
  const { id } = req.params; 
  const { quantity } = req.body;  

  try {
    // Obtener el producto de Google Datastore
    const productKey = datastore.key(['productos', datastore.int(id)]);
    const [product] = await datastore.get(productKey);
    
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    // Reducir el stock actual del producto
    product.stock = (product.stock || 0) - quantity;
    
    // Asegurarse de que el stock no sea negativo
    if (product.stock < 0) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }
    
    // Guardar el producto actualizado en Datastore
    await datastore.save({ key: productKey, data: product });
    res.status(200).json({ message: "Stock actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    res.status(500).json({ message: "Error al actualizar el stock" });
  }
});


// Rutas de CRUD de proveedores
app.get('/api/proveedores', async (req, res) => {
  try {
    const query = datastore.createQuery('proveedores');
    const [suppliers] = await datastore.runQuery(query);
    res.json(suppliers.map(supplier => ({ id: supplier[datastore.KEY].id, ...supplier })));
  } catch (err) {
    console.error('Error fetching suppliers:', err);
    res.status(500).json({ error: 'Error fetching suppliers' });
  }
});

app.post('/api/proveedores', async (req, res) => {
  const { name, phone, email, category } = req.body;
  const supplierKey = datastore.key('proveedores');
  const entity = {
    key: supplierKey,
    data: { name, phone, email, category }
  };

  try {
    await datastore.save(entity);
    res.status(201).json({ id: supplierKey.id, ...entity.data });
  } catch (err) {
    console.error('Error adding supplier:', err);
    res.status(500).json({ error: 'Error adding supplier' });
  }
});

app.put('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, category } = req.body;
  const supplierKey = datastore.key(['proveedores', parseInt(id)]);

  try {
    await datastore.update({
      key: supplierKey,
      data: { name, phone, email, category }
    });
    res.json({ id, name, phone, email, category });
  } catch (err) {
    console.error('Error updating supplier:', err);
    res.status(500).json({ error: 'Error updating supplier' });
  }
});

app.delete('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const supplierKey = datastore.key(['proveedores', parseInt(id)]);

  try {
    await datastore.delete(supplierKey);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting supplier:', err);
    res.status(500).json({ error: 'Error deleting supplier' });
  }
});

// Endpoint para obtener un producto por su ID y devolver la categoría
app.get('/api/product/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const productKey = datastore.key(['productos', datastore.int(productId)]);
    const [product] = await datastore.get(productKey);

    if (product) {
      res.status(200).json({ category: product.category });
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).send('Error fetching product data');
  }
});


app.get('/api/sales', async (req, res) => {
  try {
    const query = datastore.createQuery('ordenes');
    const [orders] = await datastore.runQuery(query);

    const formattedOrders = await Promise.all(orders.map(async (order) => {
      const itemsWithCategory = await Promise.all(order.items.map(async (item) => {
        try {
          const productKey = datastore.key(['productos', datastore.int(item.id)]);
          const [product] = await datastore.get(productKey);
          return {
            ...item,
            category: product ? product.category : "Sin categoría"
          };
        } catch {
          return {
            ...item,
            category: "Sin categoría"
          };
        }
      }));

      return {
        orderNumber: order[datastore.KEY].id,
        quantity: order.items.reduce((total, item) => total + item.quantity, 0),
        items: itemsWithCategory,
        date: order.date,
        mail: order.buyer.email
      };
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).send('Error fetching sales data');
  }
});

app.use('/api/suppliers', supplierRoutes);

app.get('/', (req, res) => res.send('Servidor corriendo...'));

// Conectar y sincronizar la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(3001, () => console.log('Servidor corriendo en http://localhost:3001'));
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });



/* 
// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); */



