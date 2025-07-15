import React from 'react';
import MainLayout from './MainLayout';

// Layout público que extiende MainLayout siguiendo el principio Abierto/Cerrado
// Permite usar MainLayout sin restricciones de autenticación
const PublicLayout = ({ children }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default PublicLayout;