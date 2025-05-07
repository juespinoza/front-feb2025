
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransacciones = createAsyncThunk(
  "transacciones/fetch",
  async () => {
    const res = await fetch("http://localhost:5001/api/transacciones");
    return await res.json();
  }
);

export const createTransaccion = createAsyncThunk(
  "transacciones/create",
  async (data) => {
    const res = await fetch("http://localhost:5001/api/transacciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
);

export const updateTransaccion = createAsyncThunk(
  "transacciones/update",
  async (data) => {
    const res = await fetch(
      `http://localhost:5001/api/transacciones/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await res.json();
  }
);

export const deleteTransaccion = createAsyncThunk(
  "transacciones/delete",
  async (id) => {
    const res = await fetch(`http://localhost:5001/api/transacciones/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  }
);
