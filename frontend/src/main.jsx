import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import Router from './routes/router.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// Configuración principal siguiendo el principio de Inversión de Dependencias
// AuthProvider proporciona el contexto de autenticación a toda la aplicación
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
)
