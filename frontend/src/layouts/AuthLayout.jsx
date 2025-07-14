import React from 'react';

// Layout para páginas de autenticación (SRP)
const AuthLayout = ({ children }) => (
  <div style={{
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa'
  }}>
    {children}
  </div>
);

export default AuthLayout;
