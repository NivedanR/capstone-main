// src/api/product.js
const PRODUCT_URL = 'http://localhost:5002';

export const fetchProducts = async (token) => {
  const response = await fetch(`${PRODUCT_URL}/products`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
