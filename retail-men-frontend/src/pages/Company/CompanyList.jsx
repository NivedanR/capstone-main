// src/pages/CompanyList.jsx
import React, { useState, useEffect } from 'react';
import { fetchCompanies } from '../../api/company';
import useAuth from '../../hooks/useAuth';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const getCompanies = async () => {
      // const data = await fetchCompanies(token);
      // // setCompanies(data.companies || []);
      // // setCompanies(data || []);
      // setCompanies(Array.isArray(companies) ? companies : companies.companies);
      const data = await fetchCompanies(token);
      console.log('data',data);
     // if your API returns a plain array:
     if (Array.isArray(data)) {
      setCompanies(data);
    } else {
      // or if it wraps: { companies: [...] }
       setCompanies(data.companies || []);
     }
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
