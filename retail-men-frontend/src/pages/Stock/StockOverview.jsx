// src/pages/StockOverview.jsx
import React, { useState, useEffect } from 'react';
import { fetchStock } from '../../api/stock';
import { fetchProducts } from '../../api/product';
import useAuth from '../../hooks/useAuth';

const StockOverview = () => {
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const getStock = async () => {
      const data = await fetchStock(token);
      setStock(data.stock || []);
    };
    const getProducts = async () => {
      const data = await fetchProducts(token);
      setProducts(data.products || []);
    };
    getStock();
    getProducts();
  }, [token]);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  return (
    <div>
      <h2>Stock Overview</h2>
      <label>
        Filter by Product:
        <select value={selectedProduct} onChange={handleProductChange}>
          <option value="">All Products</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>{prod.name}</option>
          ))}
        </select>
      </label>
      <ul>
        {stock
          .filter((item) => !selectedProduct || item.productId === selectedProduct)
          .map((item) => (
            <li key={item.id}>
              Product ID: {item.productId} - Quantity: {item.quantity}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StockOverview;
