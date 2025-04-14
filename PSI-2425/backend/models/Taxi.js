const mongoose = require('mongoose');

const comfortLevels = ['Básico', 'Luxuoso'];

const taxiSchema = new mongoose.Schema({
  licensePlate: { 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[A-Z0-9]{6}$/.test(v),
      message: 'Matricula tem de ter 6 caracteres com letras e numeros!'
    }
  },
  brand: { 
    type: String, 
    required: true,
    enum: ['Mercedes', 'Toyota', 'BMW', 'Volkswagen']
  },
  model: { 
    type: String, 
    required: true,
    enum: ['Sedan', 'SUV', 'Van', 'Hybrid']
  },
  purchaseYear: {
    type: Number,
    required: [true, 'Ano de Compra'],
    max: [new Date().getFullYear(), 'Ano nao pode ser no futuro']
  },
  comfortLevel: { 
    type: String, 
    required: true, 
    enum: comfortLevels
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  }
}, { collection: 'taxis' });


module.exports = mongoose.model('Taxi', taxiSchema);