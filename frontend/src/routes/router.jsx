import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Productos from '../pages/Productos';
import Clientes from '../pages/Clientes';
import Ventas from '../pages/Ventas';
import Usuarios from '../pages/Usuarios';
import PublicLayout from '../layouts/PublicLayout';
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
        
        {/* Ruta raíz - inicia directamente en PublicLayout con Dashboard */}
        <Route path="/" element={
          <PublicLayout>
            <Dashboard />
          </PublicLayout>
        } />
        
        {/* Rutas públicas con PublicLayout (acceso directo sin autenticación) */}
        
        <Route path="/dashboard" element={
          <PublicLayout>
            <Dashboard />
          </PublicLayout>
        } />
        
        <Route path="/productos" element={
          <PublicLayout>
            <Productos />
          </PublicLayout>
        } />
        
        <Route path="/clientes" element={
          <PublicLayout>
            <Clientes />
          </PublicLayout>
        } />
        
        <Route path="/ventas" element={
          <PublicLayout>
            <Ventas />
          </PublicLayout>
        } />
        <Route path="/usuarios" element={
          <PublicLayout>
            <Usuarios />
          </PublicLayout>
        } />
        
        {/* Ruta por defecto - redirige al dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;