const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  reason: { type: String, required: true },
  dni: { type: String, required: true },
  petId: { 
    type: mongoose.Schema.Types.ObjectId, 
    refPath: 'petType',  // Referencia dinámica al tipo de mascota (gato o perro)
    required: true
  },
  petType: {  // Campo para saber si es un gato o perro
    type: String,
    required: true,
    enum: ['cat', 'dog']
  }
}, { timestamps: true });

module.exports = mongoose.model('Adoption', adoptionSchema);
