// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const API_URL = "https://jsonplaceholder.typicode.com";
const API_URL = "http://localhost:5001/api";

// export function getTransactionsHook() {
//   const dispatch = useDispatch();
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getTransactions = async () => {
//       try {
//         const transaccionesResponse = await fetch(API_URL + "/transacciones");
//         // const imagesResponse = await fetch(API_URL + "/photos");
//         if (!transaccionesResponse.ok) throw new Error("Error del servidor");

//         // console.log("Respuesta del servidor", transaccionesResponse);
//         const transacciones = await transaccionesResponse.json();
//         // console.log("Transacciones", transacciones);
//         setTransactions(transacciones.data);
//       } catch (error) {
//         console.error("El error es: ", error);
//         setError(error);
//       } finally {
//         console.log("Fin del proceso");
//         setLoading(false);
//       }
//     };

//     getTransactions();
//   }, []);

//   return {
//     transactions,
//     loading,
//     error,
//   };
// }

// export function getTransactionHook(id) {
//   // funcion para traer una transaction desde la API
// }

// export function editTransactionHook(data) {
//   // funcion para mandar los datos a una API
// }

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
