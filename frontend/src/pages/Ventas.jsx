import React, { useState, useEffect } from 'react';

// Componente Ventas siguiendo SRP - solo maneja la gestión de ventas
const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clienteId: '',
    productoId: '',
    cantidad: '',
    descuento: '0'
  });

  // Datos simulados para clientes y productos
  const clientes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' }
  ];

  const productos = [
    { id: 1, nombre: 'Laptop HP', precio: 850 },
    { id: 2, nombre: 'Mouse Logitech', precio: 25 },
    { id: 3, nombre: 'Teclado Mecánico', precio: 120 },
    { id: 4, nombre: 'Monitor Samsung', precio: 300 }
  ];

  // Simulación de datos iniciales de ventas
  useEffect(() => {
    const ventasIniciales = [
      {
        id: 1,
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
        cliente: 'Carlos López',
        producto: 'Teclado Mecánico',
        cantidad: 1,
        precioUnitario: 120,
        descuento: 10,
        total: 110,
        fecha: '2024-01-13'
      }
    ];
    setVentas(ventasIniciales);
  }, []);

  // Principio de responsabilidad única: maneja solo el cambio de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Principio de responsabilidad única: calcula el total de la venta
  const calcularTotal = () => {
    const producto = productos.find(p => p.id === parseInt(formData.productoId));
    if (producto && formData.cantidad) {
      const subtotal = producto.precio * parseInt(formData.cantidad);
      const descuento = parseFloat(formData.descuento) || 0;
      return subtotal - descuento;
    }
    return 0;
  };

  // Principio de responsabilidad única: maneja solo la apertura del modal
  const handleOpenModal = () => {
    setFormData({ clienteId: '', productoId: '', cantidad: '', descuento: '0' });
    setShowModal(true);
  };

  // Principio de responsabilidad única: maneja solo el guardado de ventas
  const handleSave = () => {
    const cliente = clientes.find(c => c.id === parseInt(formData.clienteId));
    const producto = productos.find(p => p.id === parseInt(formData.productoId));
    
    if (cliente && producto && formData.cantidad) {
      const nuevaVenta = {
        id: Date.now(),
        cliente: cliente.nombre,
        producto: producto.nombre,
        cantidad: parseInt(formData.cantidad),
        precioUnitario: producto.precio,
        descuento: parseFloat(formData.descuento) || 0,
        total: calcularTotal(),
        fecha: new Date().toISOString().split('T')[0]
      };
      
      setVentas(prev => [...prev, nuevaVenta]);
      setShowModal(false);
    }
  };

  // Principio de responsabilidad única: maneja solo la eliminación
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta venta?')) {
      setVentas(prev => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Ventas</h2>
        <button 
          className="btn btn-primary"
          onClick={handleOpenModal}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Venta
        </button>
      </div>

      {/* Resumen de ventas */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5>Total Ventas</h5>
              <h3>{ventas.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5>Ingresos Totales</h5>
              <h3>${ventas.reduce((sum, venta) => sum + venta.total, 0)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de ventas */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Descuento</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map(venta => (
                  <tr key={venta.id}>
                    <td>{venta.id}</td>
                    <td>{venta.cliente}</td>
                    <td>{venta.producto}</td>
                    <td>{venta.cantidad}</td>
                    <td>${venta.precioUnitario}</td>
                    <td>${venta.descuento}</td>
                    <td><strong>${venta.total}</strong></td>
                    <td>{venta.fecha}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(venta.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para nueva venta */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nueva Venta</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <select
                      className="form-control"
                      name="clienteId"
                      value={formData.clienteId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar cliente</option>
                      {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Producto</label>
                    <select
                      className="form-control"
                      name="productoId"
                      value={formData.productoId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar producto</option>
                      {productos.map(producto => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre} - ${producto.precio}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descuento ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="descuento"
                      value={formData.descuento}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {formData.productoId && formData.cantidad && (
                    <div className="alert alert-info">
                      <strong>Total: ${calcularTotal()}</strong>
                    </div>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!formData.clienteId || !formData.productoId || !formData.cantidad}
                >
                  Guardar Venta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;