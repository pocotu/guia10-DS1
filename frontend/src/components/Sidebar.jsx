import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Componente Sidebar siguiendo SRP - solo maneja la navegación lateral
const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/productos', label: 'Productos', icon: 'bi-box' },
    { path: '/clientes', label: 'Clientes', icon: 'bi-people' },
    { path: '/ventas', label: 'Ventas', icon: 'bi-cart' },
    { path: '/usuarios', label: 'Usuarios', icon: 'bi-person-badge' }
  ];

  return (
    <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h5 className="text-center">Menú Principal</h5>
        <hr />
        <ul className="nav nav-pills flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item mb-2">
              <Link 
                to={item.path} 
                className={`nav-link ${
                  location.pathname === item.path ? 'active' : 'text-white'
                }`}
              >
                <i className={`${item.icon} me-2`}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;