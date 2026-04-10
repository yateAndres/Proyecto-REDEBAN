import React from "react";
import Navbar from "../../components/Navbar";

function Cupos() {

  const cupos = [
    { id: 1, estado: "Disponible" },
    { id: 2, estado: "Ocupado" },
    { id: 3, estado: "Disponible" },
    { id: 4, estado: "Ocupado" },
    { id: 5, estado: "Disponible" },
    { id: 6, estado: "Ocupado" },
  ];

  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh' }}>

      <Navbar />

      <div className="container py-5">

        <h3 className="fw-bold mb-4">📊 Disponibilidad de Cupos</h3>

        <div className="row g-4">

          {cupos.map(cupo => (
            <div key={cupo.id} className="col-md-4">

              <div 
                className="card text-center p-4 shadow-sm rounded-4"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >

                <h5 className="fw-bold mb-3">Cupo #{cupo.id}</h5>

                <span 
                  className={`badge fs-6 ${
                    cupo.estado === "Disponible" 
                      ? "bg-success" 
                      : "bg-danger"
                  }`}
                >
                  {cupo.estado}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Cupos;