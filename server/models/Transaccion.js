const mongoose = require("mongoose");

const TransaccionSchema = new mongoose.Schema({
  description: { type: String },
  monto: { type: Number, required: true },
  tipo: { type: String, enum: ["ingreso", "egreso"], required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Transaccion", TransaccionSchema);
