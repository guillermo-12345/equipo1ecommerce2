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
