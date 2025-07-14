import React, { useState, useEffect } from 'react';

// Componente Clientes siguiendo SRP - solo maneja la gestión de clientes
const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  // Simulación de datos iniciales
  useEffect(() => {
    const clientesIniciales = [
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
    ];
    setClientes(clientesIniciales);
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
  const handleOpenModal = (cliente = null) => {
    if (cliente) {
      setEditingClient(cliente);
      setFormData({
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion
      });
    } else {
      setEditingClient(null);
      setFormData({ nombre: '', email: '', telefono: '', direccion: '' });
    }
    setShowModal(true);
  };

  // Principio de responsabilidad única: maneja solo el guardado
  const handleSave = () => {
    if (editingClient) {
      // Editar cliente existente
      setClientes(prev => prev.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...formData }
          : c
      ));
    } else {
      // Crear nuevo cliente
      const newClient = {
        id: Date.now(),
        ...formData
      };
      setClientes(prev => [...prev, newClient]);
    }
    setShowModal(false);
  };

  // Principio de responsabilidad única: maneja solo la eliminación
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      setClientes(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Clientes</h2>
        <button 
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Cliente
        </button>
      </div>

      {/* Tabla de clientes */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.direccion}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleOpenModal(cliente)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(cliente.id)}
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

      {/* Modal para crear/editar cliente */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
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
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <textarea
                      className="form-control"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
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

export default Clientes;