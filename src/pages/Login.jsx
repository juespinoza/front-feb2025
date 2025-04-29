import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/usuarios/usuariosSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loginEvent = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5001/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      if (data.token) {
        dispatch(login({ email: data.data.email, token: data.token }));
        handleNavigate();
      }
    } else {
      alert(data.mensaje);
    }
  };

  const handleNavigate = () => {
    navigate("/perfil");
  };

  return (
    <div>
      <form onSubmit={loginEvent}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
