// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/user-management">User Management</Link></li>
        <li><Link to="/role-management">Role Management</Link></li>
        <li><Link to="/company-list">Company List</Link></li>
        <li><Link to="/warehouse-dashboard">Warehouse Dashboard</Link></li>
        <li><Link to="/branch-dashboard">Branch Dashboard</Link></li>
        <li><Link to="/product-list">Product List</Link></li>
        <li><Link to="/stock-overview">Stock Overview</Link></li>
        <li><Link to="/order-list">Order List</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
