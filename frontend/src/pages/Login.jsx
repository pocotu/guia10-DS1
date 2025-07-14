import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import AuthService from '../services/AuthService';

// Componente Login siguiendo SRP - solo maneja la autenticación de usuarios
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirigir si ya está autenticado (siguiendo SRP)
  React.useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Mostrar loading mientras se verifica la autenticación inicial
  if (authLoading) {
    return (
      <AuthLayout>
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Principio de responsabilidad única: esta función solo maneja el cambio de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Principio de responsabilidad única: esta función solo maneja el login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Usar AuthService para autenticación (Inversión de Dependencias)
      const userData = await AuthService.authenticate(credentials);
      
      // Actualizar contexto con los datos del usuario
      await login(userData);
      
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
      alert(error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary mb-2">Iniciar Sesión</h2>
            <p className="text-muted">Ingresa tus credenciales para continuar</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="form-label fw-semibold">Usuario</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;