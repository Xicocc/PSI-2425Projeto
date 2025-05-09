const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Client = require('../models/Client'); // Make sure to import Client model

// Create new trip
router.post('/', async (req, res) => {
  try {
    const requiredFields = ['client', 'pickupLocation', 'destination', 'comfortLevel', 'passengers'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        missingFields 
      });
    }

    // Verify client exists by NIF
    const client = await Client.findOne({ nif: req.body.client });
    if (!client) {
      return res.status(404).json({ 
        error: 'Client not found',
        details: `No client found with NIF ${req.body.client}`
      });
    }

    // Create trip with NIF reference
    const trip = new Trip({
      pickupLocation: req.body.pickupLocation,
      destination: req.body.destination,
      comfortLevel: req.body.comfortLevel,
      passengers: req.body.passengers,
      client: req.body.client // Storing NIF directly
    });

    await trip.save();
    
    // Populate client details in response
    const responseTrip = trip.toObject();
    responseTrip.clientDetails = {
      name: client.name,
      nif: client.nif
    };

    res.status(201).json(responseTrip);

  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error',
        details: Object.values(err.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ 
      error: 'Server Error', 
      message: err.message 
    });
  }
});

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.aggregate([
      {
        $lookup: {
          from: 'clients',
          localField: 'client',
          foreignField: 'nif',
          as: 'clientDetails'
        }
      },
      { $unwind: '$clientDetails' },
      { $sort: { requestedAt: -1 } },
      {
        $project: {
          pickupLocation: 1,
          destination: 1,
          comfortLevel: 1,
          passengers: 1,
          status: 1,
          requestedAt: 1,
          client: 1,
          clientName: '$clientDetails.name',
          clientNif: '$clientDetails.nif'
        }
      }
    ]);

    res.json(trips);
  } catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
});

// Get trips for specific client
router.get('/client/:clientNif', async (req, res) => {
  try {
    // Verify client exists first
    const client = await Client.findOne({ nif: req.params.clientNif });
    if (!client) {
      return res.status(404).json({ 
        error: 'Client not found' 
      });
    }

    const trips = await Trip.find({ client: req.params.clientNif })
      .sort({ requestedAt: -1 });

    const response = {
      client: {
        name: client.name,
        nif: client.nif
      },
      trips
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
});

// Update trip status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ 
        error: 'Status is required' 
      });
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ 
        message: 'Trip not found' 
      });
    }

    res.json(trip);
  } catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
});

module.exports = router;