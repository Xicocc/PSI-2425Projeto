const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  comfortLevel: {
    type: String,
    required: true,
    enum: ['Básico', 'Luxuoso'],
    unique: true
  },
  pricePerMinute: {
    type: Number,
    required: true,
    min: [0.01, 'Preço por minuto deve ser pelo menos 0.01']
  },
  nightSurchargePercent: {
    type: Number,
    required: true,
    min: [0, 'Acréscimo não pode ser negativo'],
    max: [100, 'Acréscimo não pode exceder 100%']
  },
  createdAt: { 
    type: Date,
    default: Date.now
  }
}, { collection: 'pricing' });

module.exports = mongoose.model('Pricing', priceSchema);