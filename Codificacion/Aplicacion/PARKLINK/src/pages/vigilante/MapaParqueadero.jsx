import React from 'react';

const MapaParqueadero = ({ vehiculos, totalCeldas = 20 }) => {
  // Simulamos que las primeras celdas se ocupan según la cantidad de vehículos
  const celdas = Array.from({ length: totalCeldas }, (_, i) => ({
    id: i + 1,
    ocupada: i < vehiculos.length
  }));

  return (
    <div className="p-3">
      <div className="row g-2">
        {celdas.map(celda => (
          <div key={celda.id} className="col-3 col-md-2">
            <div 
              className={`rounded-3 d-flex align-items-center justify-content-center shadow-sm text-white fw-bold`}
              style={{ 
                height: '60px', 
                backgroundColor: celda.ocupada ? '#ff4d4d' : '#2ecc71',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(0,0,0,0.1)'
              }}
            >
              {celda.ocupada ? <i className="bi bi-car-front-fill"></i> : celda.id}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 d-flex justify-content-center gap-4">
        <div className="d-flex align-items-center"><span className="badge me-2" style={{backgroundColor: '#2ecc71'}}> </span> Libre</div>
        <div className="d-flex align-items-center"><span className="badge me-2" style={{backgroundColor: '#ff4d4d'}}> </span> Ocupado</div>
      </div>
    </div>
  );
};

export default MapaParqueadero;