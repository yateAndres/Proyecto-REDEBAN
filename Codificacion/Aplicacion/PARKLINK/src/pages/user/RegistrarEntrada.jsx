import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrarEntrada() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    placa: '',
    tipo: 'Automóvil',
    detalles: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
    alert("¡Ingreso registrado exitosamente!");
    navigate('/user'); // Volver al dashboard después de registrar
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white py-3">
              <h4 className="mb-0">Registrar Ingreso</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Número de Placa</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg text-uppercase" 
                    placeholder="ABC-123"
                    onChange={(e) => setFormData({...formData, placa: e.target.value})}
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Tipo de Vehículo</label>
                  <select 
                    className="form-select form-select-lg"
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  >
                    <option value="Automóvil">Automóvil</option>
                    <option value="Motocicleta">Motocicleta</option>
                    <option value="Bicicleta">Bicicleta</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Observaciones (Opcional)</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Ej: Casco en el baúl, rayón en puerta izquierda..."
                    onChange={(e) => setFormData({...formData, detalles: e.target.value})}
                  ></textarea>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill">
                    Confirmar Ingreso
                  </button>
                  <button 
                    type="button" 
                    onClick={() => navigate('/user')} 
                    className="btn btn-link text-muted"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarEntrada;