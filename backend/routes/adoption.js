const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

// Ruta para crear una nueva solicitud de adopcion
router.post('/', async (req, res) => {
  const { name, email, phone, address, reason, dni, petId, petType } = req.body;


  try {
    const newAdoption = new Adoption({
      name,
      email,
      phone,
      address,
      reason,
      dni,
      petId,
      petType
    });

    await newAdoption.save();
    const responseMessage = { message: 'Solicitud de adopcion enviada con exito.Espere sus respuestas dentro de 2 dias.' };
    console.log('Respuesta enviada:', responseMessage); 
    res.status(201).json(responseMessage);
  } catch (error) {
    console.error('Error al crear la solicitud de adopcion:', error);
    res.status(500).json({ message: 'Error al crear la solicitud de adopcion' });
  }
});

module.exports = router;
