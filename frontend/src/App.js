import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientDetail from './components/PatientDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/" element={<PatientDetail />} />
      </Routes>
    </Router>
  );
}

export default App; 