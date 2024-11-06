import React from 'react';
import './App.css';
import HealthForm from './components/HealthForm';
import HealthDataList from './components/HealthDataList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>맥파 데이터 입력</h1>
      </header>
      <main>
        <HealthForm />
        <HealthDataList />
      </main>
    </div>
  );
}

export default App; 