import React, { useState, useEffect } from 'react';

// --- COMPONENTE INTERNO: MAPA INTERACTIVO ---
const MapaParqueadero = ({ vehiculos, totalCeldas }) => {
  const celdas = Array.from({ length: totalCeldas }, (_, i) => {
    const numeroCelda = i + 1;
    const vehiculoEnCelda = vehiculos.find(v => v.celda === numeroCelda);
    return { id: numeroCelda, ocupada: !!vehiculoEnCelda, placa: vehiculoEnCelda?.placa };
  });

  return (
    <div className="p-3">
      <div className="row g-2">
        {celdas.map(celda => (
          <div key={celda.id} className="col-3 col-md-2">
            <div 
              className="rounded-3 d-flex flex-column align-items-center justify-content-center shadow-sm text-white fw-bold"
              style={{ 
                height: '75px', 
                backgroundColor: celda.ocupada ? '#dc3545' : '#198754',
                border: '2px solid rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}
            >
              <span style={{ fontSize: '0.6rem', opacity: 0.9 }}>C-{celda.id}</span>
              {celda.ocupada ? <i className="bi bi-car-front-fill fs-4"></i> : <i className="bi bi-pin-map"></i>}
              {celda.ocupada && <span style={{ fontSize: '0.65rem' }}>{celda.placa}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 d-flex justify-content-center gap-3">
        <small><span className="badge bg-success"> </span> Disponible</small>
        <small><span className="badge bg-danger"> </span> Ocupado</small>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL: DASHBOARD ---
export default function DashboardVigilante() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMap, setShowMap] = useState(false);
  const TOTAL_CUPOS = 20;

  // Estado de los vehículos registrados
  const [vehiculos, setVehiculos] = useState([
    { id: 1, placa: 'DFG-456', empleado: 'Juan Camilo Largo', ingreso: '07:15 AM', celda: 5 },
    { id: 2, placa: 'KLM-789', empleado: 'Diego Fernando', ingreso: '12:30 PM', celda: 12 }
  ]);

  // Actualización del reloj
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cálculos de ocupación
  const cuposLibres = TOTAL_CUPOS - vehiculos.length;
  const porcentaje = Math.round((vehiculos.length / TOTAL_CUPOS) * 100);

  // Lógica: Registrar Entrada
  const registrarEntrada = () => {
    if (cuposLibres <= 0) return alert("Parqueadero lleno");
    
    const placa = prompt("Ingrese la placa del vehículo:");
    if (!placa) return;

    const numeroCelda = prompt("Asigne un número de celda (1 al 20):");
    const num = parseInt(numeroCelda);

    if (isNaN(num) || num < 1 || num > TOTAL_CUPOS) return alert("Número de celda inválido.");
    if (vehiculos.some(v => v.celda === num)) return alert(`La celda ${num} ya está ocupada.`);

    const nuevo = {
      id: Date.now(),
      placa: placa.toUpperCase(),
      empleado: "Usuario Redeban",
      ingreso: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      celda: num
    };
    setVehiculos([...vehiculos, nuevo]);
  };

  // Lógica: Salida Rápida (Botón Superior)
  const registrarSalidaRapida = () => {
    const busqueda = prompt("Ingrese PLACA o NÚMERO DE CELDA para dar salida:");
    if (!busqueda) return;

    const encontrado = vehiculos.find(v => 
      v.placa === busqueda.toUpperCase() || v.celda === parseInt(busqueda)
    );

    if (encontrado) {
      if (window.confirm(`¿Confirmar salida del vehículo ${encontrado.placa}?`)) {
        setVehiculos(vehiculos.filter(v => v.id !== encontrado.id));
      }
    } else {
      alert("No se encontró ningún vehículo con esos datos.");
    }
  };

  // Lógica: Salida desde la Tabla
  const registrarSalida = (id) => {
    if (window.confirm("¿Confirmar salida?")) {
      setVehiculos(vehiculos.filter(v => v.id !== id));
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingBottom: '50px' }}>
      {/* Header */}
      <nav className="navbar navbar-dark shadow-sm mb-4" style={{ background: 'linear-gradient(90deg, #002d72 0%, #0056b3 100%)' }}>
        <div className="container">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-shield-lock-fill me-2"></i> ParkLink | Control de Acceso
          </span>
          <span className="text-white fw-bold">
            <i className="bi bi-clock-fill me-2"></i> {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </nav>

      <div className="container">
        {/* PANEL DE ACCIONES (ACTUALIZADO: ENTRADA ANTES QUE SALIDA) */}
        <div className="row g-3 mb-4 text-center">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 rounded-4 h-100 justify-content-center">
              <small className="text-muted fw-bold">OCUPACIÓN</small>
              <h3 className={`fw-bold mb-0 ${porcentaje > 80 ? 'text-danger' : 'text-primary'}`}>{porcentaje}%</h3>
              <div className="progress mt-2" style={{ height: '6px' }}>
                <div className={`progress-bar ${porcentaje > 80 ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${porcentaje}%` }}></div>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="card border-0 shadow-sm p-3 rounded-4 h-100 justify-content-center border-start border-success border-4">
              <small className="text-muted fw-bold">CELDAS LIBRES</small>
              <h3 className="fw-bold text-success mb-0">{cuposLibres}</h3>
            </div>
          </div>

          {/* Botón MAPA */}
          <div className="col-md-2">
            <button onClick={() => setShowMap(true)} className="btn btn-info w-100 h-100 text-white fw-bold rounded-4 shadow-sm border-0">
              <i className="bi bi-map-fill d-block fs-3"></i> MAPA
            </button>
          </div>

          {/* Botón ENTRADA (Ahora en esta posición) */}
          <div className="col-md-3">
            <button onClick={registrarEntrada} className="btn btn-success w-100 h-100 fw-bold rounded-4 shadow-sm border-0 py-3">
              <i className="bi bi-plus-circle-fill d-block fs-2 mb-1"></i> ENTRADA
            </button>
          </div>

          {/* Botón SALIDA (Ahora al final) */}
          <div className="col-md-2">
            <button onClick={registrarSalidaRapida} className="btn btn-danger w-100 h-100 fw-bold rounded-4 shadow-sm border-0">
              <i className="bi bi-dash-circle-fill d-block fs-3"></i> SALIDA
            </button>
          </div>
        </div>

        {/* TABLA DE VEHÍCULOS */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-white py-3 border-0">
            <h5 className="mb-0 fw-bold text-dark text-center">Vehículos en Planta - Sede Principal Redeban</h5>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0 text-center">
              <thead className="table-light text-muted small">
                <tr>
                  <th className="ps-4">PLACA</th>
                  <th>EMPLEADO</th>
                  <th>CELDA ASIGNADA</th>
                  <th>HORA INGRESO</th>
                  <th>ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map(v => (
                  <tr key={v.id}>
                    <td className="ps-4">
                        <span className="bg-dark text-white fw-bold px-3 py-1 rounded shadow-sm">
                            {v.placa}
                        </span>
                    </td>
                    <td className="fw-semibold text-secondary">{v.empleado}</td>
                    <td>
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 rounded-pill fw-bold">
                            P-{v.celda < 10 ? `0${v.celda}` : v.celda}
                        </span>
                    </td>
                    <td><i className="bi bi-clock me-1 opacity-50"></i> {v.ingreso}</td>
                    <td>
                      <button onClick={() => registrarSalida(v.id)} className="btn btn-sm btn-outline-danger rounded-pill px-3">
                        Dar Salida
                      </button>
                    </td>
                  </tr>
                ))}
                {vehiculos.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-5 text-muted">No hay vehículos registrados en este momento.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL DEL MAPA */}
        {showMap && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header bg-primary text-white border-0">
                  <h5 className="modal-title fw-bold"><i className="bi bi-geo-alt-fill me-2"></i>Estado de Celdas Real</h5>
                  <button onClick={() => setShowMap(false)} className="btn-close btn-close-white"></button>
                </div>
                <div className="modal-body bg-light p-4">
                  <MapaParqueadero vehiculos={vehiculos} totalCeldas={TOTAL_CUPOS} />
                </div>
                <div className="modal-footer border-0">
                  <button onClick={() => setShowMap(false)} className="btn btn-secondary rounded-pill px-4">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}