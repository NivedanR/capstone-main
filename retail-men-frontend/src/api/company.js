// src/api/company.js

const COMPANY_URL = process.env.REACT_APP_COMPANY_URL; 

export const fetchCompanies = async (token) => {
  const response = await fetch(`${COMPANY_URL}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    mode: 'cors',                // optional, but explicit
    credentials: 'include', 
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }
  return response.json();
};
