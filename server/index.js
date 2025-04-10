// 1- Importamos express
const express = require("express");

require("dotenv").config();

// 2- Creamos la app
const app = express();

// 2.1- Activamos el middleware para leer JSON del req.body
app.use(express.json());

// 2.2- Activamos el middleware para activar la politica CORS
const cors = require("cors");
app.use(cors());

// ------------------------
// 3- Definimos una ruta básica, la ruta principal (/)
app.get("/", (_req, res) => {
  console.log(process.env.PORT);
  res.send("Hola mundo");
});

app.get("/saludo/:nombre", (req, res) => {
  console.log(req);
  const { nombre } = req.params;
  res.send(`Hola ${nombre}`);
});

app.get("/libros/:id", (req, res) => {
  const { id } = req.params;
  // consultas a base de datos para obtener la data del libro con el :id
  res.send(`Aún no podemos consultar el libro con el id: ${id} `);
});

app.post("/estudiante", (req, res) => {
  const { nombre, email } = req.body;
  res.json({ msg: "Dato recibido correctamente.", data: { nombre, email } });
});
// ------------------------

// ------------------------ ENDPOINTS USUARIOS
// {
//   id: Number,
//   nombre: String,
//   email: String
// }
let usuarios = [];
// GET /usuarios
// Respuesta: todos los usuarios. res.json({mensaje: "", data: []})
app.get("/usuarios", (req, res) => {
  // verificacion de seguridad
  // consulta a la base de datos
  res.json({ mensaje: "Datos recuperados exitosamente", data: usuarios });
});

// GET /usuarios/:id
// Respuesta: consultar un usuario por su ID. res.json({mensaje:"", data: {}})
app.get("/usuarios/:id", (req, res) => {
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
app.post("/usuarios", (req, res) => {
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
app.put("/usuarios/:id", (req, res) => {
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
app.patch("", (req, res) => {});

// DELETE /usuarios/:id
app.delete("/usuarios/:id", (req, res) => {
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

app.use((req, res) => {
  res.status(404).send("Ruta no disponible.");
});

// 4- Configuramos la escucha de un puerto y levantamos
//    nuestro servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
