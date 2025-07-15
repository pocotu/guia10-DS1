import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Layout principal para páginas protegidas (SRP)
// Aplica estilos de pantalla completa siguiendo principios SOLID
const MainLayout = ({ children }) => (
  <div className="d-flex" style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
    <Sidebar />
    <div className="flex-grow-1 d-flex flex-column" style={{ height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <main className="flex-grow-1 p-4" style={{ overflow: 'auto', height: 'calc(100vh - 60px)' }}>
        {children}
      </main>
    </div>
  </div>
);

export default MainLayout;
