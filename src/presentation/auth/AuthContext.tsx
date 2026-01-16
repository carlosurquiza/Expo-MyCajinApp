import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { AuthEntity } from '../../domain/entities/auth/auth.entity';

interface AuthContextType {
  user: AuthEntity | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthEntity | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthEntity | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(() => {
    setUser(null);
    // Limpiar credenciales almacenadas de forma asíncrona
    SecureStore.deleteItemAsync('accessToken').catch(() => { });
    SecureStore.deleteItemAsync('refreshToken').catch(() => { });
    SecureStore.deleteItemAsync('userId').catch(() => { });
    SecureStore.deleteItemAsync('email').catch(() => { });
    SecureStore.deleteItemAsync('name').catch(() => { });
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
