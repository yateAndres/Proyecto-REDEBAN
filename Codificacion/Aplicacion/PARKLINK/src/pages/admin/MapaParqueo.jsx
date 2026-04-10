import React, { useState } from 'react';

function MapaParqueo({ celdas }) {
  const [nivel, setNivel] = useState(1);

  const getEstadoCelda = (puestoID) => {
    const celdaInfo = celdas.find(c => c.puesto.toUpperCase() === puestoID);
    if (!celdaInfo) return { color: '#334155', label: 'Vacio', activo: false };
    if (celdaInfo.estado === "En parqueo") return { color: '#ef4444', label: 'Ocupado', activo: true };
    if (celdaInfo.estado === "En reserva") return { color: '#f59e0b', label: 'Reserva', activo: true };
    return { color: '#10b981', label: 'Libre', activo: true };
  };

  // Renderizador de bahías de parqueo (Estilo espina con topes)
  const renderBahia = (zona, inicio, fin, orientacion = 'H') => (
    <div className={`d-flex ${orientacion === 'V' ? 'flex-column' : 'flex-row'} gap-1`}>
      {Array.from({ length: fin - inicio + 1 }, (_, i) => {
        const num = inicio + i;
        const id = `${zona}-${num.toString().padStart(2, '0')}`;
        const st = getEstadoCelda(id);
        return (
          <div key={id} style={{
            width: orientacion === 'V' ? '55px' : '30px',
            height: orientacion === 'V' ? '30px' : '55px',
            backgroundColor: st.color,
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '0.55rem', fontWeight: 'bold',
            color: st.activo ? (st.color === '#f59e0b' ? '#000' : '#fff') : '#475569',
            boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.2)'
          }}>
            <span style={{fontSize: '0.4rem'}}>{zona}</span>{num}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="bg-white p-3 rounded-top shadow-sm d-flex justify-content-between align-items-center border-bottom">
        <div>
          <h5 className="fw-bold mb-0">Control de Estacionamiento Estructural</h5>
          <small className="text-muted">Redeban Sede Principal | Área Total: 5.200m²</small>
        </div>
        <div className="btn-group btn-group-sm">
          <button onClick={() => setNivel(1)} className={`btn ${nivel === 1 ? 'btn-dark' : 'btn-outline-dark'}`}>SÓTANO 1</button>
          <button onClick={() => setNivel(2)} className={`btn ${nivel === 2 ? 'btn-dark' : 'btn-outline-dark'}`}>SÓTANO 2</button>
        </div>
      </div>

      <div className="bg-dark p-3 shadow-lg" style={{ minHeight: '600px', position: 'relative' }}>
        {/* LEYENDA TÉCNICA LATERAL */}
        <div className="position-absolute text-secondary" style={{ left: '10px', bottom: '10px', fontSize: '0.6rem' }}>
          NORMATIVA: DECRETO 190 | ANCHO MÍN. CARRIL: 6.0m | CELDAS: 2.5x5.0m
        </div>

        {/* DISTRIBUCIÓN SÓTANO 1: Mayor espacio de maniobra */}
        {nivel === 1 && (
          <div className="d-flex flex-column gap-4 align-items-center">
            {/* Perímetro Superior */}
            <div className="d-flex gap-4">
               {renderBahia('A', 1, 15)}
               <div className="bg-secondary text-white-50 px-3 d-flex align-items-center small" style={{writingMode: 'vertical-rl'}}>RAMPA ENTRADA</div>
               {renderBahia('A', 16, 25)}
            </div>

            {/* Carril de circulación central con islas de parqueo enfrentadas */}
            <div className="d-flex justify-content-between w-100 px-5">
              {renderBahia('B', 1, 10, 'V')}
              <div className="d-flex flex-column gap-5">
                 <div className="d-flex flex-column bg-secondary bg-opacity-10 p-2">
                    {renderBahia('E', 1, 12)}
                    <div className="text-center py-2 text-secondary fw-bold" style={{fontSize: '0.5rem', letterSpacing: '4px'}}>D-01 ↔ D-12 (PASILLO)</div>
                    {renderBahia('D', 1, 12)}
                 </div>
              </div>
              {renderBahia('B', 11, 20, 'V')}
            </div>

            {/* Núcleo de ascensores y zona técnica */}
            <div className="w-100 d-flex justify-content-center mt-3">
               <div className="bg-info bg-opacity-10 border border-info text-info p-2 rounded small fw-bold" style={{width: '300px', textAlign: 'center'}}>
                 NÚCLEO ESTRUCTURAL: ASCENSORES TORRE PRINCIPAL
               </div>
            </div>
          </div>
        )}

        {/* DISTRIBUCIÓN SÓTANO 2: Más denso por columnas estructurales */}
        {nivel === 2 && (
          <div className="d-flex flex-column gap-2">
             <div className="d-flex justify-content-between">
                {renderBahia('C', 1, 10, 'V')}
                <div className="d-flex flex-wrap gap-1 justify-content-center" style={{maxWidth: '700px'}}>
                   {/* Bloques compactos tipo peine */}
                   <div className="border border-secondary border-opacity-20 p-1">{renderBahia('G', 1, 12)}</div>
                   <div className="border border-secondary border-opacity-20 p-1">{renderBahia('G', 13, 24)}</div>
                   <div className="w-100 text-center text-secondary small py-1">CARRIL DE SERVICIO - MANIOBRA RESTRINGIDA</div>
                   <div className="border border-secondary border-opacity-20 p-1">{renderBahia('H', 1, 12)}</div>
                   <div className="border border-secondary border-opacity-20 p-1">{renderBahia('H', 13, 24)}</div>
                </div>
                {renderBahia('C', 11, 20, 'V')}
             </div>
             <div className="mt-5 d-flex justify-content-center align-items-end gap-3">
               <div className="bg-danger bg-opacity-25 text-danger border border-danger p-2 small">ZONA DE MÁQUINAS Y TRANSFORMADORES</div>
               {renderBahia('F', 1, 6)}
             </div>
          </div>
        )}
      </div>

      {/* FOOTER DE DATOS REALISTAS */}
      <div className="bg-light p-2 rounded-bottom border d-flex justify-content-around small fw-bold text-secondary">
        <span>SÓTANO {nivel}: {nivel === 1 ? '50 CELDAS' : '50 CELDAS'}</span>
        <span>RESISTENCIA DE PLACA: 500 kg/m²</span>
        <span>ALTURA LIBRE: {nivel === 1 ? '3.50m' : '2.40m'}</span>
      </div>
    </div>
  );
}

export default MapaParqueo;