import React, { useState } from "react";

function FormComponent({ item, setItem, hidden, submitFunc }) {
  const [editingItem, setEditingItem] = useState(item);

  const handleSaveItem = (e) => {
    e.preventDefault(); //desactivamos el comportamiento por defecto del navegador
    console.log("Guardando...", editingItem);
    // console.log("monto: ", editingItem.monto);
    // console.log("tipo: ", editingItem.tipo);
    // const updatedList = list.map((item) =>
    //   item.id === editingItem.id
    //     ? { ...item, monto: editingItem.monto, tipo: editingItem.tipo }
    //     : item
    // );
    // setList(updatedList);
    setItem(editingItem);
    // setEditingItem({});
    formDefault();
  };

  const formDefault = () => {
    setEditingItem({ id: "", monto: "", tipo: "" });
    setItem({ id: "", monto: "", tipo: "" });
  };

  return (
    <form id={`${editingItem.id}-form`} onSubmit={submitFunc} hidden={hidden}>
      {/* <input type="hidden" id="id" value={editingItem.id} /> */}
      <div className="mt-10 grid grid-cols-8 gap-x-1">
        <div className="col-span-2">
          <label htmlFor="first-name" className="block text-sm/6 font-medium">
            Monto
          </label>
          <div className="mt-2">
            <input
              id="monto"
              name="monto"
              type="number"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={editingItem.monto}
              onChange={(e) =>
                setEditingItem({ ...editingItem, monto: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-span-2">
          <label htmlFor="country" className="block text-sm/6 font-medium">
            Tipo
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="tipo"
              name="tipo"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
            {/* <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              /> */}
          </div>
        </div>
        <div className="col-span-4 flex items-end">
          <button className="bg-green-600 mx-1" type="submit">
            Guardar
          </button>
          <button className="bg-red-600 mx-1" onClick={() => formDefault()}>
            Cancelar
          </button>
        </div>
      </div>
      {/* <input type="number" id="monto" />
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
        <button>Cancelar</button> */}
    </form>
  );
}

function ItemsComponent({ items }) {
  // console.log(items);
  const [list, setList] = useState(items);
  const [newItem, setNewItem] = useState({
    id: Date.now(),
    monto: "",
    tipo: "",
  });
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

  const handleNew = (item) => {
    e.preventDefault();
    setList([...list, item]);
  };

  const handleEdit = () => {
    const updatedList = list.map((item) =>
      item.id === editingItem.id
        ? { ...item, monto: editingItem.monto, tipo: editingItem.tipo }
        : item
    );
    setList(updatedList);
    setEditingItem({ id: "", monto: "", tipo: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Lista de items</h2>
        <div className="flex flex-col bg-sky-100 rounded-md p-4 text-black">
          <h3 className="text-3xl font-bold">
            {list.reduce(
              (saldo, item) =>
                item.tipo === "ingreso"
                  ? saldo + item.monto
                  : saldo - item.monto,
              0
            )}
          </h3>
          <span>Saldo</span>
        </div>
      </div>
      <ul>
        {list
          // .filter((item) => item.tipo !== "ingreso" && item.monto > 2000)
          .map((item) => {
            return (
              <>
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
                {editingItem.id && editingItem.id === item.id && (
                  <FormComponent
                    item={editingItem}
                    setItem={setEditingItem}
                    hidden={false}
                    submitFunc={handleEdit}
                  />
                )}
              </>
            );
          })}
      </ul>
      <div>
        <h2>Agregar nuevo item</h2>
        <FormComponent
          item={newItem}
          setItem={setNewItem}
          hidden={false}
          submitFunc={handleNew}
        />
        {/* <form id="newItem">
          <input type="number" id="monto" />
          <select id="tipo">
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
          <button
            onClick={}
          >
            Agregar
          </button>
        </form> */}
      </div>
    </div>
  );
}

export default ItemsComponent;
