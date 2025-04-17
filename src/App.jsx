// Updated routing setup with role-based redirects using React Router

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import CustomerInterface from './CustomerInterface';
import MerchantInventoryMng from './MerchantInventoryMng';
import AdminDashboard from './App';

function AuthWrapper() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Simulate role fetching logic (replace with real auth check)
    const user = JSON.parse(localStorage.getItem('user')) || {}; // Simulated user object
    const role = user.role;

    if (role === 'customer') {
      navigate('/customer');
    } else if (role === 'merchant') {
      navigate('/merchant');
    } else if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/login'); // fallback
    }
  }, [navigate]);

  return <p className="text-center mt-10">Redirecting...</p>;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/redirect" element={<AuthWrapper />} />
        <Route path="/customer" element={<CustomerInterface />} />
        <Route path="/merchant" element={<MerchantInventoryMng />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
