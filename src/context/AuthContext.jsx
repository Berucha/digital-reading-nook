/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('reading-nook-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Simple client-side authentication for demo purposes
    // In production, this would validate against a backend
    if (username && password) {
      const userData = {
        id: Date.now(),
        username,
        email: `${username}@example.com`,
        createdAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('reading-nook-user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (username, email, password) => {
    // Simple client-side authentication for demo purposes
    if (username && email && password) {
      const userData = {
        id: Date.now(),
        username,
        email,
        createdAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('reading-nook-user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid data' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reading-nook-user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
