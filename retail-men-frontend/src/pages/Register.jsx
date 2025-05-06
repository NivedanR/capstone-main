// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('company');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ email, password, role });
      if (data.success) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password:
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="company">Company</option>
            <option value="warehouse-manager">Warehouse Manager</option>
            <option value="branch-manager">Branch Manager</option>
            <option value="sales">Sales</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a>.</p>
    </div>
  );
};

export default Register;
