const mongoose = require('mongoose');

const comfortLevels = ['Básico', 'Luxuoso']; // RIA 16 compliance

const taxiSchema = new mongoose.Schema({
  licensePlate: { 
    type: String, 
    required: true,
    validate: {
      validator: (v) => /^[A-Z0-9]{6}$/.test(v), // Example: "AB123C" (mix of letters/numbers)
      message: 'License plate must be 6 chars with letters and digits!'
    }
  },
  brand: { 
    type: String, 
    required: true,
    enum: ['Mercedes', 'Toyota', 'BMW', 'Volkswagen'] // Predefined list
  },
  model: { 
    type: String, 
    required: true,
    enum: ['Sedan', 'SUV', 'Van', 'Hybrid'] // Predefined list
  },
  purchaseYear: {
    type: Number,
    required: [true, 'Purchase year is required'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  comfortLevel: { 
    type: String, 
    required: true, 
    enum: comfortLevels // RIA 16 compliance
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Auto-set on creation
  }
}, { collection: 'taxis' });

module.exports = mongoose.model('Taxi', taxiSchema);