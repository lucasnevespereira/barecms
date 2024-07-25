import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types';


export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }
      const response = await axios.get('/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    error,
    fetchUser,
  };
};
