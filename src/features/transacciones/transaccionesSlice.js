import { createSlice } from "@reduxjs/toolkit";

export const transaccionesSlice = createSlice({
  name: "transacciones",
  initialState: [],
  reducers: {
    agregarTransaccion: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { agregarTransaccion } = transaccionesSlice.actions;
export default transaccionesSlice.reducer;
