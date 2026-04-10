import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

function Cancelar() {

  const [reservas, setReservas] = useState([]);

  // Cargar reservas al iniciar
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(data);
  }, []);

  // ❌ Cancelar reserva
  const cancelarReserva = (index) => {

    const confirmar = window.confirm("¿Seguro que quieres cancelar esta reserva?");
    if (!confirmar) return;

    const nuevasReservas = reservas.filter((_, i) => i !== index);

    setReservas(nuevasReservas);
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
  };

  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh' }}>

      <Navbar />

      <div className="container py-5">

        <div className="card shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "600px" }}>

          <h3 className="fw-bold mb-4 text-center">
            ❌ Cancelar Reserva
          </h3>

          {reservas.length === 0 ? (
            <p className="text-muted text-center">
              No tienes reservas para cancelar
            </p>
          ) : (
            <ul className="list-group">

              {reservas.map((r, index) => (
                <li 
                  key={index} 
                  className="list-group-item d-flex justify-content-between align-items-center"
                >

                  <div>
                    🚗 Tipo: {r.tipo} <br />
                    🔖 Placa: {r.placa} <br />
                    🆔 Cédula: {r.cedula} <br />
                    🅿️ Cupo: {r.cupo} <br />
                    📅 {r.fecha} <br />
                    ⏰ {r.hora}
                  </div>

                  <button 
                    onClick={() => cancelarReserva(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Cancelar
                  </button>

                </li>
              ))}

            </ul>
          )}

        </div>

      </div>
    </div>
  );
}

export default Cancelar;