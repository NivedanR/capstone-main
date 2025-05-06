// src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Custom hook to access AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
