import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardUser from "./pages/user/DashboardUser";
import DashboardVigilante from "./pages/vigilante/DashboardVigilante";
import RegistrarEntrada from "./pages/user/RegistrarEntrada";
import Cupos from "./pages/user/Cupos";
import Reservar from "./pages/user/reservar";
import Cancelar from "./pages/user/cancelar";
import Historial from "./pages/user/historial"; 
import Reporte from "./pages/user/reporte";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/user" element={<DashboardUser />} />
      <Route path="/vigilante" element={<DashboardVigilante />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/user/registrar-entrada" element={<RegistrarEntrada />} />
      <Route path="/user/cupos" element={<Cupos />} />
      <Route path="/user/reservar" element={<Reservar />} />
      <Route path="/user/cancelar" element={<Cancelar />} />
      <Route path="/user/historial" element={<Historial />} />
      <Route path="/user/reporte" element={<Reporte />} />
    </Routes>
  );
}

export default App;