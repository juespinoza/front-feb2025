import React, { useState } from "react";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:5001";

  const registrar = async (e) => {
    e.preventDefault();
    try {
      const body = { nombre, email, password };
      console.log("registrar", body);

      const res = await fetch(`http://localhost:5001/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer (token)" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();
      if (res.status === 201 || res.status === 200) {
        alert(data.mensaje);
      }
      alert(data.mensaje);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2> Registro de usuario</h2>
      <form onSubmit={registrar}>
        <input
          placeholder="Nombre"
          type="text"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Registro;
