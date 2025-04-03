// 1- Importamos express
const express = require("express");

// 2- Creamos la app
const app = express();

// 2.1- Activamos el middleware para leer JSON del req.body
app.use(express.json());

// 3- Definimos una ruta básica, la ruta principal (/)
app.get("/", (_req, res) => {
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

app.use((req, res) => {
  res.status(404).send("Ruta no disponible.");
});

// 4- Configuramos la escucha de un puerto y levantamos
//    nuestro servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
