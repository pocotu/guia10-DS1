import React, { useState, useEffect } from 'react';

// Formulario reutilizable para crear/editar usuario (SRP)
const UserForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', rol: '' });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select className="form-control" name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Seleccionar rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
        </select>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
};

export default UserForm;
