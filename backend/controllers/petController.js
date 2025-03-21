const Pet = require('../models/Pet');

// Obtener todas las mascotas
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las mascotas' });
  }
};

// Crear una nueva mascota (actualizado para incluir age, vaccinated y size)
const createPet = async (req, res) => {
  // Extraemos todos los campos del body
  let { name, description, type, age, vaccinated, size } = req.body;
  const image = req.file ? req.file.filename : null;  // Usando multer para la imagen

  try {
    // Convertir a los tipos adecuados, ya que req.body viene todo como string
    age = Number(age);
    vaccinated = vaccinated === 'true'; // Convierte el string a boolean

    // Crear una nueva mascota incluyendo los nuevos campos
    const newPet = new Pet({ name, description, type, image, age, vaccinated, size });
    await newPet.save();
    res.status(201).json({ message: 'Mascota creada exitosamente', pet: newPet });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la mascota', error });
  }
};

// Eliminar una mascota
const deletePet = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    res.status(200).json({ message: 'Mascota eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la mascota', error });
  }
};

module.exports = { getPets, createPet, deletePet };
