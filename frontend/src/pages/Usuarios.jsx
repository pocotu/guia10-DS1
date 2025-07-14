import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import UserForm from '../components/UserForm';

// Página de gestión de usuarios (SRP)
const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    UserService.obtenerUsuarios().then(setUsuarios);
  }, []);

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    try {
      let usuario;
      if (editingUser) {
        usuario = await UserService.actualizarUsuario(editingUser.id, data);
        setUsuarios(prev => prev.map(u => u.id === editingUser.id ? usuario : u));
      } else {
        usuario = await UserService.crearUsuario(data);
        setUsuarios(prev => [...prev, usuario]);
      }
      setShowModal(false);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      await UserService.eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Usuarios</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <i className="bi bi-plus-circle me-2"></i>Nuevo Usuario
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(usuario)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(usuario.id)}>
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
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <UserForm initialData={editingUser} onSave={handleSave} onCancel={() => setShowModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
