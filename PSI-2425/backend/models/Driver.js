const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  // Pessoa fields
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  nif: {
    type: String,
    required: [true, 'NIF é obrigatório'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{9}$/.test(v) && parseInt(v) > 0;
      },
      message: 'NIF deve ter exatamente 9 dígitos positivos'
    }
  },
  gender: {
    type: String,
    required: [true, 'Género é obrigatório'],
    enum: {
      values: ['Masculino', 'Feminino'],
      message: 'Género deve ser "Masculino" ou "Feminino"'
    }
  },
  birthYear: {
    type: Number,
    required: [true, 'Ano de nascimento é obrigatório'],
    min: [1900, 'Ano de nascimento inválido'],
    validate: {
      validator: function(v) {
        return new Date().getFullYear() - v >= 18;
      },
      message: 'Motorista deve ter pelo menos 18 anos'
    }
  },

  // Morada fields
  address: {
    street: {
      type: String,
      required: [true, 'Rua é obrigatória'],
      trim: true,
      maxlength: [200, 'Nome da rua não pode exceder 200 caracteres']
    },
    postalCode: {
      type: String,
      required: [true, 'Código Postal é obrigatório'],
      validate: {
        validator: function(v) {
          return /^\d{4}-\d{3}$/.test(v);
        },
        message: 'Código Postal deve seguir o formato 0000-000'
      }
    },
    city: {
      type: String,
      required: [true, 'Localidade é obrigatória'],
      trim: true,
      maxlength: [100, 'Localidade não pode exceder 100 caracteres']
    }
  },

  // Motorista fields
  licenseNumber: {
    type: String,
    required: [true, 'Número da carta de condução é obrigatório'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[A-Z0-9]{6,12}$/.test(v);
      },
      message: 'Número da carta deve ter entre 6-12 caracteres alfanuméricos'
    }
  },

  // System fields
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, { collection: 'drivers' });


module.exports = mongoose.model('Driver', driverSchema);