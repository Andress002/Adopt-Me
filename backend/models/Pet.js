const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: ['cat', 'dog'], required: true },
  age: { type: Number, default: 0 },
  vaccinated: { type: Boolean, default: false },
  size: { type: String, default: 'Desconocido' }
});

module.exports = mongoose.model('Pet', PetSchema);
