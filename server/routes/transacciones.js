// CRUD de transacciones
// Create, Read, Update, Delete de t
// Crear, Leer/Listar, Actualizar, Borrar
const express = require("express");

const transaccionesRouter = express.Router();

const Transaccion = require("../models/Transaccion");

transaccionesRouter.get("/", async (req, res) => {
  const transacciones = await Transaccion.find({
    deletedAt: { $exists: false },
  });
  res.json({ mensaje: "Lista de transacciones", data: transacciones });
});

transaccionesRouter.post("/", async (req, res) => {
  const { monto, tipo, categoria, descripcion } = req.body;
  const transaccion = new Transaccion({
    monto,
    tipo,
    categoria,
    descripcion,
    createdAt: new Date(),
  });
  try {
    const transaccionGuardada = await transaccion.save();
    res.status(201).json({
      mensaje: "Transacción creada",
      data: transaccionGuardada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la transacción",
      error: error.message,
    });
  }
});

transaccionesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { monto, tipo, categoria, descripcion } = req.body;
  console.log("id", id);
  console.log("body", { monto, tipo, categoria, descripcion });
  try {
    const transaccionActualizada = await Transaccion.findByIdAndUpdate(
      id,
      {
        monto,
        tipo,
        categoria,
        descripcion,
        updatedAt: new Date(),
      },
      { new: true }
    );
    console.log("transaccionActualizada", transaccionActualizada);
    res.json({
      mensaje: "Transacción actualizada",
      data: transaccionActualizada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la transacción",
      error: error.message,
    });
  }
});

transaccionesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaccionEliminada = await Transaccion.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      { new: true }
    );
    res.json({
      mensaje: "Transacción eliminada",
      data: transaccionEliminada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar la transacción",
      error: error.message,
    });
  }
});

module.exports = transaccionesRouter;
