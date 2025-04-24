import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    if (token && !user) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      const responseData: any = response.data;
      setUser(responseData.data.user);
    } catch (err) {
      console.error('Error fetching user data:', err);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: any = await axiosInstance.post('/api/auth/login', { email, password });
      
      const { token, data } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: any = await axiosInstance.post('/api/auth/signup', { name, email, password });
      
      const { token, data } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};