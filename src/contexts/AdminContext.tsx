import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

interface AdminContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication credentials - should be configured via environment variables
  const adminCredentials = {
    username: process.env.REACT_APP_ADMIN_USERNAME || '',
    password: process.env.REACT_APP_ADMIN_PASSWORD || '',
    email: process.env.REACT_APP_ADMIN_EMAIL || 'admin@heirsofeleusa.com'
  };

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('adminUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Check if credentials are configured
    if (!adminCredentials.username || !adminCredentials.password) {
      console.error('Admin credentials not configured. Please set REACT_APP_ADMIN_USERNAME and REACT_APP_ADMIN_PASSWORD environment variables.');
      setIsLoading(false);
      return false;
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const adminUser: AdminUser = {
        id: '1',
        username: adminCredentials.username,
        email: adminCredentials.email,
        role: 'admin'
      };
      
      setUser(adminUser);
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const value: AdminContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
