import React from 'react';

// Componente Navbar siguiendo SRP - solo maneja la barra de navegación superior
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Sistema de Gestión</span>
        <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle" 
              href="#" 
              role="button" 
              data-bs-toggle="dropdown"
            >
              Usuario
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Perfil</a></li>
              <li><a className="dropdown-item" href="#">Configuración</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;