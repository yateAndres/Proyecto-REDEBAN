import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@mail.com" && password === "1234") {
      navigate("/admin");
    } else if (email === "user@mail.com" && password === "1234") {
      navigate("/user");
    } else if (email === "guarda@mail.com" && password === "1234") {
      navigate("/vigilante");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d6efd 0%, #002d72 100%)' }}>
      <div className="card border-0 shadow-lg p-4 p-md-5" style={{ maxWidth: '450px', borderRadius: '1.5rem', width: '90%' }}>
        
        <div className="text-center mb-4">
          {/* Logo o Icono */}
          <div className="bg-primary text-white d-inline-block p-3 rounded-circle mb-3 shadow">
            <i className="bi bi-p-square-fill" style={{ fontSize: '2rem' }}></i>
          </div>
          <h1 className="fw-bold text-primary">ParkLink</h1>
          <p className="text-muted">Gestión inteligente para Redeban</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo Corporativo</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
              <input 
                type="email" 
                className="form-control bg-light border-start-0" 
                placeholder="nombre@mail.com" 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
              <input 
                type="password" 
                className="form-control bg-light border-start-0" 
                placeholder="••••" 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button className="btn btn-primary btn-lg w-100 shadow-sm fw-bold mb-3" style={{ borderRadius: '0.8rem' }}>
            Acceder al Sistema
          </button>
          
          <div className="text-center">
            <small className="text-muted">¿Olvidaste tu contraseña? Contacta a soporte</small>
          </div>
        </form>
      </div>
    </div>
  );
}