import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Productos from '../pages/Productos';
import Clientes from '../pages/Clientes';
import Ventas from '../pages/Ventas';
import Usuarios from '../pages/Usuarios';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import RootRedirect from './RootRedirect';

// Router principal siguiendo el principio de responsabilidad única
// Su única responsabilidad es definir y manejar las rutas de la aplicación
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta de demostración del MainLayout (sin autenticación) */}
        <Route path="/demo" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        
        {/* Ruta raíz - redirige según estado de autenticación */}
        <Route path="/" element={<RootRedirect />} />
        
        {/* Rutas protegidas con MainLayout */}
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/productos" element={
          <ProtectedRoute>
            <MainLayout>
              <Productos />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/clientes" element={
          <ProtectedRoute>
            <MainLayout>
              <Clientes />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/ventas" element={
          <ProtectedRoute>
            <MainLayout>
              <Ventas />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/usuarios" element={
          <ProtectedRoute>
            <MainLayout>
              <Usuarios />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Ruta por defecto - redirige al login si no está autenticado */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;