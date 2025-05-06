// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/Admin/UserManagement';
import RoleManagement from './pages/Admin/RoleManagement';
import CompanyList from './pages/Company/CompanyList';
import WarehouseDashboard from './pages/Warehouse/WarehouseDashboard';
import BranchDashboard from './pages/Branch/BranchDashboard';
import ProductList from './pages/Product/ProductList';
import StockOverview from './pages/Stock/StockOverview';
import OrderList from './pages/Sales/OrderList';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      {token && <Navbar />}
      <div className="container">
        {token && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/user-management" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/user-management" element={
              <ProtectedRoute><UserManagement /></ProtectedRoute>} />
            <Route path="/role-management" element={
              <ProtectedRoute><RoleManagement /></ProtectedRoute>} />
            <Route path="/company-list" element={
              <ProtectedRoute><CompanyList /></ProtectedRoute>} />
            <Route path="/warehouse-dashboard" element={
              <ProtectedRoute><WarehouseDashboard /></ProtectedRoute>} />
            <Route path="/branch-dashboard" element={
              <ProtectedRoute><BranchDashboard /></ProtectedRoute>} />
            <Route path="/product-list" element={
              <ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/stock-overview" element={
              <ProtectedRoute><StockOverview /></ProtectedRoute>} />
            <Route path="/order-list" element={
              <ProtectedRoute><OrderList /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
