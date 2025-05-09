const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, 'Password é obrigatória'],
    minlength: [4, 'Password deve ter pelo menos 4 caracteres']
  },
  gender: {
    type: String,
    required: [true, 'Género é obrigatório'],
    enum: {
      values: ['Masculino', 'Feminino'],
      message: 'Género deve ser "Masculino" ou "Feminino"'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, { collection: 'clients' });

module.exports = mongoose.model('Client', clientSchema);