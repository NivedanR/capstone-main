import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('company');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ username, email, password, confirmPassword, role });
      if (data.success) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert(`Registration failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type="text" value={username}
            onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>Email:
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password:
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>Confirm Password:
          <input type="password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required />
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
