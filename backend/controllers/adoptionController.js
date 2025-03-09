const Adoption = require('../models/Adoption'); // Modelo de adopción
const Pet = require('../models/Pet'); // Modelo de mascota (gatos y perros)

const createAdoption = async (req, res) => {
  try {
    const { name, email, phone, address, reason, dni, petId } = req.body;
    
    // Verificar que la mascota existe
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    // Crear una nueva adopción
    const newAdoption = new Adoption({
      name,
      email,
      phone,
      address,
      reason,
      dni,
      petId
    });

    await newAdoption.save();
    res.status(201).json(newAdoption);
  } catch (error) {
    console.error('Error al crear la adopción:', error);
    res.status(500).json({ message: 'Error al crear la adopción' });
  }
};

const getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('petId'); // Llenar los datos de la mascota en la adopción
    res.json(adoptions);
  } catch (error) {
    console.error('Error al obtener las adopciones:', error);
    res.status(500).json({ message: 'Error al obtener las adopciones' });
  }
};

const getAdoptionById = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate('petId');
    if (!adoption) {
      return res.status(404).json({ message: 'Adopción no encontrada' });
    }
    res.json(adoption);
  } catch (error) {
    console.error('Error al obtener la adopción:', error);
    res.status(500).json({ message: 'Error al obtener la adopción' });
  }
};

module.exports = { createAdoption, getAdoptions, getAdoptionById };
