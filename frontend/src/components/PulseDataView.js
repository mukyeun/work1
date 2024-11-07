import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PulseDataView = ({ pulseData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        // 샘플 데이터 (실제로는 props로 받은 pulseData를 사용)
        const data = {
            labels: Array.from({ length: pulseData?.length || 100 }, (_, i) => i),
            datasets: [{
                label: '맥파',
                data: pulseData || Array.from({ length: 100 }, () => Math.random() * 100),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        };

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '맥파 데이터 그래프'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: '시간 (ms)'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '진폭'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [pulseData]);

    const calculatePulseMetrics = (data) => {
        if (!data || data.length === 0) return null;

        const max = Math.max(...data);
        const min = Math.min(...data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;

        return {
            maxAmplitude: max.toFixed(2),
            minAmplitude: min.toFixed(2),
            avgAmplitude: avg.toFixed(2),
            pulseRate: calculatePulseRate(data)
        };
    };

    const calculatePulseRate = (data) => {
        // 실제 맥박수 계산 로직 구현 필요
        // 현재는 더미 데이터 반환
        return "72";
    };

    const metrics = calculatePulseMetrics(pulseData);

    return (
        <div className="pulse-data-view">
            <h3>맥파 데이터 분석</h3>
            
            <div className="pulse-chart">
                <canvas ref={chartRef}></canvas>
            </div>

            {metrics && (
                <div className="pulse-metrics">
                    <h4>측정 지표</h4>
                    <div className="metrics-grid">
                        <div className="metric-item">
                            <label>최대 진폭:</label>
                            <span>{metrics.maxAmplitude}</span>
                        </div>
                        <div className="metric-item">
                            <label>최소 진폭:</label>
                            <span>{metrics.minAmplitude}</span>
                        </div>
                        <div className="metric-item">
                            <label>평균 진폭:</label>
                            <span>{metrics.avgAmplitude}</span>
                        </div>
                        <div className="metric-item">
                            <label>맥박수:</label>
                            <span>{metrics.pulseRate} BPM</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PulseDataView;
