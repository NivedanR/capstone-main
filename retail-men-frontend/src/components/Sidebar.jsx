// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: isActive(path) ? '#1a73e8' : '#5f6368',
    backgroundColor: isActive(path) ? '#e8f0fe' : 'transparent',
    textDecoration: 'none',
    borderRadius: '0 20px 20px 0',
    margin: '4px 0',
    transition: 'all 0.2s ease',
  });

  const getIconStyle = (path) => ({
    marginRight: '12px',
    color: isActive(path) ? '#1a73e8' : '#5f6368',
  });

  return (
    <div style={{
      width: '256px',
      height: '100vh',
      backgroundColor: '#fff',
      borderRight: '1px solid #e0e0e0',
      padding: '20px 0',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      <div style={{ padding: '0 20px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#1a73e8' }}>Retail Men</h2>
      </div>

      <nav>
        <Link to="/dashboard" style={getLinkStyle('/dashboard')}>
          <span style={getIconStyle('/dashboard')}>📊</span>
          Dashboard
        </Link>

        {(user?.role === 'admin' || user?.role === 'warehouse') && (
          <>
            <Link to="/products" style={getLinkStyle('/products')}>
              <span style={getIconStyle('/products')}>👕</span>
              Products
            </Link>
            <Link to="/warehouses" style={getLinkStyle('/warehouses')}>
              <span style={getIconStyle('/warehouses')}>🏭</span>
              Warehouses
            </Link>
          </>
        )}

        {user?.role === 'admin' && (
          <Link to="/branches" style={getLinkStyle('/branches')}>
            <span style={getIconStyle('/branches')}>🏪</span>
            Branches
          </Link>
        )}

        {(user?.role === 'admin' || user?.role === 'sales') && (
          <>
            <Link to="/orders" style={getLinkStyle('/orders')}>
              <span style={getIconStyle('/orders')}>🛒</span>
              Orders
            </Link>
            <Link to="/sales/analytics" style={getLinkStyle('/sales/analytics')}>
              <span style={getIconStyle('/sales/analytics')}>📈</span>
              Sales Analytics
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
