import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

// Contexto de autenticación siguiendo el principio de Inversión de Dependencias
// Abstrae la lógica de autenticación del resto de componentes
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
// Siguiendo el principio de responsabilidad única
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Provider de autenticación siguiendo SRP
// Su única responsabilidad es manejar el estado de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Verificar autenticación al cargar la aplicación usando AuthService
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await AuthService.verifySession();
        const userData = AuthService.getUserData();
        
        setIsAuthenticated(authStatus);
        setUser(userData);
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión usando AuthService
  const login = async (userData) => {
    try {
      await AuthService.login(userData);
      setIsAuthenticated(true);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  // Función para cerrar sesión usando AuthService
  const logout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;