import React from 'react';
import Navbar from '../components/Navbar';

// Layout para páginas administrativas (SRP, extensible)
const AdminLayout = ({ children }) => (
  <div>
    <Navbar />
    <main className="container p-4">
      {children}
    </main>
  </div>
);

export default AdminLayout;
