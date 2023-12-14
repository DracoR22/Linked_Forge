import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/v1/auth/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  const refreshUserData = () => {
    // Set loading to true before making the request
    setLoading(true);
    // Fetch fresh data
    fetchUserData();
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};