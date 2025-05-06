// src/pages/CompanyList.jsx
import React, { useState, useEffect } from 'react';
import { fetchCompanies } from '../../api/company';
import useAuth from '../../hooks/useAuth';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getCompanies = async () => {
      const data = await fetchCompanies(token);
      setCompanies(data.companies || []);
    };
    getCompanies();
  }, [token]);

  return (
    <div>
      <h2>Company List</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
