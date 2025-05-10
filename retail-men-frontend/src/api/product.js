// src/api/product.js
const PRODUCT_URL = 'http://localhost:5002';

export const fetchCompanyProducts = async (companyId, token) => {
  const response = await fetch(`${PRODUCT_URL}/api/products/company/${companyId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
