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
