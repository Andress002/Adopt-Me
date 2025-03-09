const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware para depuración
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Middleware para archivos subidos
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

// 🔄 Cambio de cats a pets
const petsRoutes = require('./routes/pets');
app.use('/api/pets', petsRoutes);

const authRoutes = require('./routes/auth'); // Rutas de autenticación
app.use('/api/auth', authRoutes);

const adoptionsRoutes = require('./routes/adoption');
app.use('/api/adoption' , adoptionsRoutes);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Adopción de Mascotas! 🐱🐶');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
