import React, { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
import {
  createTransaccion,
  deleteTransaccion,
  fetchTransacciones,
  // getTransactionsHook,
  updateTransaccion,
} from "./hooks/transactions";
import { useDispatch, useSelector } from "react-redux";
// import { getTransacciones } from "./features/transacciones/transaccionesSlice";

function ItemsComponent({ items }) {
  const lista = useSelector((state) => state.transacciones.lista);
  const loading = useSelector((state) => state.transacciones.loading);
  const error = useSelector((state) => state.transacciones.error);

  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ monto: "", tipo: "ingreso" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransacciones());
  }, [dispatch]);
  // const dispatch = useDispatch();
  // const { transactions, loading, error } = getTransactionsHook();
  // console.log("transactions...", transactions);
  // console.log("loading", loading);
  // console.log("error", error);
  // const [list, setList] = useState(items);
  // const [editingItem, setEditingItem] = useState(null);

  // console.log("transacciones", transacciones);

  // useEffect(() => {
  // console.log("Creando una promesa");
  // const promise = new Promise((resolve, reject) => {
  //   const exito = true;
  //   setTimeout(() => {
  //     if (exito) {
  //       resolve("Promesa resuelta");
  //     } else {
  //       reject("Promesa rechazada");
  //     }
  //   }, 3000);
  // });
  // promise
  //   .then((result) => console.log(result))
  //   .catch((error) => console.error(error));
  // try {
  //   const { transactions, loading, error } = getTransactionsHook();
  //   console.log("transactions", transactions);
  //   console.log("loading", loading);
  //   console.log("error", error);
  // } catch (error) {
  //   console.error(error);
  // }
  //   dispatch(getTransacciones(transacciones.data));
  // }, [dispatch]);

  const handleNew = (item) => {
    // setList([...list, { ...item, id: Date.now() }]);
    dispatch(createTransaccion(newItem));
    setNewItem({ monto: "", tipo: "ingreso" });
  };

  const handleEdit = (updatedItem) => {
    // setList(
    //   list.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    // );
    dispatch(updateTransaccion(editingItem));
    setEditingItem(null);
  };

  const removeItemById = (id) => {
    // setList(list.filter((item) => item._id !== id));
    dispatch(deleteTransaccion(id));
  };

  if (loading) return <p>Cargando transacciones...</p>;
  if (error) return <p>Ocurrió un error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Lista de Items</h2>
        <div className="bg-yellow-300 text-black p-2 rounded-md">
          <h3 className="text-3xl font-bold">
            {lista.reduce(
              (saldo, item) =>
                item.tipo === "ingreso"
                  ? saldo + Number(item.monto)
                  : saldo - Number(item.monto),
              0
            )}
          </h3>
          <span>Saldo</span>
        </div>
      </div>
      <ul className="mt-4">
        {lista.map((item) => (
          <li key={item._id} className="my-2 p-2 bg-gray-600 rounded-md">
            <div className="flex justify-between items-center">
              <span
                className={`font-bold ${
                  item.tipo === "ingreso" ? "text-green-600" : "text-red-600"
                }`}
              >
                {`${item.tipo === "ingreso" ? "+" : "-"}${item.monto}`}
              </span>
              <div>
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => setEditingItem(item)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removeItemById(item._id)}
                >
                  Borrar
                </button>
              </div>
            </div>
            {editingItem && editingItem._id === item._id && (
              <FormComponent
                item={editingItem}
                setItem={setEditingItem}
                hidden={false}
                submitFunc={handleEdit}
                cancelFunc={() => setEditingItem(null)}
              />
            )}
          </li>
        ))}
      </ul>
      <h2 className="mt-4 text-lg font-bold">Agregar nuevo item</h2>
      <FormComponent
        item={newItem}
        setItem={setNewItem}
        hidden={false}
        submitFunc={handleNew}
        cancelFunc={() => setNewItem({ monto: "", tipo: "ingreso" })}
      />
    </div>
  );
}

export default ItemsComponent;
