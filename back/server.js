/* const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Inicializar express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ecommerce_db',
    password: 'pass',  
    port: 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener los productos:', err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
  const { category, title, description, price, img, stock } = req.body;
  try {
      const result = await pool.query(
          'INSERT INTO productos (category, title, description, price, img, stock) VALUES (?, ?, ?, ?, ?, ?)',
          [category, title, description, price, img, stock]
      );
      res.status(201).json(result);
  } catch (err) {
      console.error('Error al agregar el producto:', err);
      res.status(500).json({ error: 'Error al agregar el producto' });
  }
});


// Ruta para actualizar un producto por ID
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { category, title, description, price, img, stock } = req.body;
  try {
      const result = await pool.query(
          'UPDATE productos SET category = ?, title = ?, description = ?, price = ?, img = ?, stock = ? WHERE id = ?',
          [category, title, description, price, img, stock, id]
      );
      res.json(result);
  } catch (err) {
      console.error('Error al actualizar el producto:', err);
      res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});


// Ruta para eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM clientes');
      res.json(result.rows);
  } catch (err) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

// Agregar un cliente
app.post('/clientes', async (req, res) => {
  const { name, cuit, email } = req.body;
  try {
      const result = await pool.query(
          'INSERT INTO clientes (name, cuit, email) VALUES ($1, $2, $3) RETURNING *',
          [name, cuit, email]
      );
      res.status(201).json(result.rows[0]);
  } catch (err) {
      res.status(500).json({ error: 'Error al agregar el cliente' });
  }
});

// Actualizar un cliente
app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cuit, email } = req.body;
  try {
      const result = await pool.query(
          'UPDATE clientes SET name = $1, cuit = $2, email = $3 WHERE id = $4 RETURNING *',
          [name, cuit, email, id]
      );
      res.json(result.rows[0]);
  } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});

// Eliminar un cliente
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
      res.status(204).send();
  } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});


app.get('/proveedores', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM proveedores');
      res.json(result.rows);
  } catch (err) {
      res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
});
 */


/* 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Inicializar express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ecommerce_db',
    password: 'pass', 
    port: 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);  
    } catch (err) {
        console.error('Error al obtener los productos:', err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
  const { category, title, description, price, img, stock } = req.body;
  try {
      const [result] = await pool.query(
          'INSERT INTO productos (category, title, description, price, img, stock) VALUES (?, ?, ?, ?, ?, ?)',
          [category, title, description, price, img, stock]
      );
      res.status(201).json({ id: result.insertId, category, title, description, price, img, stock });
  } catch (err) {
      console.error('Error al agregar el producto:', err);
      res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Ruta para actualizar un producto por ID
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { category, title, description, price, img, stock } = req.body;
  try {
      const [result] = await pool.query(
          'UPDATE productos SET category = ?, title = ?, description = ?, price = ?, img = ?, stock = ? WHERE id = ?',
          [category, title, description, price, img, stock, id]
      );
      res.json({ id, category, title, description, price, img, stock });
  } catch (err) {
      console.error('Error al actualizar el producto:', err);
      res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta para eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM clientes');
      res.json(rows); 
  } catch (err) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

// Agregar un cliente
app.post('/clientes', async (req, res) => {
  const { name, cuit, email } = req.body;
  try {
      const [result] = await pool.query(
          'INSERT INTO clientes (name, cuit, email) VALUES (?, ?, ?)',
          [name, cuit, email]
      );
      res.status(201).json({ id: result.insertId, name, cuit, email });
  } catch (err) {
      res.status(500).json({ error: 'Error al agregar el cliente' });
  }
});


app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cuit, email } = req.body;
  try {
      await pool.query(
          'UPDATE clientes SET name = ?, cuit = ?, email = ? WHERE id = ?',
          [name, cuit, email, id]
      );
      res.json({ id, name, cuit, email });
  } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});


app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
      res.status(204).send();
  } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});


app.get('/proveedores', async (req, res) => {
  try {
      const [rows] = await pool.query('SELECT * FROM proveedores');
      res.json(rows);  
  } catch (err) {
      res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
});
 */


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Datastore } = require('@google-cloud/datastore');

// Inicializar express
const app = express();
app.use(cors());
app.use(bodyParser.json());

const datastore = new Datastore({
  projectId: 'equipo1-ecommerce',
  keyFilename: './credentials/firebase-key.json' 
});



// Función auxiliar para formatear datos de Datastore
const getEntityData = (entity) => ({
  id: entity[datastore.KEY].id,
  ...entity,
});

// Ruta para obtener todos los clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const query = datastore.createQuery('clientes');
    const [clients] = await datastore.runQuery(query);

    if (clients.length === 0) {
      console.log('No se encontraron clientes.');
    } else {
      console.log(`Hay ${clients.length} clientes en la base de datos.`);
    }

    res.json(clients.map(getEntityData));
  } catch (err) {
    console.error('Error encontrando clientes:', err);
    res.status(500).json({ error: 'Error encontrando clientes' });
  }
});

// Ruta para agregar un cliente
app.post('/api/clientes', async (req, res) => {
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

// Ruta para actualizar un cliente por ID
app.put('/api/clientes/:id', async (req, res) => {
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

// Ruta para eliminar un cliente por ID
app.delete('/api/clientes/:id', async (req, res) => {
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

// Ruta para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const query = datastore.createQuery('productos');
    const [products] = await datastore.runQuery(query);
    res.json(products.map(getEntityData));
  } catch (err) {
    console.error('Error al obtener los productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para agregar un producto
app.post('/api/productos', async (req, res) => {
  const { category, title, description, price, img, stock } = req.body;
  const productKey = datastore.key('productos');
  const entity = {
    key: productKey,
    data: { category, title, description, price, img, stock },
  };
  try {
    await datastore.save(entity);
    res.status(201).json({ id: productKey.id, category, title, description, price, img, stock });
  } catch (err) {
    console.error('Error al agregar el producto:', err);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Ruta para actualizar un producto por ID
app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { category, title, description, price, img, stock } = req.body;
  const productKey = datastore.key(['productos', parseInt(id)]);
  try {
    await datastore.update({
      key: productKey,
      data: { category, title, description, price, img, stock },
    });
    res.json({ id, category, title, description, price, img, stock });
  } catch (err) {
    console.error('Error al actualizar el producto:', err);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta para eliminar un producto por ID
app.delete('/api/productos/:id', async (req, res) => {
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

// Ruta para obtener todos los proveedores
app.get('/api/proveedores', async (req, res) => {
  try {
    const query = datastore.createQuery('proveedores');
    const [providers] = await datastore.runQuery(query);
    res.json(providers.map(getEntityData));
  } catch (err) {
    console.error('Error al obtener los proveedores:', err);
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
});

// Ruta para agregar un proveedor
app.post('/api/proveedores', async (req, res) => {
  const { name, phone, email, category } = req.body;
  const providerKey = datastore.key('proveedores');
  const entity = {
    key: providerKey,
    data: { name, phone, email, category },
  };
  try {
    await datastore.save(entity);
    res.status(201).json({ id: providerKey.id, name, phone, email, category });
  } catch (err) {
    console.error('Error al agregar el proveedor:', err);
    res.status(500).json({ error: 'Error al agregar el proveedor' });
  }
});

// Ruta para actualizar un proveedor por ID
app.put('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, category } = req.body;
  const providerKey = datastore.key(['proveedores', parseInt(id)]);
  try {
    await datastore.update({
      key: providerKey,
      data: { name, phone, email, category },
    });
    res.json({ id, name, phone, email, category });
  } catch (err) {
    console.error('Error al actualizar el proveedor:', err);
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
});

// Ruta para eliminar un proveedor por ID
app.delete('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const providerKey = datastore.key(['proveedores', parseInt(id)]);
  try {
    await datastore.delete(providerKey);
    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar el proveedor:', err);
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
