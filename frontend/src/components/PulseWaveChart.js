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
import { Box, Paper, Typography, Grid } from '@mui/material';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PulseWaveChart = ({ data }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '맥파 데이터 분석'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '맥압 (mmHg)'
        }
      },
      x: {
        title: {
          display: true,
          text: '시간 (ms)'
        }
      }
    }
  };

  const chartData = {
    labels: data?.timestamps || [],
    datasets: [
      {
        label: '맥파',
        data: data?.values || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            맥파 분석 결과
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '400px' }}>
            <Line options={chartOptions} data={chartData} />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              측정 정보
            </Typography>
            <Typography variant="body2" color="text.secondary">
              측정 위치: {data?.측정위치}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              측정 시간: {data?.측정시간}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              맥파 강도: {data?.맥파강도}
            </Typography>
            
            <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
              분석 결과
            </Typography>
            <Typography variant="body2" color="text.secondary">
              평균 맥압: {data?.평균맥압} mmHg
            </Typography>
            <Typography variant="body2" color="text.secondary">
              맥박수: {data?.맥박수} bpm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              특이사항: {data?.특이사항 || '없음'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PulseWaveChart;
