const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const axios = require('axios'); 

router.post('/', async (req, res) => {
  try {
    if (!req.body.name || !req.body.nif || !req.body.gender || !req.body.birthYear || !req.body.licenseNumber) {
     return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error',
        details: Object.values(err.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 }); 
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ message: 'Condutor não encontrado' });
    }
    res.json({ message: 'Condutor removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/ctt-address/:postalCode', async (req, res) => {
  try {
    const { postalCode } = req.params;
    
    // Validate postal code format (XXXX-XXX)
    if (!/^\d{4}-\d{3}$/.test(postalCode)) {
      return res.status(400).json({ error: 'Formato de código postal inválido. Use XXXX-XXX' });
    }

    const response = await axios.get(
      `https://www.cttcodigopostal.pt/api/v1/6840b0dee0d942ea8f7625e5513c0af7/${postalCode}`,
      {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      }
    );

    // Check if response contains data
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ error: 'Nenhuma morada encontrada para este código postal' });
    }

    // Transform CTT API response to match your address structure
    // Using the first address in the array as the primary result
    const firstAddress = response.data[0];
    const addressData = {
      street: firstAddress.morada || '',
      locality: firstAddress.localidade || '',
      district: firstAddress.distrito || '',
    };

    res.json(addressData);
  } catch (err) {
    console.error('CTT API Error:', err.message);
    
    if (err.response) {
      // Forward CTT API error status code if available
      res.status(err.response.status).json({ 
        error: 'Erro ao buscar morada',
        details: err.response.data 
      });
    } else if (err.code === 'ECONNABORTED') {
      res.status(504).json({ error: 'Timeout ao contactar serviço de moradas' });
    } else {
      res.status(500).json({ error: 'Erro no servidor', details: err.message });
    }
  }
});

module.exports = router;