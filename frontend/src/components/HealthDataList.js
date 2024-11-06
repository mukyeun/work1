import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HealthChart from './HealthChart';

function HealthDataList() {
  const [healthData, setHealthData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health-data');
      setHealthData(response.data);
    } catch (error) {
      console.error('데이터 조회 중 오류 발생:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말로 이 데이터를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:5000/api/health-data/${id}`);
        fetchHealthData();
        alert('데이터가 삭제되었습니다.');
      } catch (error) {
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 검색 및 필터링된 데이터 계산
  const filteredData = healthData.filter(data => {
    const matchesSearch = 
      data.pulseRate.toString().includes(searchTerm) ||
      data.height.toString().includes(searchTerm) ||
      data.weight.toString().includes(searchTerm) ||
      data.bmi.toString().includes(searchTerm);
    
    const matchesDate = !dateFilter || 
      new Date(data.date).toLocaleDateString().includes(dateFilter);

    return matchesSearch && matchesDate;
  }).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleSortChange = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h2>건강 데이터 목록</h2>
      <div className="chart-section">
        <HealthChart healthData={filteredData} />
      </div>
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="date-filter">
          <input
            type="text"
            placeholder="날짜 필터 (예: 2024-01)"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="date-input"
          />
        </div>
        <button 
          onClick={handleSortChange}
          className="sort-btn"
        >
          날짜 정렬: {sortOrder === 'asc' ? '오름차순' : '내림차순'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>맥박수</th>
            <th>키</th>
            <th>체중</th>
            <th>BMI</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data) => (
            <tr key={data._id}>
              <td>{new Date(data.date).toLocaleDateString()}</td>
              <td>{data.pulseRate}</td>
              <td>{data.height}</td>
              <td>{data.weight}</td>
              <td>{data.bmi.toFixed(2)}</td>
              <td>
                <button 
                  onClick={() => handleDelete(data._id)}
                  className="delete-btn"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HealthDataList;
