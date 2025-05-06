// src/api/company.js
const COMPANY_URL = 'http://localhost:5001';

export const fetchCompanies = async (token) => {
  const response = await fetch(`${COMPANY_URL}/companies`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
