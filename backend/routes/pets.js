const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/authMiddleware');
const { getPets, createPet, deletePet } = require('../controllers/petController');

// Obtener todas las mascotas (gatos y perros)
router.get('/', getPets);

// Crear una nueva mascota (gato o perro)
router.post('/', protect, upload.single('image'), createPet);

// Eliminar una mascota por ID
router.delete('/:id', protect, admin, deletePet);

module.exports = router;
