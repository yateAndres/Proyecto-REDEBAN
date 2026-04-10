import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

function Reporte() {

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(data);
  }, []);

  // 📊 Cálculos
  const total = reservas.length;
  const carros = reservas.filter(r => r.tipo === "Carro").length;
  const motos = reservas.filter(r => r.tipo === "Moto").length;

  // Cupos más usados
  const cuposConteo = {};
  reservas.forEach(r => {
    cuposConteo[r.cupo] = (cuposConteo[r.cupo] || 0) + 1;
  });

  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh' }}>

      <Navbar />

      <div className="container py-5">

        {/* RESUMEN */}
        <div className="row mb-4">

          <div className="col-md-4">
            <div className="card p-3 text-center shadow">
              <h5>Total Reservas</h5>
              <h2>{total}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center shadow">
              <h5>🚗 Carros</h5>
              <h2>{carros}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center shadow">
              <h5>🏍️ Motos</h5>
              <h2>{motos}</h2>
            </div>
          </div>

        </div>

        {/* CUPOS */}
        <div className="card shadow p-4 mb-4">
          <h4>📊 Uso de Cupos</h4>

          {Object.keys(cuposConteo).length === 0 ? (
            <p>No hay datos</p>
          ) : (
            <ul>
              {Object.entries(cuposConteo).map(([cupo, cantidad]) => (
                <li key={cupo}>
                  🅿️ Cupo {cupo}: {cantidad} reservas
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LISTA */}
        <div className="card shadow p-4">
          <h4>📋 Detalle de Reservas</h4>

          {reservas.length === 0 ? (
            <p>No hay reservas</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Placa</th>
                  <th>Cédula</th>
                  <th>Cupo</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((r, i) => (
                  <tr key={i}>
                    <td>{r.tipo}</td>
                    <td>{r.placa}</td>
                    <td>{r.cedula}</td>
                    <td>{r.cupo}</td>
                    <td>{r.fecha}</td>
                    <td>{r.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

      </div>
    </div>
  );
}

export default Reporte;