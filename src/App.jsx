import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Transacciones from "./pages/Transacciones";
import Estadisticas from "./pages/Estadisticas";
import Registro from "./pages/Registro";
import Login from "./pages/Login";

function App({ name }) {
  const gato = "Lukus";
  const edad = 15;

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link className="mx-2" to="/">
            Inicio
          </Link>
          <Link className="mx-2" to="/transacciones">
            Ingresos/Egresos
          </Link>
          <Link className="mx-2" to="/estadisticas">
            Estadísticas de aplicación
          </Link>
          <Link className="mx-2" to="/registro">
            Registro de usuario
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
