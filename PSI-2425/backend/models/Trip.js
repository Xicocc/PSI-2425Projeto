const mongoose = require('mongoose');

const tripStatuses = ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'];

const tripSchema = new mongoose.Schema({
  client: {
    type: String, 
    ref: 'Client',
    required: true,
    validate: {
      validator: (v) => /^\d{9}$/.test(v), 
      message: 'NIF must be 9 digits'
    }
  },
  pickupLocation: {
    type: String,
    required: [true, 'Local de partida é obrigatório']
  },
  destination: {
    type: String,
    required: [true, 'Destino é obrigatório']
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  comfortLevel: {
    type: String,
    required: true,
    enum: ['Básico', 'Luxuoso'],
    default: 'Básico'
  },
  passengers: {
    type: Number,
    required: true,
    min: [1, 'Mínimo de 1 passageiro'],
    max: [8, 'Máximo de 8 passageiros'],
    validate: {
      validator: Number.isInteger,
      message: 'Número de passageiros deve ser inteiro'
    }
  },
  status: {
    type: String,
    enum: tripStatuses,
    default: 'requested'
  },
  taxi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Taxi'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  price: {
    type: Number
  },
  completedAt: {
    type: Date
  }
}, { collection: 'trips' });

module.exports = mongoose.model('Trip', tripSchema);