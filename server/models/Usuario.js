const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    // _id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "usuarios" }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);
