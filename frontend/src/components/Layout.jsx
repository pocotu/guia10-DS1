import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Componente Layout siguiendo el principio de responsabilidad única (SRP)
// Su única responsabilidad es estructurar el layout general de la aplicación
const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <main className="container-fluid p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;