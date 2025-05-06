// src/api/warehouse.js
const WAREHOUSE_URL = 'http://localhost:5003';

export const fetchWarehouses = async (token) => {
  const response = await fetch(`${WAREHOUSE_URL}/warehouses`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
