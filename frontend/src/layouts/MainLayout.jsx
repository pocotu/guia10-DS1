import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Layout principal para páginas protegidas (SRP)
const MainLayout = ({ children }) => (
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

export default MainLayout;
