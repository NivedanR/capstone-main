// src/api/stock.js
const STOCK_URL = 'http://localhost:5005';

export const fetchStock = async (token) => {
  const response = await fetch(`${STOCK_URL}/stock`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
