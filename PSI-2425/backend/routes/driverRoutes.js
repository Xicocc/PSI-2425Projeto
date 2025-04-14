const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

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

module.exports = router;