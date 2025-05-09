require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taxiRoutes = require('./routes/taxiRoutes');
const driverRoutes = require('./routes/driverRoutes');
const pricingRoutes = require('./routes/pricingRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10kb' }));

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, 
  family: 4 // Force IPv4
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));


app.use('/api/taxis', taxiRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/clients', clientRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});