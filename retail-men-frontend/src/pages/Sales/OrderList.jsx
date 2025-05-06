// src/pages/OrderList.jsx
import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../api/sales';
import { fetchBranches } from '../../api/branch';
import useAuth from '../../hooks/useAuth';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders(token);
      setOrders(data.orders || []);
    };
    const getBranches = async () => {
      const data = await fetchBranches(token);
      setBranches(data.branches || []);
    };
    getOrders();
    getBranches();
  }, [token]);

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  return (
    <div>
      <h2>Order List</h2>
      <label>
        Filter by Branch:
        <select value={selectedBranch} onChange={handleBranchChange}>
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </label>
      <ul>
        {orders
          .filter((order) => !selectedBranch || order.branchId === selectedBranch)
          .map((order) => (
            <li key={order.id}>
              Order ID: {order.id} - Branch: {order.branchId} - Total: ${order.total}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OrderList;
