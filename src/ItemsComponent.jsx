import React, { useState } from "react";

function ItemsComponent({ items }) {
  // console.log(items);
  const [list, setList] = useState(items);
  const [editingItem, setEditingItem] = useState({
    id: "",
    monto: "",
    tipo: "",
  });
  // list.push({ monto: 1000, tipo: "ingreso" });
  // console.log(list);
  const esIngreso = (tipo) => tipo === "ingreso";

  const removeItemById = (id) => {
    // console.log("Borrando", id);
    const newList = list.filter((elemento) => elemento.id !== id);
    setList(newList);
  };

  const handleSetEditingItem = (item) => {
    console.log(item);
    setEditingItem(item);
  };

  const handleSaveItem = (e) => {
    e.preventDefault(); //desactivamos el comportamiento por defecto del navegador
    console.log("Guardando...", editingItem);
    // console.log("monto: ", editingItem.monto);
    // console.log("tipo: ", editingItem.tipo);
    const updatedList = list.map((item) =>
      item.id === editingItem.id
        ? { ...item, monto: editingItem.monto, tipo: editingItem.tipo }
        : item
    );
    setList(updatedList);
    // setEditingItem({});
    setEditingItem({ id: "", monto: "", tipo: "" });
  };

  return (
    <div>
      <h3>
        Saldo:{" "}
        {list.reduce(
          (saldo, item) =>
            item.tipo === "ingreso" ? saldo + item.monto : saldo - item.monto,
          0
        )}
      </h3>
      <ul>
        {list
          // .filter((item) => item.tipo !== "ingreso" && item.monto > 2000)
          .map((item) => {
            return (
              <li
                key={item.id}
                className="flex justify-between items-center my-2 p-2 bg-gray-200 rounded-md"
              >
                <span
                  className={`font-bold ${
                    esIngreso(item.tipo) ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {`${esIngreso(item.tipo) ? "+" : "-"}` + item.monto}
                </span>
                <div className="text-sm">
                  <button
                    className="mx-1 text-white bg-blue-500"
                    onClick={() => handleSetEditingItem(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-white bg-red-500"
                    onClick={() => removeItemById(item.id)}
                  >
                    Borrar
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      <form id="editingItem" onSubmit={handleSaveItem}>
        {/* <input type="hidden" id="id" value={editingItem.id} /> */}
        <input
          type="number"
          id="monto"
          value={editingItem.monto}
          onChange={(e) =>
            setEditingItem({ ...editingItem, monto: e.target.value })
          }
        />
        <select
          id="tipo"
          value={editingItem.tipo}
          onChange={(e) =>
            setEditingItem({ ...editingItem, tipo: e.target.value })
          }
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
        <button type="submit">Guardar</button>
        <button>Cancelar</button>
      </form>
      <div>
        <form id="newItem">
          <input type="number" id="monto" />
          <select id="tipo">
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              const elemento = {
                id: Date.now(),
                monto: parseInt(e.target.form.monto.value),
                tipo: e.target.form.tipo.value,
              };
              // list.push(elemento); // ni items.push(elemento)
              setList([...list, elemento]);
              // console.log("Agregando...", elemento);
            }}
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ItemsComponent;
