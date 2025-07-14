import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Productos from '../pages/Productos';
import Clientes from '../pages/Clientes';
import Ventas from '../pages/Ventas';
import Usuarios from '../pages/Usuarios';
import Layout from '../components/Layout';
import ProtectedRoute from './ProtectedRoute';

// Router principal siguiendo el principio de responsabilidad única
// Su única responsabilidad es definir y manejar las rutas de la aplicación
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas con Layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Navigate to="/dashboard" replace />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/productos" element={
          <ProtectedRoute>
            <Layout>
              <Productos />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/clientes" element={
          <ProtectedRoute>
            <Layout>
              <Clientes />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/ventas" element={
          <ProtectedRoute>
            <Layout>
              <Ventas />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/usuarios" element={
          <ProtectedRoute>
            <Layout>
              <Usuarios />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Ruta por defecto - redirige al login si no está autenticado */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;