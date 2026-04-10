import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav 
      className="navbar navbar-expand-lg shadow-sm px-3"
      style={{ 
        background: "rgba(13, 110, 253, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >

      <div className="container d-flex justify-content-between align-items-center">

        {/* LOGO */}
        <div 
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/user")}
        >
          <span style={{ fontSize: "1.5rem" }}>🚗</span>
          <span className="fw-bold text-white fs-5">ParkLink</span>
        </div>

        {/* USER */}
        <div className="d-flex align-items-center gap-3">

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
            {localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).nombre.charAt(0).toUpperCase()
              : "U"}
          </div>

          <span className="text-white small">
            {localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).nombre
              : "Usuario"}
          </span>

          <button 
            onClick={logout} 
            className="btn btn-light btn-sm fw-semibold"
          >
            Cerrar sesión
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;