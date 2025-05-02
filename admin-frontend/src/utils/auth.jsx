import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, refreshToken } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      setToken(response.token);
      setUser(response.user);
      navigate('/dashboard');
      return response;
    } catch (error) {
      throw error;
    }
  };


  const handleLogout = async () => {
    try {
      await logout();
      setToken(null);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRefreshToken = async () => {
    try {
      const response = await refreshToken();
      setToken(response.token);
      return response.token;
    } catch (error) {
      handleLogout();
      throw error;
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login: handleLogin,
    logout: handleLogout,
    refreshToken: handleRefreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};