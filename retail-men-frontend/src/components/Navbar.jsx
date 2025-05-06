// src/components/Navbar.jsx
import React from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <h1>Retail Management System</h1>
      {user && (
        <div className="user-info">
          <span>Logged in as: {user.role}</span>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
