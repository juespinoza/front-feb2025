// CRUD de transacciones
// Create, Read, Update, Delete de t
// Crear, Leer/Listar, Actualizar, Borrar
const express = require("express");

const transaccionesRouter = express.Router();

const Transaccion = require("../models/Transaccion");

transaccionesRouter.get("/", async (req, res) => {
  const transacciones = await Transaccion.find();
  res.json({ mensaje: "Lista de transacciones", data: transacciones });
});

module.exports = transaccionesRouter;
