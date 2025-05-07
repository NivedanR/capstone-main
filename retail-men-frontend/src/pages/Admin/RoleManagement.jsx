// src/pages/RoleManagement.jsx
import React, { useState, useEffect } from 'react';
import { fetchRoles } from '../../api/auth';
import useAuth from '../../hooks/useAuth';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getRoles = async () => {
      const data = await fetchRoles(token);
      // setRoles(data.roles || []);
      setRoles(data || []);
    };
    getRoles();
  }, [token]);

  return (
    <div>
      <h2>Role Management</h2>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
