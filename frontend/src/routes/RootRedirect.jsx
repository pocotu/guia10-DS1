import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente RootRedirect siguiendo SRP
// Su única responsabilidad es manejar la redirección desde la ruta raíz
// según el estado de autenticación del usuario
const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }
  
  // Redirigir según el estado de autenticación
  // Si está autenticado va al dashboard, si no va a la demo del MainLayout
  return isAuthenticated ? 
    <Navigate to="/dashboard" replace /> : 
    <Navigate to="/demo" replace />;
};

export default RootRedirect;