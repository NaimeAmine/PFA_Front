import React, { createContext, useState, ReactNode } from "react";

// Define the shape of your auth context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the initial state of your auth context
const initialAuthState: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

// Create the auth context
export const AuthContext = createContext<AuthContextType>(initialAuthState);

// Define the props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Implement your login logic here
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
