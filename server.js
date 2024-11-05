const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pulse-webapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

const healthDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bloodSugar: Number,
  temperature: Number,
  bmi: Number,
  createdAt: { type: Date, default: Date.now }
});

const HealthData = mongoose.model('HealthData', healthDataSchema);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.post('/api/health-data', async (req, res) => {
  try {
    const healthData = new HealthData(req.body);
    await healthData.save();
    res.status(201).json(healthData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/health-data', async (req, res) => {
  try {
    const data = await HealthData.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 