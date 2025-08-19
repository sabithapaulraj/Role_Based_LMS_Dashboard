import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Initial state from localStorage
const getInitialAuth = () => {
  const stored = localStorage.getItem('auth');
  return stored ? JSON.parse(stored) : { user: null, role: null };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuth());

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  // Login function
  const login = (user, role) => {
    setAuth({ user, role });
  };

  // Logout function
  const logout = () => {
    setAuth({ user: null, role: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
