import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarTransaccion } from "./features/transacciones/transaccionesSlice";

function FormComponent({ item, setItem, hidden, submitFunc, cancelFunc }) {
  const [editingItem, setEditingItem] = useState(item);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submitFunc(editingItem);
    dispatch(agregarTransaccion(editingItem));
    setEditingItem({ id: "", monto: 0, tipo: "ingreso" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      hidden={hidden}
      className="mt-2 p-2 border rounded-md"
    >
      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-3">
          <label className="block text-sm font-medium">Monto</label>
          <input
            type="number"
            name="monto"
            value={editingItem.monto}
            onChange={handleChange}
            className="block w-full rounded-md border px-3 py-1.5"
          />
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium">Tipo</label>
          <select
            name="tipo"
            value={editingItem.tipo}
            onChange={handleChange}
            className="block w-full rounded-md border px-3 py-1.5"
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
        </div>
        <div className="col-span-2 flex items-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-3 py-1 ml-2 rounded"
            onClick={cancelFunc}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormComponent;
