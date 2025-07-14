import React, { useState, useEffect } from 'react';

// Componente Productos siguiendo SRP - solo maneja la gestión de productos
const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    stock: ''
  });

  // Simulación de datos iniciales
  useEffect(() => {
    const productosIniciales = [
      { id: 1, nombre: 'Laptop HP', precio: 850, categoria: 'Electrónicos', stock: 15 },
      { id: 2, nombre: 'Mouse Logitech', precio: 25, categoria: 'Accesorios', stock: 50 },
      { id: 3, nombre: 'Teclado Mecánico', precio: 120, categoria: 'Accesorios', stock: 30 },
      { id: 4, nombre: 'Monitor Samsung', precio: 300, categoria: 'Electrónicos', stock: 8 }
    ];
    setProductos(productosIniciales);
  }, []);

  // Principio de responsabilidad única: maneja solo el cambio de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Principio de responsabilidad única: maneja solo la apertura del modal
  const handleOpenModal = (producto = null) => {
    if (producto) {
      setEditingProduct(producto);
      setFormData({
        nombre: producto.nombre,
        precio: producto.precio.toString(),
        categoria: producto.categoria,
        stock: producto.stock.toString()
      });
    } else {
      setEditingProduct(null);
      setFormData({ nombre: '', precio: '', categoria: '', stock: '' });
    }
    setShowModal(true);
  };

  // Principio de responsabilidad única: maneja solo el guardado
  const handleSave = () => {
    if (editingProduct) {
      // Editar producto existente
      setProductos(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, precio: parseFloat(formData.precio), stock: parseInt(formData.stock) }
          : p
      ));
    } else {
      // Crear nuevo producto
      const newProduct = {
        id: Date.now(),
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      };
      setProductos(prev => [...prev, newProduct]);
    }
    setShowModal(false);
  };

  // Principio de responsabilidad única: maneja solo la eliminación
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      setProductos(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <button 
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Producto
        </button>
      </div>

      {/* Tabla de productos */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      <span className={`badge ${
                        producto.stock > 20 ? 'bg-success' : 
                        producto.stock > 10 ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleOpenModal(producto)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(producto.id)}
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

      {/* Modal para crear/editar producto */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      name="precio"
                      value={formData.precio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                      className="form-control"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="Electrónicos">Electrónicos</option>
                      <option value="Accesorios">Accesorios</option>
                      <option value="Software">Software</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                    />
                  </div>
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
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;