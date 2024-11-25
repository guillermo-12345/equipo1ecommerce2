const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoute');
const supplierRoutes = require('./routes/supplierRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const clientRoutes = require('./routes/clientRoutes'); 
const { dbConnection } = require('./config/db');


// Inicializar Firebase Admin
const admin = require('./config/firebase');
const path = require('path');

// Inicializar express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas CRUD
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);

// Ruta inicial
app.get('/', (req, res) => res.send('Servidor corriendo...'));

// Middleware de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal. Intenta nuevamente.' });
});

// Conectar y sincronizar la base de datos
const port = process.env.PORT || 3001;

dbConnection.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });