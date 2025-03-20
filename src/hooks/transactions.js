import React, { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
export function getTransactionsHook() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const postsResponse = await fetch(API_URL);
        if (!postsResponse.ok) throw new Error("Error del servidor");

        console.log("Respuesta del servidor", postsResponse);
        const posts = await postsResponse.json();
        console.log("Posts", posts);
        setTransactions(posts);
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
