// src/api/branch.js
const BRANCH_URL = 'http://localhost:5004';

export const fetchBranches = async (token) => {
  const response = await fetch(`${BRANCH_URL}/branches`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
