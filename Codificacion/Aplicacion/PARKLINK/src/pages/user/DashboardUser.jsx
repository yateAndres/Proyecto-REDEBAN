import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardUser() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ background: '#eef2f7', minHeight: '100vh' }}>

      <nav 
  className="navbar navbar-expand-lg shadow-sm px-3"
  style={{ 
    background: "rgba(13, 110, 253, 0.85)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  }}
>

  <div className="container d-flex justify-content-between align-items-center">

    {/* 🚗 LOGO */}
    <div 
      className="d-flex align-items-center gap-2"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/user")}
    >
      <span style={{ fontSize: "1.5rem" }}>🚗</span>
      <span className="fw-bold text-white fs-5">ParkLink</span>
    </div>

    {/* 👤 USER + ACTIONS */}
    <div className="d-flex align-items-center gap-3">

      {/* Avatar */}
      <div 
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "40px",
          height: "40px",
          background: "rgba(255,255,255,0.2)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        {user?.nombre ? user.nombre.charAt(0).toUpperCase() : "U"}
      </div>

      {/* Nombre */}
      <div className="d-none d-md-flex flex-column text-white small">
        <span className="fw-semibold">
          {user?.nombre || "Usuario"}
        </span>
        <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>
          Cliente
        </span>
      </div>

      {/* Botón logout */}
      <button 
        onClick={logout} 
        className="btn btn-light btn-sm fw-semibold"
        style={{
          borderRadius: "20px",
          padding: "5px 15px",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#212529";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "";
          e.currentTarget.style.color = "";
        }}
      >
        Cerrar sesión
      </button>

    </div>

  </div>
</nav>

      <div className="container py-5">

        {/* 👋 PANEL SUPERIOR */}
        <div className="card border-0 shadow rounded-4 p-4 mb-5"
          style={{ background: 'linear-gradient(135deg, #0d6efd, #4dabf7)', color: 'white' }}>
          
          <h2 className="fw-bold">
            Bienvenido, {user?.nombre || "Usuario"} 👋
          </h2>
          <p className="mb-0 opacity-75">
            Gestiona tu parqueadero de forma rápida y segura
          </p>
        </div>

        {/* 🔘 GRID */}
        <div className="row g-4">

          {[
            { icon: "📊", title: "Cupos", desc: "Ver disponibilidad", route: "/user/cupos", color: "#0d6efd" },
            { icon: "📅", title: "Reservar", desc: "Agendar espacio", route: "/user/reservar", color: "#198754" },
            { icon: "❌", title: "Cancelar", desc: "Eliminar reserva", route: "/user/cancelar", color: "#dc3545" },
            { icon: "📜", title: "Historial", desc: "Ver registros", route: "/user/historial", color: "#6f42c1" },
            { icon: "📈", title: "Reporte", desc: "Estadísticas", route: "/user/reporte", color: "#fd7e14" },
          ].map((item, index) => (

            <div key={index} className="col-md-4">

              <div 
                onClick={() => navigate(item.route)}
                className="card border-0 shadow-sm rounded-4 h-100 text-center p-4"
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
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

                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "70px",
                    height: "70px",
                    backgroundColor: item.color,
                    color: "white",
                    fontSize: "1.8rem"
                  }}
                >
                  {item.icon}
                </div>

                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default DashboardUser;