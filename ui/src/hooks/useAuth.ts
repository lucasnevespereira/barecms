import { useState } from 'react';
import axios from 'axios';

interface AuthResponse {
  token?: string;
  error?: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoading(false);
      return { token };
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      return { error: err.response?.data?.error || 'An error occurred. Please try again.' };
    }
  };

  const register = async (email: string, username: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', { email, username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoading(false);
      return { token };
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      return { error: err.response?.data?.error || 'An error occurred. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return {
    loading,
    error,
    login,
    register,
    logout,
  };
};
