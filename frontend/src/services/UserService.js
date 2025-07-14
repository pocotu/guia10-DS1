// Servicio para usuarios siguiendo SRP y DIP
import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/usuarios';
  }

  async obtenerUsuarios() {
    try {
      return this.simularDatos();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  async crearUsuario(usuario) {
    try {
      this.validarUsuario(usuario);
      return { ...usuario, id: Date.now() };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async actualizarUsuario(id, usuario) {
    try {
      this.validarUsuario(usuario);
      return { ...usuario, id };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async eliminarUsuario(id) {
    try {
      return { success: true, id };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  validarUsuario(usuario) {
    if (!usuario.nombre || usuario.nombre.trim() === '') {
      throw new Error('El nombre es requerido');
    }
    if (!usuario.email || usuario.email.trim() === '') {
      throw new Error('El email es requerido');
    }
    if (!this.validarEmail(usuario.email)) {
      throw new Error('El formato del email no es válido');
    }
    if (!usuario.rol || usuario.rol.trim() === '') {
      throw new Error('El rol es requerido');
    }
  }

  validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  simularDatos() {
    return Promise.resolve([
      { id: 1, nombre: 'Admin', email: 'admin@email.com', rol: 'Administrador' },
      { id: 2, nombre: 'Usuario1', email: 'usuario1@email.com', rol: 'Vendedor' },
      { id: 3, nombre: 'Usuario2', email: 'usuario2@email.com', rol: 'Vendedor' }
    ]);
  }
}

export default new UserService();
