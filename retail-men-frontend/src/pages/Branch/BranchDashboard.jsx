// src/pages/BranchDashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchBranches } from '../../api/branch';
import useAuth from '../../hooks/useAuth';

const BranchDashboard = () => {
  const [branches, setBranches] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getBranches = async () => {
      const data = await fetchBranches(token);
      setBranches(data.branches || []);
    };
    getBranches();
  }, [token]);

  return (
    <div>
      <h2>Branch Dashboard</h2>
      <ul>
        {branches.map((branch) => (
          <li key={branch.id}>{branch.name} - {branch.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default BranchDashboard;
