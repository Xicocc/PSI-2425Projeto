const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');
const moment = require('moment');

// Update pricing
router.put('/', async (req, res) => {
  try {
    const { comfortLevel, pricePerMinute, nightSurchargePercent } = req.body;
    
    if (!comfortLevel || !pricePerMinute || !nightSurchargePercent) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pricing = await Pricing.findOneAndUpdate(
      { comfortLevel },
      { 
        pricePerMinute, 
        nightSurchargePercent, 
        lastUpdated: Date.now() 
      },
      { upsert: true, new: true }
    );
    
    res.status(200).json(pricing);
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

// Get all pricing
router.get('/', async (req, res) => {
  try {
    const pricing = await Pricing.find().sort({ lastUpdated: -1 });
    res.json(pricing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calculate trip cost
router.post('/calculate', async (req, res) => {
  try {
    const { comfortLevel, startTime, endTime } = req.body;
    
    if (!comfortLevel || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pricing = await Pricing.findOne({ comfortLevel });
    
    if (!pricing) {
      return res.status(404).json({ error: 'Preço não encontrado para este nível de conforto' });
    }

    const start = moment(startTime);
    const end = moment(endTime);
    
    if (!start.isValid() || !end.isValid()) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    if (end.isBefore(start)) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    const totalMinutes = end.diff(start, 'minutes');
    let dayMinutes = 0;
    let nightMinutes = 0;
    let current = moment(start);
    
    while (current.isBefore(end)) {
      const next = moment.min(moment(current).add(1, 'minute'), end);
      const hour = current.hour();
      
      if (hour >= 6 && hour < 21) {
        dayMinutes++;
      } else {
        nightMinutes++;
      }
      
      current = next;
    }
    
    const dayCost = dayMinutes * pricing.pricePerMinute;
    const nightCost = nightMinutes * pricing.pricePerMinute * (1 + pricing.nightSurchargePercent / 100);
    const totalCost = dayCost + nightCost;
    
    res.json({
      totalMinutes,
      dayMinutes,
      nightMinutes,
      dayRate: pricing.pricePerMinute,
      nightRate: pricing.pricePerMinute * (1 + pricing.nightSurchargePercent / 100),
      dayCost,
      nightCost,
      totalCost
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

module.exports = router;