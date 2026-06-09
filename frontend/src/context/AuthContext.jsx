/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/api/users/me');
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    localStorage.setItem('token', response.data.access_token);
    
    const userResponse = await api.get('/api/users/me');
    setUser(userResponse.data);
  };

  const register = async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    localStorage.setItem('token', response.data.access_token);
    
    const userResponse = await api.get('/api/users/me');
    setUser(userResponse.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const [globalUserView, setGlobalUserView] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading, globalUserView, setGlobalUserView }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
