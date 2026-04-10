import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <h3 className="text-center mb-4">ParkLink</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start">📊 Dashboard</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start">🚗 Vehículos</button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-dark w-100 text-start">👥 Usuarios</button>
          </li>
          <li className="nav-item mt-4">
            <button onClick={handleLogout} className="btn btn-danger w-100">Cerrar Sesión</button>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 p-5">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2>Panel de Control</h2>
          <span className="badge bg-primary p-2">Admin: Activo</span>
        </header>


        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 border-start border-primary border-4">
              <div className="card-body">
                <h6 className="text-muted">Espacios Totales</h6>
                <h2 className="mb-0">120</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 border-start border-success border-4">
              <div className="card-body">
                <h6 className="text-muted">Ocupados</h6>
                <h2 className="mb-0">85</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-4">Últimos Ingresos</h5>
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Placa</th>
                  <th>Propietario</th>
                  <th>Hora Entrada</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XYZ-123</td>
                  <td>Diego Pérez</td>
                  <td>08:30 AM</td>
                  <td><span className="badge bg-success">En Parqueadero</span></td>
                </tr>
                <tr>
                  <td>ABC-789</td>
                  <td>Karen Smith</td>
                  <td>09:15 AM</td>
                  <td><span className="badge bg-success">En Parqueadero</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;