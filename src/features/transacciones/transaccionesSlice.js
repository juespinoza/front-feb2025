import { createSlice } from "@reduxjs/toolkit";
import {
  obtenerTransacciones,
  crearTransaccion,
  actualizarTransaccion,
  eliminarTransaccion,
} from "../../hooks/transactions";

export const transaccionesSlice = createSlice({
  name: "transacciones",
  initialState: {
    lista: [],
    loading: false,
    error: null,
  },
  reducers: {
    agregarTransaccion: (state, action) => {
      state.lista.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Manejo de obtenerTransacciones
      .addCase(obtenerTransacciones.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerTransacciones.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload.data;
      })
      .addCase(obtenerTransacciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.mensaje;
      })
      // Manejo de crearTransaccion
      .addCase(crearTransaccion.pending, (state) => {
        state.loading = true;
      })
      .addCase(crearTransaccion.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.push(action.payload.data);
      })
      .addCase(crearTransaccion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.mensaje;
      })
      // Manejo de actualizarTransaccion
      .addCase(actualizarTransaccion.pending, (state) => {
        state.loading = true;
      })
      .addCase(actualizarTransaccion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lista.findIndex(
          (t) => t._id === action.payload.data._id
        );
        if (index !== -1) {
          state.lista[index] = action.payload.data;
        }
      })
      .addCase(actualizarTransaccion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.mensaje;
      })
      // Manejo de eliminarTransaccion
      .addCase(eliminarTransaccion.pending, (state) => {
        state.loading = true;
      })
      .addCase(eliminarTransaccion.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(
          (t) => t._id !== action.payload.data._id
        );
      })
      .addCase(eliminarTransaccion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.mensaje;
      });
  },
});

export const { agregarTransaccion } = transaccionesSlice.actions;
export default transaccionesSlice.reducer;
