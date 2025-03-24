import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Transacciones from "./pages/Transacciones";
import Estadisticas from "./pages/Estadisticas";

function App({ name }) {
  const gato = "Lukus";
  const edad = 15;

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/transacciones">Ingresos/Egresos</Link>
          <Link to="/estadisticas">Estadísticas de aplicación</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
