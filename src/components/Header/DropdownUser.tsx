import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the user data
interface User {
  _id: string;
  email: string;
  token: string;
  avatar: string;
  name: string;
}

// Define the shape of the context value
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ status: string, message?: string, name?: string }>;
  register: (name: string, email: string, password: string, image: File) => Promise<{ status: string, message?: string }>;
  logout: () => void;
  getUser: (userId: string) => Promise<{ status: string, message?: string, name?: string }>;
}

// Create the UserContext with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component to wrap around the app
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user data from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ status: string, message?: string, name?: string }> => {
    try {
      const response = await fetch('https://cookup-backend.onrender.com/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        const { _id, avatar, name, email } = data.data.user;
        const token = data.data.accessToken;

        const user = { email, token, avatar, name, _id };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return data;
      } else {
        return data;
      }
    } catch (error: any) {
      return { status: 'error', message: error.message || 'An error occurred during login' };
    }
  };

  const register = async (name: string, email: string, password: string, image: File): Promise<{ status: string, message?: string }> => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', image);

      const response = await fetch('https://cookup-backend.onrender.com/api/v1/users/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        return { status: 'success' };
      } else {
        return { status: 'error', message: data.message };
      }
    } catch (error: any) {
      return { status: 'error', message: error.message || 'An error occurred during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getUser = async (userId: string): Promise<{ status: string, message?: string, name?: string }> => {
    try {
      const response = await fetch('https://cookup-backend.onrender.com/api/v1/users/get-user-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred during fetching name');
      }

      const data = await response.json();
      return { status: 'success', name: data.data.name };
    } catch (error: any) {
      return { status: 'error', message: error.message || 'An error occurred during fetching name' };
    }
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
