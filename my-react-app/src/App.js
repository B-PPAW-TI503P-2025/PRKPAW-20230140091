import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import semua komponen
import LoginPage from './Component/LoginPage';
import RegisterPage from './Component/RegisterPage'; 
import DashboardPage from './Component/DashboardPage'; 
import PresensiPage from './Component/PresensiPage'; 
import ReportPage from './Component/ReportPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/presensi" element={<PresensiPage />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;