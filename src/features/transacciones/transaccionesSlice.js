import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransacciones,
  createTransaccion,
  updateTransaccion,
  deleteTransaccion,
} from "../../hooks/transactions";

const initialState = {
  lista: [],
  loading: false,
  error: null,
};

export const transaccionesSlice = createSlice({
  name: "transacciones",
  initialState,
  reducers: {
    agregarTransaccion: (state, action) => {
      state.lista.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransacciones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransacciones.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload.data;
      })
      .addCase(fetchTransacciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTransaccion.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransaccion.fulfilled, (state, action) => {
        state.loading = false;
        state.lista.push(action.payload.data);
      })
      .addCase(createTransaccion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTransaccion.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransaccion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lista.findIndex(
          (t) => t._id === action.payload.data._id
        );
        if (index !== -1) state.lista[index] = action.payload.data;
      })
      .addCase(updateTransaccion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTransaccion.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransaccion.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = state.lista.filter(
          (t) => t._id !== action.payload.data._id
        );
      })
      .addCase(deleteTransaccion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { agregarTransaccion } = transaccionesSlice.actions;
export default transaccionesSlice.reducer;
