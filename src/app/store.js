import { configureStore } from "@reduxjs/toolkit";
import transaccionesReducer from "../features/transacciones/transaccionesSlice";

export const store = configureStore({
  reducer: {
    transacciones: transaccionesReducer,
  },
});
