import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HealthChart({ healthData }) {
  // 최근 10개의 데이터만 표시
  const recentData = [...healthData].reverse().slice(0, 10).reverse();
  
  const chartData = {
    labels: recentData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: '맥박수',
        data: recentData.map(data => data.pulseRate),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'BMI',
        data: recentData.map(data => data.bmi),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '건강 데이터 추이'
      }
    }
  };

  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
}

export default HealthChart;
