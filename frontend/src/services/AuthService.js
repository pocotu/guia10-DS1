// Servicio de autenticación siguiendo SRP e Inversión de Dependencias
// Su única responsabilidad es manejar las operaciones de autenticación
class AuthService {
  // Clave para localStorage
  static AUTH_KEY = 'isAuthenticated';
  static USER_KEY = 'userData';

  // Verificar si el usuario está autenticado
  static isAuthenticated() {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  // Obtener datos del usuario
  static getUserData() {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Iniciar sesión
  static login(userData) {
    localStorage.setItem(this.AUTH_KEY, 'true');
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    return Promise.resolve(userData);
  }

  // Cerrar sesión
  static logout() {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_KEY);
    return Promise.resolve();
  }

  // Simular autenticación con credenciales
  static async authenticate(credentials) {
    // Simulación de validación
    if (credentials.username && credentials.password) {
      const userData = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        role: 'admin',
        loginTime: new Date().toISOString()
      };
      
      await this.login(userData);
      return userData;
    }
    
    throw new Error('Credenciales inválidas');
  }

  // Verificar token/sesión (para futuras implementaciones)
  static async verifySession() {
    // Aquí se podría implementar verificación con el backend
    return this.isAuthenticated();
  }
}

export default AuthService;