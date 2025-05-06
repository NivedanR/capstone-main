// src/api/sales.js
const SALES_URL = 'http://localhost:5006';

export const fetchOrders = async (token) => {
  const response = await fetch(`${SALES_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
