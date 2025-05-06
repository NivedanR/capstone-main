// src/pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/product';
import useAuth from '../../hooks/useAuth';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(token);
      setProducts(data.products || []);
    };
    getProducts();
  }, [token]);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>{prod.name} - ${prod.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
