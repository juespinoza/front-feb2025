import React from "react";
import { useSelector } from "react-redux";

function Perfil() {
  const email = useSelector((state) => state.usuarios.email);
  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Email: {email}</p>
    </div>
  );
}

export default Perfil;
