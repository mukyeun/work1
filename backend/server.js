const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// 건강 데이터 스키마
const healthDataSchema = new mongoose.Schema({
  pulseRate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number }
});

const HealthData = mongoose.model('HealthData', healthDataSchema);

// BMI 자동 계산 미들웨어
app.use('/api/health-data', (req, res, next) => {
  if (req.body.height && req.body.weight) {
    const heightInMeters = req.body.height / 100;
    req.body.bmi = (req.body.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  next();
});

// Routes
app.post('/api/health-data', async (req, res) => {
  try {
    console.log('받은 데이터:', req.body);
    const healthData = new HealthData(req.body);
    await healthData.save();
    res.status(201).json(healthData);
  } catch (error) {
    console.error('저장 오류:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/health-data', async (req, res) => {
  try {
    const healthData = await HealthData.find().sort({ date: -1 });
    res.json(healthData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 여기에 삭제 라우트 추가
app.delete('/api/health-data/:id', async (req, res) => {
  try {
    const healthData = await HealthData.findByIdAndDelete(req.params.id);
    if (!healthData) {
      return res.status(404).json({ message: '데이터를 찾을 수 없습니다.' });
    }
    res.json({ message: '데이터가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
}); 