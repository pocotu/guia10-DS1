import React from 'react';

// Componente Dashboard siguiendo SRP - solo muestra el panel principal con métricas
const Dashboard = () => {
  // Datos simulados para las métricas
  const metrics = [
    { title: 'Total Productos', value: '150', icon: 'bi-box', color: 'primary' },
    { title: 'Total Clientes', value: '89', icon: 'bi-people', color: 'success' },
    { title: 'Ventas del Mes', value: '$12,450', icon: 'bi-cart', color: 'warning' },
    { title: 'Pedidos Pendientes', value: '23', icon: 'bi-clock', color: 'danger' }
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <small className="text-muted">Resumen general del sistema</small>
      </div>

      {/* Información de demostración */}
      <div className="alert alert-info mb-4">
        <h5><i className="bi bi-info-circle me-2"></i>¡Bienvenido al MainLayout!</h5>
        <p className="mb-2">Esta es la interfaz principal del sistema con MainLayout funcionando correctamente.</p>
        <p className="mb-2"><strong>Para autenticarte:</strong> Ve a "Iniciar Sesión" en el menú lateral</p>
        <p className="mb-0"><strong>Credenciales de prueba:</strong> Usuario: <code>admin</code> | Contraseña: <code>admin</code></p>
      </div>

      {/* Tarjetas de métricas */}
      <div className="row mb-4">
        {metrics.map((metric, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className={`card border-${metric.color}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted">{metric.title}</h6>
                    <h3 className={`text-${metric.color}`}>{metric.value}</h3>
                  </div>
                  <div>
                    <i className={`${metric.icon} fs-1 text-${metric.color}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos y tablas */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Ventas Recientes</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Producto</th>
                      <th>Monto</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#001</td>
                      <td>Juan Pérez</td>
                      <td>Laptop HP</td>
                      <td>$850</td>
                      <td>2024-01-15</td>
                    </tr>
                    <tr>
                      <td>#002</td>
                      <td>María García</td>
                      <td>Mouse Logitech</td>
                      <td>$25</td>
                      <td>2024-01-14</td>
                    </tr>
                    <tr>
                      <td>#003</td>
                      <td>Carlos López</td>
                      <td>Teclado Mecánico</td>
                      <td>$120</td>
                      <td>2024-01-13</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Actividad Reciente</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0">
                  <small className="text-muted">Hace 2 horas</small>
                  <p className="mb-0">Nuevo cliente registrado</p>
                </div>
                <div className="list-group-item border-0 px-0">
                  <small className="text-muted">Hace 4 horas</small>
                  <p className="mb-0">Producto actualizado</p>
                </div>
                <div className="list-group-item border-0 px-0">
                  <small className="text-muted">Hace 6 horas</small>
                  <p className="mb-0">Venta procesada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;