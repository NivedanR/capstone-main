import React, { useState, useEffect } from 'react';
import { fetchUsers, updateUserRole, deleteUser } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../constants/roles';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    loadUsers();
  }, [token]);

  const loadUsers = async () => {
    const data = await fetchUsers(token);
    console.log('Fetched users:', data); // Debug log
    setUsers(Array.isArray(data) ? data : (data.users || []));
  };

  const handleRoleChange = async (userId, newRole) => {
    const result = await updateUserRole(userId, newRole, token);
    alert(result.message);
    loadUsers();
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const result = await deleteUser(userId, token);
      alert(result.message);
      loadUsers();
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={e => handleRoleChange(u._id, e.target.value)}
                >
                  {Object.values(ROLES).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
