// src/pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../api/auth';
import useAuth from '../../hooks/useAuth';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getUsers = async () => {
    //   const data = await fetchUsers(token);
    //   setUsers(data.users || []);
    const data = await fetchUsers(token);
 // if the backend returns the array directly:
 setUsers(Array.isArray(data) ? data : data.users || []);
    };
    getUsers();
  }, [token]);

  return (
    <div>
      <h2>User Management</h2>
      <table className="data-table">
        <thead><tr><th>ID</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
