import React, { useState } from 'react';
import axios from 'axios';

function HealthForm({ onDataSubmit }) {
  const [formData, setFormData] = useState({
    pulseRate: '',
    height: '',
    weight: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/health-data', {
        pulseRate: Number(formData.pulseRate),
        height: Number(formData.height),
        weight: Number(formData.weight),
        date: new Date()
      });
      
      if (response.status === 201) {
        alert('데이터가 성공적으로 저장되었습니다.');
        setFormData({
          pulseRate: '',
          height: '',
          weight: ''
        });
        // 부모 컴포넌트의 데이터 새로고침
        if (onDataSubmit) {
          onDataSubmit();
        }
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('데이터 저장 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>맥박수:</label>
        <input
          type="number"
          name="pulseRate"
          value={formData.pulseRate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>키 (cm):</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>체중 (kg):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">저장</button>
    </form>
  );
}

export default HealthForm; 