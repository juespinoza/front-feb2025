import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  isAuthenticated: false,
};

export const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});

export const { login } = usuariosSlice.actions;

export default usuariosSlice.reducer;
