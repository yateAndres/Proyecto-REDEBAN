import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

function Reservar() {

  const [form, setForm] = useState({
    cupo: "",
    fecha: "",
    hora: "",
    tipo: "",
    placa: "",
    cedula: ""
  });

  const [reservas, setReservas] = useState([]);

  // Cargar reservas guardadas al iniciar
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(data);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 VALIDACIÓN COMPLETA
    if (
      !form.cupo ||
      !form.fecha ||
      !form.hora ||
      !form.tipo ||
      !form.placa ||
      !form.cedula
    ) {
      alert("Completa todos los campos");
      return;
    }

    const nuevasReservas = [...reservas, form];

    setReservas(nuevasReservas);
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));

    alert("Reserva exitosa 🚗");

    setForm({
      cupo: "",
      fecha: "",
      hora: "",
      tipo: "",
      placa: "",
      cedula: ""
    });
  };

  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh' }}>

      <Navbar />

      <div className="container py-5">

        {/* FORMULARIO */}
        <div className="card shadow border-0 rounded-4 p-4 mx-auto mb-4" style={{ maxWidth: "500px" }}>

          <h3 className="fw-bold mb-4 text-center">
            📅 Reservar Cupo
          </h3>

          <form onSubmit={handleSubmit}>

            {/* TIPO VEHÍCULO */}
            <div className="mb-3">
              <label className="form-label">Tipo de vehículo</label>
              <select 
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">-- Selecciona --</option>
                <option value="Carro">🚗 Carro</option>
                <option value="Moto">🏍️ Moto</option>
              </select>
            </div>

            {/* PLACA */}
            <div className="mb-3">
              <label className="form-label">Placa</label>
              <input 
                type="text"
                name="placa"
                value={form.placa}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: ABC123"
              />
            </div>

            {/* CÉDULA */}
            <div className="mb-3">
              <label className="form-label">Cédula</label>
              <input 
                type="number"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: 123456789"
              />
            </div>

            {/* CUPOS */}
            <div className="mb-3">
              <label className="form-label">Seleccionar cupo</label>
              <select 
                name="cupo"
                value={form.cupo}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">-- Selecciona --</option>
                <option value="1">Cupo 1</option>
                <option value="2">Cupo 2</option>
                <option value="3">Cupo 3</option>
              </select>
            </div>

            {/* FECHA */}
            <div className="mb-3">
              <label className="form-label">Fecha</label>
              <input 
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* HORA */}
            <div className="mb-3">
              <label className="form-label">Hora</label>
              <input 
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* BOTÓN */}
            <button 
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
            >
              Reservar
            </button>

          </form>
        </div>

        {/* LISTA DE RESERVAS */}
        <div className="card shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "500px" }}>

          <h4 className="fw-bold mb-3">📋 Mis Reservas</h4>

          {reservas.length === 0 ? (
            <p className="text-muted">No hay reservas aún</p>
          ) : (
            <ul className="list-group">
              {reservas.map((r, index) => (
                <li key={index} className="list-group-item">
                  🚗 Tipo: {r.tipo} <br />
                  🔖 Placa: {r.placa} <br />
                  🆔 Cédula: {r.cedula} <br />
                  🅿️ Cupo: {r.cupo} <br />
                  📅 Fecha: {r.fecha} <br />
                  ⏰ Hora: {r.hora}
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>
    </div>
  );
}

export default Reservar;