import { configureStore } from "@reduxjs/toolkit";
import transaccionesReducer from "../features/transacciones/transaccionesSlice";
import usuariosReducer from "../features/usuarios/usuariosSlice";

export const store = configureStore({
  reducer: {
    transacciones: transaccionesReducer,
    usuarios: usuariosReducer,
  },
});
