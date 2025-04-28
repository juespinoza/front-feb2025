const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verificarToken = require("../middleware/auth");
require("dotenv").config();
const Usuario = require("../models/Usuario");

const userRouter = express.Router();

// ------------------------ ENDPOINTS USUARIOS
// Usuario: {
//   _id: Number,
//   nombre: String,
//   email: String,
//   password: String,
// }
let usuarios = [];

userRouter.post("/register", async (req, res) => {
  // console.log(req);
  // console.log(req.body);
  try {
    const { nombre, email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe!" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const usuario = new Usuario({
      nombre,
      email,
      password: encryptedPassword,
    });
    // console.log(usuario);
    await usuario.save();
    res
      .status(201)
      .json({ mensaje: "Usuario creado correctamente", data: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el usuario" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password });'
    const query = Usuario.findOne({ email }).select([
      "email",
      "_id",
      "password",
    ]);
    // console.log(await query.exec());
    const usuario = await query.exec();
    // console.log(usuarios);
    console.log(usuario);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    // console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }
    console.log(usuario);
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ mensaje: "Login existoso", token, data: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo iniciar sesión" });
  }
});

userRouter.get("/perfil", verificarToken, async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  res.json({ mensaje: "Perfil encontrado", data: usuario });
});

// GET /usuarios
// Respuesta: todos los usuarios. res.json({mensaje: "", data: []})
userRouter.get("/usuarios", (req, res) => {
  // verificacion de seguridad
  // consulta a la base de datos
  res.json({ mensaje: "Datos recuperados exitosamente", data: usuarios });
});

// GET /usuarios/:id
// Respuesta: consultar un usuario por su ID. res.json({mensaje:"", data: {}})
userRouter.get("/usuarios/:id", verificarToken, (req, res) => {
  // verificacion de seguridad
  const { id } = req.params;
  // consulta a la base de datos
  const usuario = usuarios.find((u) => u.id === Number(id));
  // filtrado de datos a mostrar
  if (!usuario) {
    return res
      .status(404)
      .json({ mensaje: "Usuario no encontrado", data: null });
  }
  res.json({ mensaje: "Usuario encontrado", data: usuario });
});

// POST /usuarios
userRouter.post("/usuarios", (req, res) => {
  // verificación de seguridad
  const { nombre, email } = req.body;
  const usuario = {
    id: usuarios.length + 1, // esto es simulación
    nombre,
    email,
  };
  // verificar que los datos no esten duplicados
  // guardamos la data en la BD
  usuarios.push(usuario);
  // un status(404) si hay un error
  res.status(201).json({ mensaje: "Usuario creado", data: usuario });
});

// PUT /usuarios/:id
userRouter.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const usuario = usuarios.find((u) => u.id === Number(id));
  if (!usuario) {
    return res
      .status(404)
      .json({ mensaje: "Usuario no encontrado.", data: null });
  }

  // usuarios.save()
  usuarios.map((u) => {
    if (u.id === Number(id)) {
      u.nombre = nombre;
      u.email = email;
    }
  });
  res.status(200).json({
    mensaje: "Usuarios actualizado",
    data: usuarios.find((u) => u.id),
  });
});

// PATCH /usuarios/:id
userRouter.patch("", (req, res) => {});

// DELETE /usuarios/:id
userRouter.delete("/usuarios/:id", (req, res) => {
  // verificacion de seguridad
  const { id } = req.params;
  // buscar el usuario en la base de datos
  const usuario = usuarios.findIndex((u) => u.id === Number(id));
  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
  // borrar en la base de datos (soft delete: borrado logico con columna)
  usuarios.splice(usuario, 1);
  res.json({ mensaje: "Usuario borrado correctamente." });
});

module.exports = userRouter;
