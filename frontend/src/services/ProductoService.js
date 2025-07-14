import BaseService from './BaseService';

// Servicio para productos siguiendo el principio de responsabilidad única (SRP)
// y el principio de inversión de dependencias (DIP)
class ProductoService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/productos';
  }

  // Método específico para obtener todos los productos
  async obtenerProductos() {
    try {
      // En un entorno real, esto haría una petición al backend
      // Por ahora simulamos con datos locales
      return this.simularDatos();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  }

  // Método específico para crear un producto
  async crearProducto(producto) {
    try {
      // Validación de datos siguiendo el principio de responsabilidad única
      this.validarProducto(producto);
      
      // En un entorno real: return this.create(this.endpoint, producto);
      return { ...producto, id: Date.now() };
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  // Método específico para actualizar un producto
  async actualizarProducto(id, producto) {
    try {
      this.validarProducto(producto);
      
      // En un entorno real: return this.update(this.endpoint, id, producto);
      return { ...producto, id };
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  // Método específico para eliminar un producto
  async eliminarProducto(id) {
    try {
      // En un entorno real: return this.delete(this.endpoint, id);
      return { success: true, id };
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }

  // Método específico para buscar productos por categoría
  async buscarPorCategoria(categoria) {
    try {
      const productos = await this.obtenerProductos();
      return productos.filter(p => p.categoria === categoria);
    } catch (error) {
      console.error('Error al buscar productos por categoría:', error);
      throw error;
    }
  }

  // Método privado para validación siguiendo SRP
  validarProducto(producto) {
    if (!producto.nombre || producto.nombre.trim() === '') {
      throw new Error('El nombre del producto es requerido');
    }
    
    if (!producto.precio || producto.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    
    if (!producto.categoria || producto.categoria.trim() === '') {
      throw new Error('La categoría es requerida');
    }
    
    if (producto.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
  }

  // Simulación de datos para desarrollo
  simularDatos() {
    return Promise.resolve([
      { id: 1, nombre: 'Laptop HP', precio: 850, categoria: 'Electrónicos', stock: 15 },
      { id: 2, nombre: 'Mouse Logitech', precio: 25, categoria: 'Accesorios', stock: 50 },
      { id: 3, nombre: 'Teclado Mecánico', precio: 120, categoria: 'Accesorios', stock: 30 },
      { id: 4, nombre: 'Monitor Samsung', precio: 300, categoria: 'Electrónicos', stock: 8 }
    ]);
  }
}

// Exportar una instancia única (Singleton pattern)
export default new ProductoService();