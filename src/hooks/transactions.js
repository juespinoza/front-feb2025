import { createAsyncThunk } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";

// const API_URL = "https://jsonplaceholder.typicode.com";
const API_URL = "http://localhost:5001/api";
export function getTransactionsHook() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transaccionesResponse = await fetch(API_URL + "/transacciones");
        // const imagesResponse = await fetch(API_URL + "/photos");
        if (!transaccionesResponse.ok) throw new Error("Error del servidor");

        // console.log("Respuesta del servidor", transaccionesResponse);
        const transacciones = await transaccionesResponse.json();
        console.log("Transacciones", transacciones);
        setTransactions(transacciones.data);
      } catch (error) {
        console.error("El error es: ", error);
        setError(error);
      } finally {
        console.log("Fin del proceso");
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
  };
}

export function getTransactionHook(id) {
  // funcion para traer una transaction desde la API
}

export function editTransactionHook(data) {
  // funcion para mandar los datos a una API
}

// obtenerTransacciones
export const obtenerTransacciones = createAsyncThunk(
  "transacciones/obtenerTransacciones",
  async () => {
    const response = await fetch(`${API_URL}/transacciones`);
    return await response.json();
  }
);

// crearTransaccion
export const crearTransaccion = createAsyncThunk(
  "transacciones/crearTransaccion",
  async (transaccion) => {
    const response = await fetch(`${API_URL}/transacciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaccion),
    });
  }
);
// actualizarTransaccion
export const actualizarTransaccion = createAsyncThunk(
  "transacciones/actualizarTransaccion",
  async (id, transaccion) => {
    const response = await fetch(`${API_URL}/transacciones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaccion),
    });
    return await response.json();
  }
);

// eliminarTransaccion
export const eliminarTransaccion = createAsyncThunk(
  "transacciones/eliminarTransaccion",
  async (id) => {
    const response = await fetch(`${API_URL}/transacciones/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }
);
