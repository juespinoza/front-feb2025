import React, { useState } from "react";

function ItemsComponent({ items }) {
  console.log(items);
  const [list, setList] = useState(items);
  // list.push({ monto: 1000, tipo: "ingreso" });
  // console.log(list);
  const esIngreso = (tipo) => tipo === "ingreso";

  const removeItemById = (id) => {
    console.log("Borrando", id);
    const newList = list.filter((elemento) => elemento.id !== id);
    setList(newList);
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
                className={`${esIngreso(item.tipo) ? "ingreso" : "egreso"}`}
              >
                {`${esIngreso(item.tipo) ? "+" : "-"}` + item.monto}
                <button onClick={() => removeItemById(item.id)}>Borrar</button>
              </li>
            );
          })}
        {/* <li className={`${esIngreso(items[0].tipo) ? "ingreso" : "egreso"}`}>
          {`${esIngreso(items[0].tipo) ? "+" : "-"}` + items[0].monto}
        </li>
        <li className={`${esIngreso(items[1].tipo) ? "ingreso" : "egreso"}`}>
          {`${esIngreso(items[1].tipo) ? "+" : "-"}` + items[1].monto}
        </li>
        <li className={`${esIngreso(items[2].tipo) ? "ingreso" : "egreso"}`}>
          {`${esIngreso(items[2].tipo) ? "+" : "-"}` + items[2].monto}
        </li> */}
        <div>
          <form>
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
                console.log("Agregando...", elemento);
              }}
            >
              Agregar
            </button>
          </form>
        </div>
      </ul>
    </div>
  );
}

export default ItemsComponent;
