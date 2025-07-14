import BaseService from './BaseService';
import ProductoService from './ProductoService';
import ClienteService from './ClienteService';

// Servicio para ventas siguiendo SRP y DIP
class VentaService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/ventas';
  }

  // Método específico para obtener todas las ventas
  async obtenerVentas() {
    try {
      return this.simularDatos();
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      throw error;
    }
  }

  // Método específico para crear una venta
  async crearVenta(venta) {
    try {
      await this.validarVenta(venta);
      
      // Calcular el total de la venta
      const ventaCompleta = await this.calcularVenta(venta);
      
      // En un entorno real: return this.create(this.endpoint, ventaCompleta);
      return { ...ventaCompleta, id: Date.now() };
    } catch (error) {
      console.error('Error al crear venta:', error);
      throw error;
    }
  }

  // Método específico para eliminar una venta
  async eliminarVenta(id) {
    try {
      // En un entorno real: return this.delete(this.endpoint, id);
      return { success: true, id };
    } catch (error) {
      console.error('Error al eliminar venta:', error);
      throw error;
    }
  }

  // Método específico para obtener ventas por cliente
  async obtenerVentasPorCliente(clienteId) {
    try {
      const ventas = await this.obtenerVentas();
      return ventas.filter(v => v.clienteId === clienteId);
    } catch (error) {
      console.error('Error al obtener ventas por cliente:', error);
      throw error;
    }
  }

  // Método específico para obtener ventas por fecha
  async obtenerVentasPorFecha(fechaInicio, fechaFin) {
    try {
      const ventas = await this.obtenerVentas();
      return ventas.filter(v => {
        const fechaVenta = new Date(v.fecha);
        return fechaVenta >= new Date(fechaInicio) && fechaVenta <= new Date(fechaFin);
      });
    } catch (error) {
      console.error('Error al obtener ventas por fecha:', error);
      throw error;
    }
  }

  // Método específico para calcular estadísticas de ventas
  async obtenerEstadisticas() {
    try {
      const ventas = await this.obtenerVentas();
      
      return {
        totalVentas: ventas.length,
        ingresoTotal: ventas.reduce((sum, venta) => sum + venta.total, 0),
        ventaPromedio: ventas.length > 0 ? 
          ventas.reduce((sum, venta) => sum + venta.total, 0) / ventas.length : 0,
        productoMasVendido: this.obtenerProductoMasVendido(ventas)
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }

  // Método privado para calcular una venta siguiendo SRP
  async calcularVenta(venta) {
    const productos = await ProductoService.obtenerProductos();
    const clientes = await ClienteService.obtenerClientes();
    
    const producto = productos.find(p => p.id === parseInt(venta.productoId));
    const cliente = clientes.find(c => c.id === parseInt(venta.clienteId));
    
    if (!producto || !cliente) {
      throw new Error('Producto o cliente no encontrado');
    }
    
    const subtotal = producto.precio * parseInt(venta.cantidad);
    const descuento = parseFloat(venta.descuento) || 0;
    const total = subtotal - descuento;
    
    return {
      ...venta,
      cliente: cliente.nombre,
      producto: producto.nombre,
      precioUnitario: producto.precio,
      subtotal,
      total,
      fecha: new Date().toISOString().split('T')[0]
    };
  }

  // Método privado para validación siguiendo SRP
  async validarVenta(venta) {
    if (!venta.clienteId) {
      throw new Error('El cliente es requerido');
    }
    
    if (!venta.productoId) {
      throw new Error('El producto es requerido');
    }
    
    if (!venta.cantidad || parseInt(venta.cantidad) <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }
    
    if (venta.descuento && parseFloat(venta.descuento) < 0) {
      throw new Error('El descuento no puede ser negativo');
    }
    
    // Validar que el producto tenga suficiente stock
    const productos = await ProductoService.obtenerProductos();
    const producto = productos.find(p => p.id === parseInt(venta.productoId));
    
    if (producto && producto.stock < parseInt(venta.cantidad)) {
      throw new Error(`Stock insuficiente. Disponible: ${producto.stock}`);
    }
  }

  // Método privado para obtener el producto más vendido
  obtenerProductoMasVendido(ventas) {
    const conteoProductos = {};
    
    ventas.forEach(venta => {
      const producto = venta.producto;
      conteoProductos[producto] = (conteoProductos[producto] || 0) + venta.cantidad;
    });
    
    let productoMasVendido = '';
    let maxCantidad = 0;
    
    Object.entries(conteoProductos).forEach(([producto, cantidad]) => {
      if (cantidad > maxCantidad) {
        maxCantidad = cantidad;
        productoMasVendido = producto;
      }
    });
    
    return { producto: productoMasVendido, cantidad: maxCantidad };
  }

  // Simulación de datos para desarrollo
  simularDatos() {
    return Promise.resolve([
      {
        id: 1,
        clienteId: 1,
        productoId: 1,
        cliente: 'Juan Pérez',
        producto: 'Laptop HP',
        cantidad: 1,
        precioUnitario: 850,
        descuento: 0,
        total: 850,
        fecha: '2024-01-15'
      },
      {
        id: 2,
        clienteId: 2,
        productoId: 2,
        cliente: 'María García',
        producto: 'Mouse Logitech',
        cantidad: 2,
        precioUnitario: 25,
        descuento: 5,
        total: 45,
        fecha: '2024-01-14'
      },
      {
        id: 3,
        clienteId: 3,
        productoId: 3,
        cliente: 'Carlos López',
        producto: 'Teclado Mecánico',
        cantidad: 1,
        precioUnitario: 120,
        descuento: 10,
        total: 110,
        fecha: '2024-01-13'
      }
    ]);
  }
}

// Exportar una instancia única (Singleton pattern)
export default new VentaService();