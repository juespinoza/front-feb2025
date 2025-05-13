// CRUD de transacciones
// Create, Read, Update, Delete de t
// Crear, Leer/Listar, Actualizar, Borrar
const express = require("express");

const transaccionesRouter = express.Router();

const Transaccion = require("../models/Transaccion");

// READ (Listar todos)
transaccionesRouter.get("/", async (_req, res) => {
  try {
    const transacciones = await Transaccion.find({
      deletedAt: { $exists: false },
    });
    res.json({ mensaje: "Lista de transacciones", data: transacciones });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje:
        "Hubo un error al obtener la lista de transacciones, contactar al administrador del sistema",
      error,
    });
  }
});

// CREATE
transaccionesRouter.post("/", async (req, res) => {
  const { monto, tipo, usuario, createdAt } = req.body;
  const newTransaccion = new Transaccion({
    monto,
    tipo,
    usuario,
    createdAt,
  });
  try {
    const transaccion = await newTransaccion.save();
    res.status(201).json({
      mensaje: "Transacción creada correctamente",
      data: transaccion,
    });
  } catch (error) {
    console.error(error); // se puede implementar manejo de logs con librerias externas
    res.status(400).json({
      mensaje:
        "Hubo un error al creat la transacción, contactar al administrador del sistema",
      error,
    });
  }
});

// UPDATE
transaccionesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { monto, tipo, usuario, createdAt } = req.body;
  try {
    const transaccionActualizada = await Transaccion.findByIdAndUpdate(
      id,
      { monto, tipo, usuario, createdAt, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json({
      mensaje: "Transacción actualizada correctamente",
      data: transaccionActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      mensaje:
        "Hubo un error al actualizar la transacción, contactar al administrador del sistema",
      error,
    });
  }
});

// DELETE (soft delete)
transaccionesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaccionBorrada = await Transaccion.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
    res.status(200).json({
      mensaje: "Transacción borrada correctamente",
      data: transaccionBorrada,
    });
  } catch (error) {
    console.error;
    res.status(400).json({
      mensaje:
        "Hubo un error al eliminar la transacción, contacte al administrador del sistema",
      error,
    });
  }
});

module.exports = transaccionesRouter;
