import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente Navbar siguiendo SRP - solo maneja la barra de navegación superior
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Función para manejar el logout siguiendo SRP
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Forzar navegación al login en caso de error
      navigate('/login');
    }
  };
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
              <i className="bi bi-person-circle me-2"></i>
              {user?.username || 'Usuario'}
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">
                <i className="bi bi-person me-2"></i>Perfil
              </a></li>
              <li><a className="dropdown-item" href="#">
                <i className="bi bi-gear me-2"></i>Configuración
              </a></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button 
                  className="dropdown-item" 
                  onClick={handleLogout}
                  type="button"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;