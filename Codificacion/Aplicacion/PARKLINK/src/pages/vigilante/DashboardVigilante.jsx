import React, { useState, useEffect } from 'react';

function DashboardVigilante() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Reloj en tiempo real para el vigilante
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: '#e9ecef', minHeight: '100vh' }}>
      {/* Header Operativo */}
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand mb-0 h1">👮 Control de Acceso - ParkLink</span>
          <span className="text-white fs-5">{currentTime.toLocaleTimeString()}</span>
        </div>
      </nav>

      <div className="container py-4">
        {/* Acciones Rápidas */}
        <div className="row mb-4">
          <div className="col-md-6">
            <button className="btn btn-success btn-lg w-100 py-4 shadow-sm fw-bold">
              ➕ REGISTRAR ENTRADA
            </button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-warning btn-lg w-100 py-4 shadow-sm fw-bold text-dark">
              ➖ REGISTRAR SALIDA
            </button>
          </div>
        </div>

        {/* Listado de Control */}
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0 fw-bold text-secondary">Vehículos en Planta (Sede Principal)</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Empleado</th>
                    <th>Hora de Ingreso</th>
                    <th>Tiempo Transcurrido</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge bg-secondary fs-6">DFG-456</span></td>
                    <td>🚗 Carro</td>
                    <td>Juan Camilo Largo</td>
                    <td>07:15 AM</td>
                    <td><span className="text-primary fw-bold">9h 54min</span></td>
                    <td><button className="btn btn-sm btn-outline-danger">Marcar Salida</button></td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-secondary fs-6">KLM-789</span></td>
                    <td>🏍️ Moto</td>
                    <td>Diego Fernando</td>
                    <td>12:30 PM</td>
                    <td><span className="text-primary fw-bold">4h 39min</span></td>
                    <td><button className="btn btn-sm btn-outline-danger">Marcar Salida</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardVigilante;