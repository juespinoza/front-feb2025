require("dotenv").config();

const mongoose = require("mongoose");

// conectamos con la base de datos
mongoose
  .connect("mongodb+srv://transacciones:transaccionesLoc4l@fashion-project.7io5qpw.mongodb.net/?retryWrites=true&w=majority&appName=fashion-project")
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((e) => {
    console.error(e);
  });

// const Usuario = require("./models/Usuario");
// async function testUsuarios() {
//   try {
//     const newUser = new Usuario({
//       nombre: "Juana",
//       email: "juanaaa@gmail.com",
//       password: "123456",
//     });
//     await newUser.save();
//     const usuarios = await Usuario.find(); // equivale a db.usuarios.find()
//     console.log("Usuarios en la base de datos:");
//     console.log(usuarios);
//   } catch (error) {
//     console.error("Error al buscar usuarios:", error);
//   }
// }

// testUsuarios();
