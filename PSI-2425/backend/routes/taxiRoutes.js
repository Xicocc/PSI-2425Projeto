const express = require('express');
const router = express.Router();
const Taxi = require('../models/Taxi');

router.post('/', async (req, res) => {
  try {
    if (!req.body.licensePlate || !req.body.brand || !req.body.model || !req.body.purchaseYear || !req.body.comfortLevel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const taxi = new Taxi(req.body);
    await taxi.save();
    res.status(201).json(taxi);
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

// Get all taxis, sorted by creation date (GET /api/taxis)
router.get('/', async (req, res) => {
  try {
    const taxis = await Taxi.find().sort({ createdAt: -1 }); 
    res.json(taxis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTaxi = await Taxi.findByIdAndDelete(req.params.id);
    if (!deletedTaxi) {
      return res.status(404).json({ message: 'Taxi não encontrado' });
    }
    res.json({ message: 'Taxi removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;