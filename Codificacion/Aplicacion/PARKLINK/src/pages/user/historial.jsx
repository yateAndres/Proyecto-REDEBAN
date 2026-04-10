import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

function Historial() {

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    console.log("DATOS:", data); // debug
    setReservas(data);
  }, []);

  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh' }}>

      <Navbar />

      <div className="container py-5">

        <div className="card shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>

          <h3 className="fw-bold mb-4 text-center">
            📋 Historial de Reservas
          </h3>

          {reservas.length === 0 ? (
            <p className="text-muted text-center">
              No hay historial de reservas
            </p>
          ) : (
            <ul className="list-group">
              {reservas.map((r, index) => (
                <li key={index} className="list-group-item">
                  🚗 Tipo: {r.tipo} <br />
                  🔖 Placa: {r.placa} <br />
                  🆔 Cédula: {r.cedula} <br />
                  🅿️ Cupo: {r.cupo} <br />
                  📅 {r.fecha} <br />
                  ⏰ {r.hora}
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>
    </div>
  );
}

export default Historial;