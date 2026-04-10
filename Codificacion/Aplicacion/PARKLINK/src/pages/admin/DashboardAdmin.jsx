import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapaParqueo from './MapaParqueo'; 

function DashboardAdmin() {
  const navigate = useNavigate();
  const [vista, setVista] = useState('tabla');
  const [celdas, setCeldas] = useState([
    { id: 1, puesto: "A-101", estado: "Sin parqueo", placa: "", tipo: "", ingreso: null },
  ]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const agregarCelda = () => {
  const zonas = ['A', 'B', 'C', 'D', 'E', 'F'];
  // Determinamos la zona según cuántas celdas ya existen
  const zonaActual = zonas[Math.floor(celdas.length / 25)] || 'Z';
  const numeroPuesto = (celdas.length % 25) + 1;
  
  // IMPORTANTE: El formato debe ser "A-01", "B-03", etc.
  const nuevoPuesto = `${zonaActual}-${numeroPuesto.toString().padStart(2, '0')}`;
  
  const nuevaCelda = {
    id: Date.now(), 
    puesto: nuevoPuesto, // <--- Este nombre es el que busca el mapa
    estado: "Sin parqueo",
    placa: "",
    tipo: "",
    ingreso: null
  };

  setCeldas([...celdas, nuevaCelda]);
};

  const eliminarCelda = (id) => {
    if(window.confirm("¿Eliminar esta celda?")) setCeldas(celdas.filter(c => c.id !== id));
  };

  const calcularTiempo = (fechaIngreso) => {
    if (!fechaIngreso) return "00:00:00";
    const diffMs = Date.now() - fechaIngreso;
    const hrs = Math.floor(diffMs / 3600000).toString().padStart(2, '0');
    const mins = Math.floor((diffMs % 3600000) / 60000).toString().padStart(2, '0');
    const segs = Math.floor((diffMs % 60000) / 1000).toString().padStart(2, '0');
    return `${hrs}:${mins}:${segs}`;
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setCeldas(celdas.map(c => {
      if (c.id === id) {
        if (nuevoEstado === "Sin parqueo") return { ...c, estado: nuevoEstado, placa: "", tipo: "", ingreso: null };
        if (nuevoEstado === "En parqueo") return { ...c, estado: nuevoEstado, ingreso: c.ingreso || Date.now() };
        return { ...c, estado: nuevoEstado };
      }
      return c;
    }));
  };

  const actualizarDato = (id, campo, valor) => {
    setCeldas(celdas.map(c => c.id === id ? { ...c, [campo]: valor } : c));
  };


  
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: '250px' }}>
        <h4 className="fw-bold mb-4 text-center">PARKLINK</h4>
        <div className="d-grid gap-3">
          <button onClick={() => setVista('tabla')} className={`btn ${vista === 'tabla' ? 'btn-primary' : 'btn-dark'} text-start`}>📋 Gestión Tabla</button>
          <button onClick={() => setVista('mapa')} className={`btn ${vista === 'mapa' ? 'btn-primary' : 'btn-dark'} text-start`}>🗺️ Mapa Visual</button>
          <hr className="border-secondary" />
          <button onClick={agregarCelda} className="btn btn-success fw-bold py-2 shadow-sm">➕ Añadir Celda</button>
          <button onClick={() => navigate('/login')} className="btn btn-outline-danger btn-sm mt-5">Salir</button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-5">
        {vista === 'mapa' ? (
          <MapaParqueo celdas={celdas} />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h2 className="fw-bold mb-0">Gestión de Celdas</h2>
                <p className="text-muted mb-0">Monitoreo operativo</p>
              </div>
              <div className="d-flex gap-3">
                <div className="text-center px-3 py-2 bg-white shadow-sm rounded-3 border-bottom border-primary border-3">
                  <small className="text-muted d-block fw-bold" style={{ fontSize: '0.7rem' }}>TOTAL</small>
                  <span className="h4 fw-bold">{celdas.length}</span>
                </div>
                <div className="text-center px-3 py-2 bg-white shadow-sm rounded-3 border-bottom border-success border-3">
                  <small className="text-muted d-block fw-bold" style={{ fontSize: '0.7rem' }}>🚗 PARQUEO</small>
                  <span className="h4 fw-bold text-success">{celdas.filter(c => c.estado === "En parqueo").length}</span>
                </div>
                <div className="text-center px-3 py-2 bg-white shadow-sm rounded-3 border-bottom border-warning border-3">
                  <small className="text-muted d-block fw-bold" style={{ fontSize: '0.7rem' }}>📅 RESERVA</small>
                  <span className="h4 fw-bold text-warning">{celdas.filter(c => c.estado === "En reserva").length}</span>
                </div>
              </div>
            </div>

            <div className="card shadow border-0 rounded-4 overflow-hidden">
              <table className="table align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>Placa</th>
                    <th>Vehículo</th>
                    <th>Cronómetro</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {celdas.map((c) => (
                    <tr key={c.id}>
                      <td><input className="form-control form-control-sm border-0 bg-light fw-bold" value={c.puesto} onChange={(e) => actualizarDato(c.id, 'puesto', e.target.value)} /></td>
                      <td>
                        <select className={`form-select form-select-sm text-white fw-bold ${c.estado === 'En parqueo' ? 'bg-success' : c.estado === 'En reserva' ? 'bg-warning text-dark' : 'bg-danger'}`} value={c.estado} onChange={(e) => cambiarEstado(c.id, e.target.value)}>
                          <option value="En parqueo">En parqueo</option>
                          <option value="Sin parqueo">Sin parqueo</option>
                          <option value="En reserva">En reserva</option>
                        </select>
                      </td>
                      <td><input className="form-control form-control-sm font-monospace fw-bold" value={c.placa} placeholder="PLACA" disabled={c.estado === "Sin parqueo"} onChange={(e) => actualizarDato(c.id, 'placa', e.target.value.toUpperCase())} /></td>
                      <td>
                        <select className="form-select form-select-sm" value={c.tipo} disabled={c.estado === "Sin parqueo"} onChange={(e) => actualizarDato(c.id, 'tipo', e.target.value)}>
                          <option value="">--</option>
                          <option value="Carro">Carro</option>
                          <option value="Moto">Moto</option>
                        </select>
                      </td>
                      <td>{c.estado === "En parqueo" ? <span className="badge bg-dark font-monospace p-2">{calcularTiempo(c.ingreso)}</span> : <span className="text-muted small">---</span>}</td>
                      <td><button onClick={() => eliminarCelda(c.id)} className="btn btn-sm btn-outline-danger border-0">🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardAdmin;