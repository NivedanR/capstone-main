// src/pages/WarehouseDashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchWarehouses } from '../../api/warehouse';
import { fetchBranches } from '../../api/branch';
import useAuth from '../../hooks/useAuth';

const WarehouseDashboard = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const getWarehouses = async () => {
      const data = await fetchWarehouses(token);
      setWarehouses(data.warehouses || []);
    };
    const getBranches = async () => {
      const data = await fetchBranches(token);
      setBranches(data.branches || []);
    };
    getWarehouses();
    getBranches();
  }, [token]);

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  return (
    <div>
      <h2>Warehouse Dashboard</h2>
      <label>
        Select Branch:
        <select value={selectedBranch} onChange={handleBranchChange}>
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </label>
      <ul>
        {warehouses.map((wh) => (
          <li key={wh.id}>{wh.name} - Location: {wh.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseDashboard;
