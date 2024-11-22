const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/db');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoute');

// Inicializar Firebase Admin
const admin = require('./config/firebase');


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
const PORT = process.env.PORT || 3001;
sequelize
  .sync({ alter: true }) // Sincronización para desarrollo
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
