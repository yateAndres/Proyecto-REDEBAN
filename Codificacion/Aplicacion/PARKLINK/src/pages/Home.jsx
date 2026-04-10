import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
      {/* Tarjeta Principal */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '850px', width: '100%' }}>
        <div className="row g-0">
          
          {/* Lado Izquierdo: Bienvenida (Color) */}
          <div className="col-md-5 bg-primary text-white d-flex flex-column align-items-center justify-content-center p-5 text-center">
            <div style={{ fontSize: '4rem' }} className="mb-3">🚗</div>
            <h1 className="fw-bold">ParkLink</h1>
            <p className="opacity-75">Sistema de Gestión de Parqueaderos para Empleados</p>
          </div>

          {/* Lado Derecho: Botones */}
          <div className="col-md-7 bg-white p-4 p-md-5">
            <div className="mb-4">
              <h2 className="fw-bold text-dark">¡Hola!</h2>
              <p className="text-muted">Bienvenido al portal de acceso. Selecciona una opción:</p>
            </div>

            <div className="d-grid gap-3">
              {/* Botón Login */}
              <Link to="/login" className="btn btn-primary btn-lg py-3 rounded-3 shadow-sm fw-bold">
                Entrar a mi cuenta
              </Link>
              
              {/* Botón Registro */}
              <Link to="/register" className="btn btn-outline-dark btn-lg py-3 rounded-3 fw-bold">
                Registrarme
              </Link>
            </div>

            <div className="mt-5 pt-4 border-top">
              <div className="row text-center g-2">
                <div className="col-4">
                  <div className="fw-bold text-primary">🛡️</div>
                  <small className="text-muted" style={{ fontSize: '0.7rem' }}>Redeban</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold text-primary">⚡</div>
                  <small className="text-muted" style={{ fontSize: '0.7rem' }}>Rápido</small>
                </div>
                <div className="col-4">
                  <div className="fw-bold text-primary">💼</div>
                  <small className="text-muted" style={{ fontSize: '0.7rem' }}>Corporativo</small>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}