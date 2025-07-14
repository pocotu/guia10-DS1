import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente ProtectedRoute siguiendo SRP
// Su única responsabilidad es verificar la autenticación y proteger rutas
const ProtectedRoute = ({ children }) => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Si está autenticado, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;