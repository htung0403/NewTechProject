// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../api/services/auth.service.js';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/dang-nhap');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
};

export default Dashboard;