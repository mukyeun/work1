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

// 단일 건강 데이터 조회
app.get('/api/health-data/:id', async (req, res) => {
  try {
    const data = await HealthData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 건강 데이터 수정
app.put('/api/health-data/:id', async (req, res) => {
  try {
    const data = await HealthData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 건강 데이터 삭제
app.delete('/api/health-data/:id', async (req, res) => {
  try {
    const data = await HealthData.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// BMI 자동 계산 미들웨어
app.use('/api/health-data', (req, res, next) => {
  if (req.body.height && req.body.weight) {
    const heightInMeters = req.body.height / 100;
    req.body.bmi = (req.body.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 