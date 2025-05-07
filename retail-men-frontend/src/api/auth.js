// src/api/auth.js
const AUTH_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const fetchUsers = async (token) => {
  const response = await fetch(`${AUTH_URL}/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const fetchRoles = async (token) => {
  const response = await fetch(`${AUTH_URL}/roles`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const updateUserRole = async (userId, role, token) => {
  const response = await fetch(`http://localhost:5000/api/auth/users/${userId}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ role })
  });
  return response.json();
};

export const deleteUser = async (userId, token) => {
  const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

