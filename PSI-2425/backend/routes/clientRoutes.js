const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, nif, password, gender } = req.body;
    
    if (!name || !nif || !password || !gender) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const client = new Client({ name, nif, password, gender });
    await client.save();
    
    res.status(201).json({
      message: 'Registo bem sucedido',
      client: { name, nif, gender }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'NIF já está em uso' });
    }
    res.status(500).json({ error: 'Erro no servidor', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { nif, password } = req.body;
    
    if (!nif || !password) {
      return res.status(400).json({ error: 'NIF e password são obrigatórios' });
    }
    
    const client = await Client.findOne({ nif });
    
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    if (client.password !== password) {
      return res.status(401).json({ error: 'Password incorreta' });
    }
    
    res.status(200).json({
      message: 'Login bem sucedido',
      client: {
        name: client.name,
        nif: client.nif,
        gender: client.gender
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor', details: err.message });
  }
});

// Get all clients (for testing)
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find({}, { password: 0 }); // Exclude passwords
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;