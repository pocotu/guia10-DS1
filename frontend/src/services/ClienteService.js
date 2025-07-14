import BaseService from './BaseService';

// Servicio para clientes siguiendo SRP y DIP
class ClienteService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/clientes';
  }

  // Método específico para obtener todos los clientes
  async obtenerClientes() {
    try {
      // En un entorno real, esto haría una petición al backend
      return this.simularDatos();
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      throw error;
    }
  }

  // Método específico para crear un cliente
  async crearCliente(cliente) {
    try {
      this.validarCliente(cliente);
      
      // En un entorno real: return this.create(this.endpoint, cliente);
      return { ...cliente, id: Date.now() };
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw error;
    }
  }

  // Método específico para actualizar un cliente
  async actualizarCliente(id, cliente) {
    try {
      this.validarCliente(cliente);
      
      // En un entorno real: return this.update(this.endpoint, id, cliente);
      return { ...cliente, id };
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw error;
    }
  }

  // Método específico para eliminar un cliente
  async eliminarCliente(id) {
    try {
      // En un entorno real: return this.delete(this.endpoint, id);
      return { success: true, id };
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      throw error;
    }
  }

  // Método específico para buscar clientes por nombre
  async buscarPorNombre(nombre) {
    try {
      const clientes = await this.obtenerClientes();
      return clientes.filter(c => 
        c.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
    } catch (error) {
      console.error('Error al buscar clientes por nombre:', error);
      throw error;
    }
  }

  // Método específico para validar email
  validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método privado para validación siguiendo SRP
  validarCliente(cliente) {
    if (!cliente.nombre || cliente.nombre.trim() === '') {
      throw new Error('El nombre del cliente es requerido');
    }
    
    if (!cliente.email || cliente.email.trim() === '') {
      throw new Error('El email es requerido');
    }
    
    if (!this.validarEmail(cliente.email)) {
      throw new Error('El formato del email no es válido');
    }
    
    if (cliente.telefono && cliente.telefono.length < 10) {
      throw new Error('El teléfono debe tener al menos 10 dígitos');
    }
  }

  // Simulación de datos para desarrollo
  simularDatos() {
    return Promise.resolve([
      { 
        id: 1, 
        nombre: 'Juan Pérez', 
        email: 'juan@email.com', 
        telefono: '123-456-7890', 
        direccion: 'Calle 123, Ciudad' 
      },
      { 
        id: 2, 
        nombre: 'María García', 
        email: 'maria@email.com', 
        telefono: '098-765-4321', 
        direccion: 'Avenida 456, Ciudad' 
      },
      { 
        id: 3, 
        nombre: 'Carlos López', 
        email: 'carlos@email.com', 
        telefono: '555-123-4567', 
        direccion: 'Plaza 789, Ciudad' 
      }
    ]);
  }
}

// Exportar una instancia única (Singleton pattern)
export default new ClienteService();