const express = require('express');
const router = express.Router();
const Taxi = require('../models/Taxi');

// Register a new taxi (POST /api/taxis)
router.post('/', async (req, res) => {
  try {
    const taxi = new Taxi(req.body);
    await taxi.save();
    res.status(201).json(taxi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all taxis, sorted by creation date (GET /api/taxis)
router.get('/', async (req, res) => {
  try {
    const taxis = await Taxi.find().sort({ createdAt: -1 }); // Newest first
    res.json(taxis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;