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
import Perfil from "./pages/Perfil";
import { useSelector } from "react-redux";

function App({ name }) {
  const gato = "Lukus";
  const edad = 15;
  const isAuthenticated = useSelector(
    (state) => state.usuarios.isAuthenticated
  );

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
          {isAuthenticated ? (
            <Link className="mx-2" to="/perfil">
              Perfil
            </Link>
          ) : (
            ""
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
